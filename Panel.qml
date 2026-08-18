import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Ui
import "Quran.js" as Quran
import "Model.js" as Model

Panel {
  id: root
  moduleName: "io.github.arhamthedeveloper.mushaf"
  manageIpc: false

  property var anchorItem: null
  property var hostWidget: null
  readonly property var barIdentity: hostWidget || root

  property var quran: null
  property int surah: Quran.DEFAULT_SURAH
  property int ayah: Quran.DEFAULT_AYAH
  property string searchText: ""
  property string searchError: ""
  property string browseMode: "read" // read | surahs
  property bool stateReady: false

  readonly property color contentForeground: bar ? bar.barForeground : Color.foreground
  readonly property color mutedForeground: Color.muted
  readonly property color accentColor: Color.accent
  readonly property string contentFontFamily: bar ? bar.fontFamily : Style.font.family
  // Quran-specialized face for Uthmani Arabic text. Generic fonts render
  // shadda+kasra (بِّ) and the dagger alif / small meem marks incorrectly.
  readonly property string arabicFontFamily: "Amiri Quran"

  readonly property var currentAyahs: Model.ayahsFor(root.quran, root.surah)
  readonly property string basmala: Model.basmalaFor(root.quran, root.surah)
  readonly property var surahInfo: Quran.surahById(root.surah)
  readonly property string label: Quran.formatRef(root.surah, root.ayah, false)
  readonly property string chipLabel: Quran.formatRef(root.surah, root.ayah, true)
  readonly property string tooltipLabel: root.label + " · Sahih International"

  function open() {
    root.controller.show()
    Qt.callLater(function() {
      if (root.opened) setCenterHoverRevealSuppressed(true)
      root.scrollToAyah()
    })
  }

  function close() {
    setCenterHoverRevealSuppressed(false)
    root.persist()
    root.controller.hide()
  }

  function toggle() {
    if (root.opened) root.close()
    else root.open()
  }

  function switchPanel(direction) {
    if (root.bar && typeof root.bar.switchPanelFrom === "function")
      return root.bar.switchPanelFrom(root.barIdentity, direction)
    return false
  }

  function setCenterHoverRevealSuppressed(value) {
    if (root.bar && "centerHoverRevealSuppressed" in root.bar)
      root.bar.centerHoverRevealSuppressed = value
  }

  function persist() {
    if (!root.stateReady) return
    stateFile.setText(Model.serializeState(root.surah, root.ayah))
  }

  function applyPlace(surahId, ayahNum, persistNow) {
    if (!Quran.surahById(surahId)) return false
    root.surah = surahId
    root.ayah = Model.clampAyah(root.quran, surahId, ayahNum || 1)
    root.searchError = ""
    root.browseMode = "read"
    if (persistNow !== false) root.persist()
    Qt.callLater(root.scrollToAyah)
    return true
  }

  function stepAyah(delta) {
    var next = delta > 0
      ? Quran.nextAyah(root.surah, root.ayah)
      : Quran.prevAyah(root.surah, root.ayah)
    root.applyPlace(next.surah, next.ayah, true)
  }

  function stepSurah(delta) {
    var next = delta > 0
      ? Quran.nextSurah(root.surah)
      : Quran.prevSurah(root.surah)
    root.applyPlace(next, 1, true)
  }

  function submitSearch() {
    var parsed = Quran.parseReference(root.searchText)
    if (!parsed) {
      root.searchError = "Not a known surah or reference"
      return
    }
    if (!root.applyPlace(parsed.surah, parsed.ayah, true))
      root.searchError = "Not a known surah or reference"
    else
      root.searchText = ""
  }

  function scrollToAyah() {
    if (!ayahList.count) return
    var idx = Math.max(0, Math.min(ayahList.count - 1, root.ayah - 1))
    ayahList.positionViewAtIndex(idx, ListView.Contain)
  }

  function openSurahs() {
    root.browseMode = "surahs"
  }

  function pickSurah(id) {
    root.applyPlace(id, 1, true)
  }

  FileView {
    id: quranFile
    path: Model.fileUrlToPath(Qt.resolvedUrl("data/quran.json"))
    printErrors: false
    onLoaded: {
      try { root.quran = JSON.parse(text()) } catch (e) { root.quran = null }
      stateFile.reload()
    }
    onLoadFailed: console.warn("Quran: failed to load data/quran.json")
  }

  FileView {
    id: stateFile
    path: Quickshell.env("HOME") + "/.local/state/omarchy/settings/quran-reader.json"
    watchChanges: true
    atomicWrites: true
    printErrors: false
    onLoaded: {
      var place = Model.parseState(text(), root.quran)
      root.applyPlace(place.surah, place.ayah, false)
      root.stateReady = true
    }
    onLoadFailed: {
      root.applyPlace(Quran.DEFAULT_SURAH, Quran.DEFAULT_AYAH, false)
      root.stateReady = true
    }
    onFileChanged: reload()
  }

  KeyboardPanel {
    id: panel
    anchorItem: root.anchorItem
    owner: root.barIdentity
    bar: root.bar
    open: root.opened
    focusTarget: keyCatcher
    contentWidth: panel.fittedContentWidth(Style.space(400))
    contentHeight: panel.fittedContentHeight(Style.space(560))

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      blocked: searchField.activeFocus
      onMoveRequested: function(dx, dy) {
        if (dx !== 0) root.stepSurah(dx)
        if (dy < 0) root.stepAyah(-1)
        if (dy > 0) root.stepAyah(1)
      }
      onCloseRequested: root.close()
      onTabRequested: function(direction) { root.switchPanel(direction) }
      onActivateRequested: {
        if (root.browseMode === "read") root.persist()
      }

      Column {
        id: content
        anchors.fill: parent
        spacing: Style.space(10)

        Item {
          width: parent.width
          height: headerRow.implicitHeight

          Row {
            id: headerRow
            anchors.left: parent.left
            anchors.right: parent.right
            spacing: Style.space(8)

            Button {
              width: Style.space(28)
              implicitHeight: Style.space(28)
              horizontalPadding: 0
              verticalPadding: 0
              iconText: "󰒮"
              foreground: contentForeground
              tooltipText: "Previous surah"
              onClicked: root.stepSurah(-1)
            }

            Column {
              width: parent.width - Style.space(120)
              spacing: Style.space(2)
              anchors.verticalCenter: parent.verticalCenter

              Text {
                width: parent.width
                text: root.label
                color: contentForeground
                font.family: contentFontFamily
                font.pixelSize: Style.font.subtitle
                font.bold: true
                elide: Text.ElideRight
                horizontalAlignment: Text.AlignHCenter
              }

              Text {
                width: parent.width
                text: root.surahInfo ? root.surahInfo.name_ar : ""
                color: mutedForeground
                font.family: contentFontFamily
                font.pixelSize: Style.font.title
                horizontalAlignment: Text.AlignHCenter
                elide: Text.ElideRight
              }
            }

            Button {
              width: Style.space(28)
              implicitHeight: Style.space(28)
              horizontalPadding: 0
              verticalPadding: 0
              iconText: "󰒭"
              foreground: contentForeground
              tooltipText: "Next surah"
              onClicked: root.stepSurah(1)
            }

            Button {
              width: Style.space(28)
              implicitHeight: Style.space(28)
              horizontalPadding: 0
              verticalPadding: 0
              iconText: "󰂻"
              foreground: root.browseMode === "read" ? mutedForeground : accentColor
              tooltipText: "Browse surahs"
              onClicked: {
                if (root.browseMode === "read") root.openSurahs()
                else root.browseMode = "read"
              }
            }
          }
        }

        TextField {
          id: searchField
          width: parent.width
          placeholderText: "2:255 · al-baqarah 255"
          foreground: contentForeground
          font.family: contentFontFamily
          text: root.searchText
          onTextChanged: {
            root.searchText = text
            root.searchError = ""
          }
          Keys.onReturnPressed: root.submitSearch()
          Keys.onEnterPressed: root.submitSearch()
        }

        Text {
          width: parent.width
          visible: root.searchError !== ""
          text: root.searchError
          color: root.bar ? root.bar.urgent : contentForeground
          font.family: contentFontFamily
          font.pixelSize: Style.font.caption
        }

        ListView {
          id: ayahList
          width: parent.width
          height: parent.height - headerRow.height - searchField.height - browseToggle.height - Style.space(40)
          clip: true
          visible: root.browseMode === "read"
          spacing: Style.space(10)
          boundsBehavior: Flickable.StopAtBounds
          model: root.currentAyahs

          header: Item {
            width: ayahList.width
            height: root.basmala !== "" ? basmalaText.implicitHeight + Style.space(6) : 0

            Text {
              id: basmalaText
              width: parent.width
              text: root.basmala
              color: contentForeground
              font.family: root.arabicFontFamily
              font.pixelSize: Style.font.displayLarge
              horizontalAlignment: Text.AlignRight
              wrapMode: Text.WordWrap
            }
          }

          delegate: Item {
            required property var modelData
            width: ayahList.width
            height: arabicText.implicitHeight + englishText.implicitHeight + Style.space(4)
            readonly property bool current: modelData.n === root.ayah

            Text {
              id: arabicText
              width: parent.width
              text: modelData.n + "  " + Model.arabicFor(root.quran, root.surah, modelData.n, modelData.ar)
              color: parent.current ? accentColor : contentForeground
              font.family: root.arabicFontFamily
              font.pixelSize: Style.font.displayLarge
              horizontalAlignment: Text.AlignRight
              wrapMode: Text.WordWrap
            }

            Text {
              id: englishText
              anchors.top: arabicText.bottom
              anchors.topMargin: Style.space(2)
              width: parent.width
              text: modelData.n + ". " + modelData.en
              color: parent.current ? accentColor : mutedForeground
              font.family: contentFontFamily
              font.pixelSize: Style.font.bodySmall
              wrapMode: Text.WordWrap
            }

            MouseArea {
              anchors.fill: parent
              cursorShape: Qt.PointingHandCursor
              onClicked: {
                root.ayah = modelData.n
                root.persist()
              }
            }
          }
        }

        Column {
          width: parent.width
          height: ayahList.height
          visible: root.browseMode === "surahs"
          spacing: Style.space(8)

          ListView {
            width: parent.width
            height: parent.height
            clip: true
            boundsBehavior: Flickable.StopAtBounds
            model: Quran.SURAHS

            delegate: Item {
              required property var modelData
              width: parent.width
              height: Style.space(30)

              Text {
                anchors.left: parent.left
                anchors.leftMargin: Style.space(4)
                anchors.verticalCenter: parent.verticalCenter
                width: Style.space(36)
                text: modelData.id
                color: modelData.id === root.surah ? accentColor : mutedForeground
                font.family: contentFontFamily
                font.pixelSize: Style.font.bodySmall
              }

              Text {
                anchors.left: parent.left
                anchors.leftMargin: Style.space(40)
                anchors.verticalCenter: parent.verticalCenter
                text: modelData.name_translit
                color: modelData.id === root.surah ? accentColor : contentForeground
                font.family: contentFontFamily
                font.pixelSize: Style.font.bodySmall
              }

              Text {
                anchors.right: parent.right
                anchors.rightMargin: Style.space(40)
                anchors.verticalCenter: parent.verticalCenter
                text: modelData.name_ar
                color: modelData.id === root.surah ? accentColor : contentForeground
                font.family: root.arabicFontFamily
                font.pixelSize: Style.font.bodySmall
              }

              Text {
                anchors.right: parent.right
                anchors.rightMargin: Style.space(4)
                anchors.verticalCenter: parent.verticalCenter
                text: modelData.ayahs
                color: mutedForeground
                font.family: contentFontFamily
                font.pixelSize: Style.font.caption
              }

              MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: root.pickSurah(modelData.id)
              }
            }
          }
        }

        Item {
          id: browseToggle
          width: parent.width
          height: 1
        }
      }
    }
  }
}

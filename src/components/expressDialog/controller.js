export function controller(emit, textArea, picturesBox) {
    function textareaChange(text) {
        console.log(text)
        textArea.value = text
    }

    function pictureChange(pictures) {
        console.log(pictures)
        picturesBox.value = pictures
    }

    function dialogClosed() {
        emit("update:visible", false)
    }

    return {textareaChange, pictureChange, dialogClosed}
}
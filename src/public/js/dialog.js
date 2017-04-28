class Dialog {
    constructor(dialogDiv) {
        this.dialogBox = $(dialogDiv);
        this.textBox = this.dialogBox.find('.text');

        this.dialogBox.click(this, function(event) {
            let self = event.data;

            self.showNextPhrase();
        });
    }

    closeDialog() {
        this.dialog = [];

        this.dialogBox.hide();
    }

    runDialog() {
        this.dialogBox.show();
        this.showNextPhrase();
    }

    showNextPhrase() {
        if(this.dialog.length === 0) {
            this.closeDialog();
        }

        let phrase = this.dialog.shift();
        this.textBox.text(phrase);
    }
}

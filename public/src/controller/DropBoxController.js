class DropBoxController {
    constructor(){
        

        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.InputFilesEl = document.querySelector("#files");
        this.snackModalEl = document.querySelector("#react-snackbar-root")

        this.initButtons();
    }

    initButtons(){
        this.btnSendFileEl.addEventListener('click', event=>{
            this.InputFilesEl.click();
        })

        this.InputFilesEl.addEventListener('change', event=>{
            console.log(event.target.files);
            this.snackModalEl.style.display = 'block';
        })
    }
}
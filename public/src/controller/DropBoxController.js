class DropBoxController {
    constructor(){
        

        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.InputFilesEl = document.querySelector("#files");
        this.snackModalEl = document.querySelector("#react-snackbar-root");
        this.progressBarEl = this.snackModalEl.querySelector(".mc-progress-bar-fg")
        this.nameFileEl = this.snackModalEl.querySelector(".filename")
        this.timeLeftEl = this.snackModalEl.querySelector(".timeleft")
        this.initButtons();
    }

    initButtons(){
        this.btnSendFileEl.addEventListener('click', event=>{
            this.InputFilesEl.click();
        })

        this.InputFilesEl.addEventListener('change', event=>{
            console.log(event.target.files);
            this.uploadTask(event.target.files);
            this.snackModalEl.style.display = 'block';
        })
    }

    uploadTask(files){
        let promises = [];
        //files is as collection, because I had set to 
        // receive mutiple files, so to make a foreach we need to convert the collection to an array
        [...files].forEach(file=>{
            promises.push(new Promise((resolve,reject)=>{
                let ajax = new XMLHttpRequest();
                ajax.open('POST','/upload');
                ajax.onload = event=>{
                    try{
       
                        resolve(JSON.parse(ajax.responseText));

                    }catch(e){
                        reject(e);
                    }
                }

                ajax.onerror = event=>{
                    reject(event);  
                }

                ajax.upload.onprogress = event=>{
                    this.uploadProgress(event, file)
                    console.log(event)
                    
                }
                let formData = new FormData();
                
                

                formData.append('input-file',file);
                
                this.startUploadTime = Date.now();

                ajax.send(formData);

            }))
        })


        return Promise.all(promises);
    }

    uploadProgress(event, file){
       
        let timeSpent = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let percent = parseInt((loaded/total)*100);
        let timeleft =((100-percent)*timeSpent) / percent;
        this.progressBarEl.style.width = `${percent}%`

        this.nameFileEl.innerHTML = file.name;
    
        console.log((timeleft))

        console.log(timeSpent)

    }
}
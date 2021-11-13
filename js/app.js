let contextSW = '/PWA-U2-P7-EECM/sw.js'
let url = window.location.href

let player = $('#player')
let photoUser = $('#photoUser')

let btnCamera = $('#btnCamera')
let btnCameraBack = $('#btnCameraBack')
let btnTakePhoto = $('#btnTakePhoto')

let cards = $('#cards')
let muestra = $('#muestra')

let type = ""

const camera = new Camera(player[0])


btnCamera.on('click', ()=> {
    camera.on().then((result)=>{
        if(!result){
            alert('Error al iniciar la cámara')
        }
        type = "FRONTAL"
    })
})

btnCameraBack.on('click', ()=> {
    camera.onBack().then((result)=>{
        if(!result){
            alert('Error al iniciar la cámara')
        }
        type = "POSTERIOR"
    })
})

btnTakePhoto.on('click', ()=> {
    camera.off()
    console.log(type);
    //photoUser.attr('src', camera.takePhoto()) 
    let card = `
    <div
        class="col-12 text-center"
        style="margin-top: 20px; display: flex; justify-content: center;align-items: center;"
    >
        <div class="card" style="width: 18rem">
            <img
                id="photoUser"
                class="card-img-top"
                src="`+camera.takePhoto()+`"
                width="300px"
                height="300px "
            />
            <div class="card-body">
                <p class="card-text" id="type">`+type+`</p>
            </div>
        </div>
    </div>
    `
    muestra.remove()
    cards.append(card)
    
})

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        contextSW = '/sw.js'
    }
    navigator.serviceWorker.register(contextSW)
}
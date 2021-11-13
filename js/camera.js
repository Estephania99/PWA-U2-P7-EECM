class Camera{
    constructor(videoNode){
        this.videoNode = videoNode
        this.stream = null
        this.photo = null
        console.log('Creamos new camera')
    }

    on(){
        if(navigator.mediaDevices){
            this.off()
            //da acceso a dispositivos multimedia
            return navigator.mediaDevices.getUserMedia({
                audio:false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: 'user'
                }
            }).then((stream) => {
                this.videoNode.srcObject = stream
                this.stream = stream
                return true
            }).catch((error) => {
                alert('Opss! ocurrió un error al abrir la cámara')
                console.log(error)
                return false
            })
        }else{
            alert('No cuentas con dispositivos multimedia')
            return false
        }
    }

    onBack(){
        if(navigator.mediaDevices){
            this.off()
            //da acceso a dispositivos multimedia
            return navigator.mediaDevices.getUserMedia({
                audio:false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: {
                        exact: 'environment'
                    }
                }
            }).then((stream) => {
                this.videoNode.srcObject = stream
                this.stream = stream
                return true
            }).catch((error) => {
                alert('Opss! ocurrió un error al abrir la cámara')
                console.log(error)
                return false
            })
        }else{
            alert('No cuentas con dispositivos multimedia')
            return false
        }
    }

    off(){
        //¿está activo el video?
        if(this.videoNode){
            //pausar el video
            this.videoNode.pause()
            if(this.stream){
                //tracks son como los elementos de reproducción (pistas)
                this.stream.getTracks().forEach(track => {
                    track.stop()
                })
            }
        }
    }

    takePhoto(){
        let canvas = document.createElement('canvas')
        canvas.setAttribute('width',300)
        canvas.setAttribute('height',300)
        let context = canvas.getContext('2d')
        context.drawImage(this.videoNode, 0,0 , canvas.width, canvas.height)
        //toDataURL() da lo que se dibujo en el canvas en base 64
        this.photo = context.canvas.toDataURL()
        canvas = null
        context = null
        this.videoNode.removeAttribute('src')
        this.videoNode.load()
        return this.photo
    }
}

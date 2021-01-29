const $img = document.querySelectorAll(".img");
const output= document.getElementById('output');
const res = document.querySelectorAll(".res");
const tam = document.getElementById("tam");
const x = document.getElementById("x");
const y = document.getElementById("y");
const rgb = document.getElementById("rgb");
const hexa = document.getElementById("hexa");
var con = 0;


$img.forEach( el =>{

    let altoOriginal = el.naturalHeight; 
    let anchoOriginal = el.naturalWidth;

    let resolucion = altoOriginal+" X "+anchoOriginal; 
    res[con].innerHTML = resolucion;
    console.log(resolucion);
    
    //Tamaño de la imagen en Kb
    el.onload = e => {
        fetch(el.src).then(resp => resp.blob())
        .then(blob => {
            let tamanio = Math.round(blob.size/1024*100)/100;
            console.log("tamaño",tamanio);
            tam.innerHTML = tamanio;
            });
        };
    
    
        el.addEventListener('click', function (e) {
            let ctx;
            if(!this.canvas) {
                this.canvas = document.createElement('canvas');
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                ctx=this.canvas.getContext('2d');
                ctx.drawImage(this, 0, 0, this.width, this.height);
            } else {
                ctx=this.canvas.getContext('2d');
            }
            const pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            console.log("X: ",e.offsetX);
            x.innerHTML = e.offsetX;
            console.log("Y: ",e.offsetY);
            y.innerHTML = e.offsetY;
            let rgbVal = 'R:' + pixel[0] + ' G:' + pixel[1] +' B:' + pixel[2] + ' A:' + pixel[3]
            console.log(rgbVal);
            rgb.innerHTML = rgbVal;

            
            var rgbToHex = function (rgb) { 
                var hex = Number(rgb).toString(16);
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
                return hex;
            };

            function fullColorHex (r,g,b) {   
                let red = rgbToHex(r);
                let green = rgbToHex(g);
                let blue = rgbToHex(b);
                return red+green+blue;
            };
            let hexag = "#"+fullColorHex(pixel[0], pixel[1], pixel[2]);
            console.log(hexag);
            hexa.innerHTML=hexag;
        });
    con +=1;
})





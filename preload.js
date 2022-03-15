const castleImage=new Image();
const cloudsImage=new Image();
const mountainImage=new Image();
const spriteSheetImage=new Image();
const tilesetImage=new Image();
const fontImage=new Image();

function preload(){
    castleImage.src="./assets/sprites/castle.png";
    cloudsImage.src="./assets/sprites/clouds.png";
    mountainImage.src="./assets/sprites/mountain.png";
    spriteSheetImage.src="./assets/sprites/spritesheet.png";
    tilesetImage.src="./assets/sprites/tileset_gutter.png";
    fontImage.src="./assets/sprites/font.png";

    return new Promise(function(resolve,reject){
        let p1= new Promise(function(resolve,reject){
            
            castleImage.addEventListener("load",function(){
                resolve();
            });
        })
        let p2= new Promise(function(resolve,reject){
            cloudsImage.addEventListener("load",function(){
                resolve();
            });
        })
        let p3= new Promise(function(resolve,reject){
            mountainImage.addEventListener("load",function(){
                resolve();
            });
        })
        let p4= new Promise(function(resolve,reject){
            spriteSheetImage.addEventListener("load",function(){
                resolve();
            });
        })
        let p5= new Promise(function(resolve,reject){
            tilesetImage.addEventListener("load",function(){
                resolve();
            });
        })
        let p6= new Promise(function(resolve,reject){
            fontImage.addEventListener("load",function(){
                resolve();
            });
        })

        let BigPromise=Promise.all([p1,p2,p3,p4,p5,p6]);
        BigPromise.then(function(){
            resolve();
        })
    })
}

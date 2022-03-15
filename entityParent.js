class Sprite{
    constructor(img,srcX,srcY,srcW,srcH){
     this.img=img;
     this.srcX=srcX;
     this.srcY=srcY;
     this.srcH=srcH;
     this.srcW=srcW;
    }   
}

class Entity{
    constructor(sprite,type,posX,posY,width,height){
        this.sprite=sprite;
        this.type=type;
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
    }
}


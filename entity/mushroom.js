
class Mushroom extends Entity{
    constructor(spritesheet,posX,posY,width,height){
        let img= new Sprite(spritesheet,625,5,16,16);
        super(img,"mushroom",posX,posY,width,height);
        this.velX=1.3;
        this.velY=0;


        let self=this;
        this.animFrame={
        
            moving:new Sprite(spritesheet,625,5,16,16)

        };
        this.states={
           moving:{
               movement(){
                   if(self.currentDirection=="right"){
                       self.posX+=self.velX;
                   }
                   else{
                       
                       self.posX-=self.velX;
                   }
               }
           }
        }


        this.currentDirection="right";
        this.currentState=this.states.moving;
    }
  
}


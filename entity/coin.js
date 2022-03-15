class Coin extends Entity{
    constructor(tileset,posX,posY,width,height){
        const sprite=new Sprite(tileset,5,5,10,14);
        super(sprite,'coin',posX,posY,width,height);
        const self=this;
        this.animFrames={
            spin:{
                frames:[
                   new  Sprite(spriteSheetImage,5,5,10,14),
                   new  Sprite(spriteSheetImage,21,5,10,14),
                   new  Sprite(spriteSheetImage,37,5,10,14),
                   new Sprite(spriteSheetImage,53,5,10,14)
                ],
                counter:0
            }
        }
        this.states={
            spinning:{
                animation(gameObj){
                    if(gameObj.animFrames%3==0)
                    {
                       self.sprite=self.animFrames.spin.frames[counter];
                       self. animFrames.spin.frames++;
                        self.animFrames.spin.frames%=4;
                    }          

                },
                movement(){
                    self.posY+=self.velY;
                }
            }
            
        }
        self.currentState=self.states.spinning;
        self.velY=-0.7;
    }
    
}
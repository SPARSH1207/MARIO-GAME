let input={
    down:{},
    pressed:{},
    init(){
        window.addEventListener("keydown",(e)=>{
        this.down[e.code]=true;
        })

        window.addEventListener("keyup",(e)=>{
           delete this.down[e.code];
           delete this.pressed[e.code];
            })
    },
    update(gameObj){
    let mario=gameObj.entities.mario;

    if(gameObj.userControl==true)
    {
      if(this.isDown("ArrowLeft")){
         
        mario.posX-=mario.velX;
        mario.currentDirection="left";
        mario.currentState=mario.states.walkingAnim;
        
      }

      if(this.isDown("ArrowRight")){
        mario.posX+=mario.velX;  
        mario.currentDirection="right";
        
        mario.currentState=mario.states.walkingAnim;
        

      }

      if(this.isPressed("Space"))
      {
           if(mario.velY==1.1)
           {
             mario.velY-=14;
           }
           mario.currentState=mario.states.jumpingAnim;
      }
    }
     

    }
    ,isDown(key)
    {
        return this.down[key];
    },
    isPressed(key)
    {
      if(this.pressed[key])
      {
        return false;
      }else if(this.down[key]){
        return true;

      }
    }
}
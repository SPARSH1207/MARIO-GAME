let physics={
    update(gameObj){
 
    this.gravity(gameObj.entities.mario);
   gameObj.entities.goombas.forEach((goomba)=>{
       this.gravity(goomba);  
   })
   gameObj.entities.koopas.forEach((koopa)=>{
    this.gravity(koopa);
   })
   gameObj.entities.particles.forEach((particle)=>{
    this.gravity(particle);
   })
   gameObj.entities.mushrooms.forEach((mushroom)=>{
    this.gravity(mushroom);
   })
    
    this.staticEntityCol(gameObj);
    this.entityMarioCol(gameObj);
    this.bgEntityCollision(gameObj);
    this.marioFallingCheck(gameObj);
    },

    staticEntityCol(gameObj){
        let {mushrooms,bricks,blocks}=gameObj.entities;
        mushrooms.forEach((mushroom)=>{
            blocks.forEach((block)=>{
                if(this.checkRectCollision(mushroom,block)){
                    this.handleDirec(block,mushroom);
                }
            })            
        })
        mushrooms.forEach((mushroom)=>{
            bricks.forEach((brick)=>{
                if(this.checkRectCollision(mushroom,brick)){
                    this.handleDirec(brick,mushroom);
                }
            })            
        })
    },
    gravity(entity){
        entity.velY+=1.1;
        entity.posY+=entity.velY; 
    },
    checkCollision(entity)   {
        if(entity.posY+entity.height>=175 && entity.velY>0)
        {
            entity.posY=175;
            entity.velY=0;
            entity.currentState=entity.states.standingAnim;

        }
    },
    entityMarioCol(gameObj){
        let {goombas ,mario,koopas,bricks,blocks,mushrooms}=gameObj.entities;
        mushrooms.forEach((mushroom)=>{
            if(this.checkRectCollision(mushroom,mario)){
                let idx=mushrooms.indexOf(mushroom);
                mushrooms.splice(idx,1);
        
               }
           })
        goombas.forEach((goomba)=>{
         if(this.checkRectCollision(goomba,mario)){
                this.handleCollision(mario,goomba,gameObj);
            }
        })
        koopas.forEach((koopa)=>{
            if(this.checkRectCollision(koopa,mario)){
                   this.handleCollision(mario,koopa,gameObj);
               }   
           })
           bricks.forEach((brick)=>{
            if(this.checkRectCollision(brick,mario)){
                  let wantToBreak= this.handleDirec(brick,mario);
                  if(wantToBreak)
                  {
                      brick.createParticle(gameObj);
                      let idx=gameObj.entities.bricks.indexOf(brick);
                      gameObj.entities.bricks.splice(idx,1);
                  }
               }
           })

           blocks.forEach((block)=>{
            if(this.checkRectCollision(block,mario)){
                  let wantToReveal= this.handleDirec(block,mario);                 
                  if(wantToReveal && block.currentState!=block.states.emptyAnim)
                  {
                     block.currentState=block.states.emptyAnim;
                     if(block.content=="coin")
                     {
                         gameObj.entities.score.coinCount++;
                        block.generateCoin(gameObj);
                     }
                     else if(block.content=="mushroom"){
                         block.generateMushroom(gameObj);
                     }
                  }
               }
           })
   
    },
    
    handleCollision(mario,entity,gameObj){

        if(entity.type=="goomba" || entity.type=="koopa")
        {
              if(mario.posX>entity.posX && mario.posY==178.2)
            {
                 
                if(entity.currentState!=entity.states.squashed && entity.type=="goomba"){
                    
                    this.marioDeath(gameObj,mario); 
                }else if(entity.type=="koopa"){
                    if(entity.currentState==entity.states.hidding)
                    {
                        this.koopaSlide(entity,mario);
                    }else{
                        this.marioDeath(gameObj,mario);
                    }
                } 
                }
            if(mario.posX<entity.posX && mario.posY==178.2 )
            {                 
                if(entity.currentState!=entity.states.squashed && entity.type=="goomba"){
                    
                    this.marioDeath(gameObj,mario); 
                }else if(entity.type=="koopa"){
                    if(entity.currentState==entity.states.hidding)
                    {
                        this.koopaSlide(entity,mario);
                    }else{
                        this.marioDeath(gameObj,mario);
                    }
                } 
            }
            if(mario.posY<entity.posY && (mario.posX<entity.posX+entity.width &&(entity.posX<mario.posX+mario.width)))
            {
               
               if(mario.pointer!="Dead"&& entity.type=="koopa"){
                   if(entity.currentState==entity.states.walkingAnim)
                   {                       
                    
                       this.koopaHide(entity,mario);
                   }
                   else if(entity.currentState==entity.states.hidding)
                   {
                       this.koopaSlide(entity,mario);
                   }
                   else{
                       this.enemyDeath(gameObj,entity);
                   }

               }
               else if(entity.currentState!=entity.states.squashed && mario.pointer!="Dead" && entity.type=="goomba"){

                    this.enemyDeath(gameObj,entity); 
                }
            }
        }

    },
    koopaHide(entity,mario){
        entity.currentState=entity.states.hidding;
        entity.posX=mario.currentDirection=="left"?entity.posX-10:entity.posX+10;
    },
    koopaSlide(entity,mario){
        entity.currentState=entity.states.sliding;
        entity.currentDirection=mario.currentDirection;
        entity.posX=mario.currentDirection=="left"?entity.posX-10:entity.posX+10;
    },
    enemyDeath(gameObj,entity){
        if(entity.type=="goomba"){
            gameObj.entities.score.value+=100;
            entity.pointer="squashed";
        entity.currentState=entity.states.squashed;

        }
        else if(entity.type=="koopa"){
            gameObj.entities.score.value+=100;
            entity.velX+=5;
            entity.velY-=14;
        }
        
        
         //console.log(entity.currentState);
        setTimeout(() => {
            if(entity.type=="goomba")
            {
                let idx=gameObj.entities.goombas.indexOf(entity);
            delete gameObj.entities.goombas[idx];
            }
            else if(entity.type=="koopa")
            {
                let idx=gameObj.entities.koopas.indexOf(entity);
            delete gameObj.entities.koopas[idx];
            }
            
        }, 200);

    },

    marioDeath(gameObj,mario){
        mario.velX=0; 
        mario.currentState=mario.states.dead;
        mario.velY-=14;
        mario.pointer="Dead";
        gameObj.userControl=false;
        setTimeout(() => {
            gameObj.reset();
        }, 3000);
    },

    bgEntityCollision(gameObj){
        let mario=gameObj.entities.mario;
        let goombas=gameObj.entities.goombas;
        let koopas=gameObj.entities.koopas;
        let mushrooms=gameObj.entities.mushrooms;

        this.bgCollision(mario,gameObj);
        koopas.forEach((koopa)=>{
            this.bgCollision(koopa,gameObj);
        })
        goombas.forEach((goomba)=>{
            this.bgCollision(goomba,gameObj);
        })
        mushrooms.forEach((mushroom)=>{
            this.bgCollision(mushroom,gameObj);
        })
    },
    bgCollision(entity,gameObj){      
        let scenery=gameObj.entities.scenery
        scenery.forEach((scene) => {
            if(this.checkRectCollision(scene ,entity)){
               if(scene.type=="pipe"|| scene.type=="stair")
               {
                   this.handleDirec(scene,entity);
               }else if(scene.type=="ground"){

                if(entity.posY<scene.posY && entity.posX+entity.width>scene.posX && scene.posX+scene.posY>entity.posX && entity.velY>=0)
                     {
                         if(entity.type=="mario"){
                             
                            entity.currentState=entity.states.standingAnim;
                         }
                         if(entity.pointer!="Dead")
                         {
                            entity.posY=scene.posY-entity.height;
                         entity.velY=1.1;
                        
                         }
                         
                    }

               }
            }
        });
    },
    checkRectCollision(entity1,entity2){

        let l1=entity1.posX;
        let l2=entity2.posX;
        let r1=entity1.posX+entity1.width;
        let r2=entity2.posX+entity2.width;
        let b1=entity1.posY;
        let b2=entity2.posY;
        let t1=entity1.posY+entity1.height;
        let t2=entity2.posY+entity2.height;

        if(r2>l1 && l2<r1 && t2>b1 && t1>b2)
        {
            return true;
        }
        
    },
    handleDirec(scene,entity){
      if(entity.posY>scene.posY && entity.posX+entity.width>scene.posX && scene.posX+scene.posY>entity.posX && entity.velY<0)
      {
          if(scene.type=="brick" || scene.type=="block")
          {
            entity.posY=scene.posY+entity.height;
            entity.velY=1.1;
            return true;
          }
        
      }
      if(entity.posX<scene.posX && entity.posY>=scene.posY)
        {
            entity.posX=scene.posX-entity.width;
            if(entity.type=="goomba" || entity.type=="koopa" || entity.type=="mushroom"){
                
                entity.currentDirection=entity.currentDirection=="left"?"right":"left";
                
            }
        }
        if(entity.posX>scene.posX && entity.posY>=scene.posY)
        {
            entity.posX=scene.posX+scene.width;
            if(entity.type=="goomba"|| entity.type=="koopa"|| entity.type=="mushroom"){
                
                entity.currentDirection=entity.currentDirection=="left"?"right":"left";
            }
        }
        if(entity.posY<scene.posY && entity.posX+entity.width>scene.posX && scene.posX+scene.posY>entity.posX && entity.velY>=0)
        {
            if(entity.type=="mario")
            {
                entity.currentState=entity.states.standingAnim;

            }
            
            entity.posY=scene.posY-entity.height;
            entity.velY=1.1;

        }

    },
    marioFallingCheck(gameObj)
    {
        if(gameObj.entities.mario.posY>=250)
        {
            gameObj.reset();
        }
    }
}
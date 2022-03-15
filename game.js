const render={
    init(gameObj){
        gameObj.tool.fillStyle="#03c2fc"
        gameObj.tool.fillRect(0,0,window.innerWidth,window.innerHeight);
      //  gameObj.tool.drawImage(castleImage,40,40,200,150);
      gameObj.LevelBuilder.stock(gameObj);
        let mario=gameObj.entities.mario;
        gameObj.tool.drawImage(
            mario.sprite.img,
            mario.sprite.srcX,
            mario.sprite.srcY,
            mario.sprite.srcW,
            mario.sprite.srcH,
            mario.posX,
            mario.posY,
            mario.width,
            mario.height

        )
       // dashboard.update(gameObj);
     
     },
     update(gameObj){
         
       this.updateFrame(gameObj);
        let mario=gameObj.entities.mario;
        //let letter=gameObj.entities.letter;
       // console.log(mario);
        gameObj.tool.clearRect(0,0,window.innerWidth,window.innerHeight);
     gameObj.tool.fillStyle="#03c2fc";

        gameObj.tool.fillRect(0,0,window.innerWidth,window.innerHeight);
        gameObj.LevelBuilder.render(gameObj);
        let camera=gameObj.camera;
        this.drawEntity(mario,camera,gameObj);
      
        gameObj.entities.goombas.forEach((goomba)=>{
            this.drawEntity(goomba,camera,gameObj);
        })
        gameObj.entities.koopas.forEach((koopa)=>{
            this.drawEntity(koopa,camera,gameObj);
        })

        gameObj.entities.particles.forEach((particle)=>{
            this.drawEntity(particle,camera,gameObj);
        })
        dashboard.update(gameObj);


     },
    
     drawEntity(entity,camera,gameObj){
        let entityEnd=entity.posX+entity.width;
      let frameWidth=camera.start+camera.width;
      if(entity.posX>=camera.start && entityEnd<=frameWidth){
       
        gameObj.tool.drawImage(
          entity.sprite.img,
          entity.sprite.srcX,
          entity.sprite.srcY,
          entity.sprite.srcW,
          entity.sprite.srcH,
          entity.posX-camera.start,
          entity.posY,
          entity.width,
          entity.height
          )
        }

        
     },

     updateFrame(gameObj){
        let centerX=gameObj.entities.mario.posX+gameObj.entities.mario.width/2;
        let dist=window.innerWidth/8;
        //console.log(centerX);
        //console.log(gameObj.camera.start+(2*dist)-centerX);
        if(centerX<gameObj.camera.start+(2*dist))
        {
            gameObj.camera.start=Math.max(centerX-dist,0);
            
        }

     }

}
class Game{

    init(){
        preload()
        .then(()=>{
        const canvas=document.querySelector(".board");
        canvas.height=window.innerHeight;
        canvas.width=window.innerWidth;
        const tool =canvas.getContext("2d");
        let entities={};
        let camera={
            start:0,
            width:window.innerWidth
        }

        let gameObj={
            tool ,canvas,
            entities,animFrame:0, 
            LevelBuilder:new LevelBuilder(levelOne),
            camera,
            reset:this.reset,
            userControl:true
        }
        tool.scale(3.1489,3.1489);
        let mario =new Mario(spriteSheetImage,175,0,16,16);
        const score = new Score(30, 15);
        const startTime=new Date();

        gameObj.entities.startTime=startTime;
        gameObj.entities.mario=mario;
        gameObj.entities.score=score;
        gameObj.entities.scenery=[];
        gameObj.entities.goombas=[];
        gameObj.entities.koopas=[];
        gameObj.entities.bricks=[];
        gameObj.entities.particles=[];
        gameObj.entities.blocks=[];
        gameObj.entities.coins=[];
        gameObj.entities.mushrooms=[];

        levelOne.goombas.forEach((gCord)=>{
            gameObj.entities.goombas.push(new Goomba(spriteSheetImage,gCord[0],gCord[1],gCord[2],gCord[3]));
        })
        levelOne.koopas.forEach((kCord)=>{
            gameObj.entities.koopas.push(new Koopa(spriteSheetImage,kCord[0],kCord[1],kCord[2],kCord[3]));
        })
        
        render.init(gameObj); 
        input.init();
        this.update(gameObj);
    
        })
       

    }

    update(gameObj)
    {
        function gameloop(){
            input.update(gameObj);
            animation.update(gameObj);
            movement.update(gameObj);
            physics.update(gameObj);   
            render.update(gameObj);
            gameObj.animFrame++;
            requestAnimationFrame(gameloop);
        }
        gameloop();
    }

    reset(){
        location.reload();
    }

}

const game=new Game;
    game.init();

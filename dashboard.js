dashboard={
    update(gameObj){
        this.drawText(gameObj,"MARIO",40,15);
       
        this.drawText(gameObj,"x",150,25);
        if(gameObj.entities.score.value!=0)
        {
          this.drawText(gameObj,`${gameObj.entities.score.value}`,61,25);
        }
        else
        {
          this.drawText(gameObj,"000",61,25);
        }
        this.drawText(gameObj,`${gameObj.entities.score.coinCount}`,158,25);
        this.drawText(gameObj,"WORLD",230,15);
        this.drawText(gameObj,"1-1",255,25);
        this.drawText(gameObj,"TIME",350,15);
        const today=new Date();
        const startDate=gameObj.entities.startTime;
        this.drawText(gameObj,`${(today.getMinutes()-startDate.getMinutes())*60+today.getSeconds()-startDate.getSeconds()}`,365,25);
       const coinImage= new  Sprite(spriteSheetImage,5,5,10,14);
       gameObj.tool.drawImage(
                coinImage.img,
                coinImage.srcX,
                coinImage.srcY,
                coinImage.srcW,
                coinImage.srcH,
                140,
                16,
                8,
                10
        )
    },
    drawText(gameObj, txt,xCoordinate,yCoordinate){
       const text = gameObj.entities.score;
        gameObj.tool.font = `${text.size} ${text.font}`;
        gameObj.tool.fillStyle = text.color;
        gameObj.tool.fillText(
          txt, xCoordinate , yCoordinate,
        );
     },
}
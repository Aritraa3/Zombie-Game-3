var bg, bgImg;
var zombie, zombieImg;
var player, shooterImg, shooter_shooting;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var bullets = 70;
var gameState = "fight"


function preload(){
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth/2-20, displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1

  player = createSprite(displayWidth-1150, displayHeight-300,50,50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = true;
  player.setCollider("rectangle",0,0,300,300);

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  bulletGroup = new Group()
  zombieGroup = new Group()
  
}

function draw(){
  background(0);

  if(gameState === "fight"){

    if(life===3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
    }

    if(life===2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
    }

    if(life===1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
    }

    if(life===0){
      gameState = "lost"
    }

    if(score==100){
      gameState = "won"
      winning.play();
    }

    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }

    if(keyDown("DOWN_ARROW")||touches.length>0){
      player.y = player.y+30
    }

    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-1150,player.y-30,20,10)
      bullet.velocityX = 20

      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth+2
      player.addImage(shooter_shooting)
      bullets = bullets - 1
      explosionSound.play();
    }
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }
  }
    drawSprites();
}


//creating variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario ,mario_running;
var coin ,coinImage, coinGroup,obstacle, obstacleImage,obstacleGroup,mushroom,mushroomImg,mushroomgroup;
var score=0;
var  ground_Img;
var tempcoin;
var coinsound;
//loading the images
function preload()
{
  ground_Img =loadImage("bg2.png")
  mario_running =loadAnimation("mrio1.png","mrio2.png","mrio3.png");
  mushroomImg = loadAnimation("gooma1.png","gooma2.png")
  coinImage = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");
  obstacleImage = loadImage("ob.png")
  coinsound=loadSound("videoplayback.mp3");
  

   
}
function setup() {
  createCanvas(1000, 400);
    backgroundsound = createAudio("backsound.mp3");
    ground=createSprite(400,355,10000,10);
  
 
  
  mario=createSprite(100,350,900,10)
  mario.addAnimation("moving",mario_running);
  mario.scale=2;
  
  mario.setCollider("rectangle",0,0,20,50)
   coinGroup=new Group ();     
  obstacleGroup=new Group ();
  mushroomGroup=new Group ();
}

function draw() {
  background(ground_Img);
  mario.velocityY = mario.velocityY + 0.8
  textSize(40)
  textStyle(ITALIC);
  fill("red")
  text("Coincollected  "+score ,100,100)

 //making mario jump when space is pressed
if( gameState===PLAY){
  backgroundsound.play();
  ground.visible=false
 if(coinGroup.isTouching(mario)){
     for(var m = 0; m<coinGroup.length;m++){
        coinGroup.get(m).destroy();
        coinsound.play();
      }
         score = score +1; 
        }
  
 if(keyDown("space") && mario.y>280)
  {
    mario.velocityY=-20
   
  }
  if (World.frameCount%280===0){
  ran=Math.round(random(1,2));
  switch(ran){
    case 1:spawnobstacle();
    break;
    case 2:spawnmushroom();
    break;
    default:break;
  }
}
 spawncoin();

 if(mario.isTouching(obstacleGroup) || mario.isTouching(mushroomGroup))  {
   
   gameState=END
  }
  
  mario.collide(ground);
  drawSprites()
}

   if (gameState === END) {
     stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  
     ground.velocityX = 0;
        mario.velocityY = 0
  
   }
}
                                  

 // to spawncoin&obstacle
   function spawncoin(){
if (World.frameCount%150===0){
coin=createSprite(1000,200,10,2);  
coin.y = Math.round(random(80,120))
coin.lifetime=600;
coin.velocityX=-3
coin.addAnimation("spning",coinImage );
coin.scale=1     
coinGroup.add(coin);
}  
}  
  
 function spawnobstacle (){

obstacle=createSprite(900,280,300,2);
obstacle.lifetime=300;
obstacle.velocityX=-3
obstacle.addImage(obstacleImage);
obstacle.scale=0.50
obstacleGroup.add(obstacle);

    
}  

function spawnmushroom (){
 
  mushroom=createSprite(900,315,300,2);
  mushroom.lifetime=300;
  mushroom.velocityX=-3
  mushroom.addAnimation("mushroom",mushroomImg);
  mushroom.scale=0.50
  mushroomGroup.add(mushroom);
  
}
  
 
  
































































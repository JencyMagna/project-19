
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground,groundImg
var score
var jungle,jungleImage
function preload(){
  
   monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage=loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(600,600);
  
  jungle=createSprite(300,300,600,600);
  jungle.addImage(jungleImage);
  jungle.scale=1.2
  jungle.velocityX=-3
  jungle.X=jungle.X/2
  monkey=createSprite(50,500,20,20);
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.2;
  
  ground=createSprite(300,500,1000,10)
  ground.velocityX=-2;
  ground.x=ground.width/2
  ground.visible=false;
  FoodGroup=new Group();
  obstacleGroup=new Group();
  score=0
}


function draw() {
  background("lightblue")
  
 score=Math.ceil(frameCount/frameRate())
  text("survival time "+score,500,30)
  monkey.collide(ground) 
  
  if(jungle.x<0){
    jungle.x=jungle.width/2
  }
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyDown("space")){
    monkey.velocityY = -20;
  }
  
  if (FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    score=score+1;
  }
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  
  switch(score){
          
         case 10 : monkey.scale=0.12;
         break;
          case 20 : monkey.scale=0.14;
         break;
          case 30 : monkey.scale=0.16;
         break;
          case 40 : monkey.scale=0.18;
         break;
         
         }
  
  monkey.velocityY=monkey.velocityY+3 ;
  
  spawnObstacles();
  
  spawnfood();
  
  
  drawSprites();
}


function spawnfood() {
  if (frameCount % 80 === 0) {
    var food= createSprite(600,120,40,10);
    food.y = Math.round(random(40,220));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    
    //add each cloud to the group
    FoodGroup.add(food);

  }
  
}

function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(400,510);
   obstacle.velocityX = -3;
   obstacle.addImage(obstacleImage);
   
   
    obstacle.scale = 0.2;
    //obstacle.lifetime = 300; 
   
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth+1;
 }
}



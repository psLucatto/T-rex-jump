var trex, trex_running, edges;
var groundImage;
var ground
var invisibleground
var pontos= 0
var JOGAR= 1
var ENCERAR= 0
var estadodojogo=  JOGAR
var gameover,gameoverimg
var restart,restartimg
var pular
var contenue
var morto

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvenimage = loadImage("cloud.png")
  cakito1 = loadImage("obstacle1.png")
  cakito2 = loadImage("obstacle2.png")
  cakito3 = loadImage("obstacle3.png")
  cakito4 = loadImage("obstacle4.png")
  cakito5 = loadImage("obstacle5.png")
  cakito6 = loadImage("obstacle6.png")
  trex_collid = loadImage("trex_collided.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
  pular = loadSound("jump.mp3")
  morto = loadSound("die.mp3")
  contenue = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collidir",trex_collid)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  ground=createSprite(200,height-20,400,20)
  ground.x=ground.width/2 
  ground.addImage(groundImage)

  invisibleground=createSprite(200,height-10,400,10)
  invisibleground.visible=false
  grupodecakitos=new Group()
  grupodenuvens=new Group()
  trex.debug=false
  trex.setCollider("circle",0,20,30)
  gameover = createSprite(width/2,height/2)
  gameover.addImage(gameoverimg)
  restart = createSprite(width/2,height/2+55)
  restart.addImage(restartimg)
}


function draw(){
  //definir a cor do plano de fundo 
  background(180);
 if(estadodojogo===JOGAR){
   gameover.visible =false
   restart.visible =false
  pontos=pontos+Math.round(frameCount/60)
 if(pontos>0 && pontos%1000===0){
  contenue.play() 
 }
  ground.velocityX=-2
  //registrando a posição y do trex
  if(ground.x<0){
    ground.x=ground.width/2
 }
 //pular quando tecla de espaço for pressionada
 if(keyDown("space")&& trex.y>=height-40){
  trex.velocityY = -12;
  pular.play()
}
gerarnuvens()
gerarcakitos()
trex.velocityY = trex.velocityY + 0.5;
 if(grupodecakitos.isTouching(trex)){
   estadodojogo=ENCERAR
   morto.play()
 }
 }
 else if(estadodojogo===ENCERAR){
  gameover.visible =true
  restart.visible =true
  trex.velocityY=0
  trex.changeAnimation("collidir",trex_collid)
 grupodecakitos.setVelocityXEach(0)
 grupodenuvens.setVelocityXEach(0)
 ground.velocityX=0
 grupodecakitos.setLifetimeEach(-1)
 grupodenuvens.setLifetimeEach(-1)

 if(mousePressedOver(restart)){
   reset()
 }
 }


  text("score: "+pontos,500,20)
  
 //impedir que o trex caia
  trex.collide(invisibleground)
  drawSprites();
}

function gerarnuvens(){
if(frameCount%60===0){
nuvens=createSprite(width,height,40,10)
nuvens.addImage(nuvenimage)
nuvens.velocityX=-3
nuvens.scale=0.4
nuvens.y=Math.round(random(10,60))
console.log(trex.depth)
console.log(nuvens.depth)
nuvens.depth=trex.depth
trex.depth=trex.depth+1
nuvens.lifetime=width
grupodenuvens.add(nuvens)
}
}
function gerarcakitos(){
  if(frameCount%60==0){
  var cakitos=createSprite(width,height-34,10,40)
    cakitos.velocityX=-3
    cakitos.lifetime=width 
    var rand = Math.round(random(1,6))
    switch(rand){
    case 1:cakitos.addImage(cakito1)
    break
    case 2:cakitos.addImage(cakito2)
    break
    case 3:cakitos.addImage(cakito3)
    break
    case 4:cakitos.addImage(cakito4)
    break
    case 5:cakitos.addImage(cakito5)
    break
    case 6:cakitos.addImage(cakito6)
    break
    default:break
    }
    cakitos.scale=0.5
    grupodecakitos.add(cakitos)
}
}
function reset(){
  estadodojogo=JOGAR
  grupodecakitos.destroyEach()
  grupodenuvens.destroyEach()
  pontos=0
  trex.changeAnimation("running", trex_running) 
    
}
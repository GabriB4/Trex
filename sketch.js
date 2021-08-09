//Cria as variáveis (espaço na memória do computador para guardar as informações)
var trex, trexRunning, edges, ground, imageGround, soloInvisivel, nuvem, nuvemAnimacao, obstaculos, obstaculosImagem1, obstaculosImagem2, obstaculosImagem3, obstaculosImagem4, obstaculosImagem5, obstaculosImagem6, rand, pontuacao, grupoNuvem, grupoObstaculos, trexMorto, fimDeJogo, fimDeJogoImagem, restart, restartImagem, somMorte, somPulo, somCheckpoint;

var jogar = 1;
var encerrar = 0;
var estado = jogar;



//Faz o carregamento das imagens
function preload(){
  
  //Coloca animação de correr do trex
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");  
  
  trexMorto = loadAnimation("trex_collided.png");
  
  
  restartImagem = loadImage("restart.png");
  
  
  //Coloca imagem no ground
  imageGround = loadImage("ground2.png");
  
  nuvemAnimacao = loadImage("cloud.png");
  
  fimDeJogoImagem = loadImage("gameOver.png");
  
  obstaculosImagem1 = loadImage("obstacle1.png");
  obstaculosImagem2 = loadImage("obstacle2.png");
  obstaculosImagem3 = loadImage("obstacle3.png");
  obstaculosImagem4 = loadImage("obstacle4.png");
  obstaculosImagem5 = loadImage("obstacle5.png");
  obstaculosImagem6 = loadImage("obstacle6.png");
  
  somCheckpoint = loadSound("checkPoint.mp3");
  somPulo = loadSound("jump.mp3");
  somMorte = loadSound("die.mp3");
  
  
  
  grupoNuvem = new Group();
  grupoObstaculos = new Group();
}

//Faz as configurações
function setup(){

  
  mensagem = "Olá mundo";
  

  
  //Cria a Tela
  createCanvas(600,200); 
  
  pontuacao = 0;
  
  
  //Da posição e tamnho pro trex
  trex = createSprite(50,60,20,50);
  //Coloca animação no trex
  trex.addAnimation("running", trexRunning); 
  //Da o tamanho do trex
  trex.scale = 0.5;
  
  trex.addAnimation("colidiu", trexMorto);
  
 trex.setCollider("rectangle",0,0,60,60);
  
  
  fimDeJogo = createSprite(240,80,10,10);
  fimDeJogo.addImage(fimDeJogoImagem);
  
  restart =  createSprite(250,120,10,10);
  restart.addImage(restartImagem);
  restart.scale = 0.5;
  //restart.debug = true;
  
  
  //Diz que as edges vão ser as bordas da tela
  edges = createEdgeSprites();

  //Da posição e tamnho pro ground(chão)
  ground = createSprite(200,180,400,20);
  //Coloca imagem no ground
  ground.addImage("ground", imageGround);
  //Define que o ground deve começar do meio da imagem.
  ground.x = ground.width/2;
  
  //Da posição e tamanho pro chão invisível
  soloInvisivel = createSprite(300,190,600,10);
  soloInvisivel.visible = false;
}

//Faz os desenhos na tela atualizarem
function draw(){

  //Limpa a tela
  background("white");
  
  text("Pontuação: "+pontuacao, 500,50);
  
  console.log(frameCount);
  
  if(estado === jogar){
    
    //Da velocidade ao ground
    ground.velocityX = -4;


    //Condição SE apertar na tecla espaço
    if(keyDown("space") && trex.y>160){

      //Da velocidade ao trex
      trex.velocityY = -10; 
      somPulo.play();
    } 

  //Condição SE a imagem do ground sair a esquerda da tela
    if(ground.x < 0){

    //Faz o ground voltar a posição inicial
      ground.x = ground.width/2;
    }

    //Da velocidade ao trex (Gravidade)
    trex.velocityY = trex.velocityY + 0.5;

  
    pontuacao = Math.round(frameCount/10);
    
    fimDeJogo.visible = false;
    restart.visible = false;

    gerarNuvens();
    gerarObstaculos();
    
    if(trex.isTouching(grupoObstaculos)){
     estado = encerrar;
     somMorte.play();
    }
    
  }
 else if(estado === encerrar){
    ground.velocityX = 0;
    grupoNuvem.setVelocityXEach(0);
    grupoObstaculos.setVelocityXEach(0);
    
    trex.changeAnimation("colidiu", trexMorto);
    
    grupoObstaculos.setLifetimeEach(-1);
    
    grupoNuvem.setLifetimeEach(-1);
    
    fimDeJogo.visible = true;
    restart.visible = true;
    
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
      reset();
      
    }
    
    
    
  }
  
  if(pontuacao%100===0&&pontuacao>0){
    somCheckpoint.play();
  }
  
  
  
  
  
  
  
  
  //Impede o trex de cair do ground
  trex.collide (soloInvisivel);
  
  //Desenha todos os sprites na tela
  drawSprites();
  
  
  
}

function gerarNuvens(){
  if(frameCount%60===0){
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.velocityX = -4;
    nuvem.addImage("nuvemImagem",nuvemAnimacao);
    nuvem.scale = 0.8;
    nuvem.depth = 0.5;
    nuvem.lifetime = 320;
    grupoNuvem.add(nuvem);
  }
  
}

function gerarObstaculos(){
  
  if(frameCount%120===0){
    obstaculos = createSprite(600,165,10,40);
    obstaculos.velocityX = -(4 + pontuacao/100);
    rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstaculos.addImage("1",obstaculosImagem1);
        break;
      case 2: obstaculos.addImage("2",obstaculosImagem2);
        break;
      case 3: obstaculos.addImage("3",obstaculosImagem3);
        break;
      case 4: obstaculos.addImage("4",obstaculosImagem4);
        break;
      case 5: obstaculos.addImage("5",obstaculosImagem5);
        break;
      case 6: obstaculos.addImage("6",obstaculosImagem6);
        break;
    }
    
    obstaculos.scale = 0.5;
    obstaculos.lifetime = 320;
    grupoObstaculos.add(obstaculos);
    
   //console.log(obstaculos.velocityX);
  }
}


function reset (){
  
  estado = 1;
  grupoObstaculos.destroyEach();
  grupoNuvem.destroyEach();
  trex.changeAnimation("running", trexRunning);
  frameCount = 0;
}
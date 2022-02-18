//chance de errar
let chanceDeErrar = 0;

//variaveis bola
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variaveis da raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

let bateu = 0;

//pontuacao
let meusPontos = 0;
let pontosOponente = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(bateu);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente(); verificaColisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  incluirPlacar()
  marcaPonto()
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}
function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}
function verificaColisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
  // if(keyIsDown(87)){
  //   yRaqueteOponente -= 10; //multiplayer
  // }
  // if(keyIsDown(83)){
  //   yRaqueteOponente += 10;
  // }
  
  velocidadeYOponente = (yBolinha - yRaqueteOponente - raqueteComprimento / 2) - 30;
  yRaqueteOponente += velocidadeYOponente +chanceDeErrar
  calculaChanceDeErrar()
}
function incluirPlacar(){
  textAlign(CENTER)
  textSize(16)
  fill(255)
  text(meusPontos, 150, 26);
  text(pontosOponente, 450, 26)
}
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play()
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play()
  }
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 39){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      }
    }
}





var music;
var playMusic;
var volSlider;
//var vol;
var gameOverTexte;
var currentSound;
var cnv;
var offset1 = 0;
var offset2 = 1000;
var peakDetect;
var playText;
var face;
var vel = 0.001;
var button;
var tcounter = 10;
var myCounter ;
var mr;
var score;
var scoreNumber = 0;

var scoreText;


 //myCounter = setInterval(metro, 1000);

function preload() {
  music = loadSound("sounds/Mario.mp3");
  musicGameOver = loadSound("sounds/_gameOver.mp3");
  snd1 = loadSound("samples/PR.P.01.09.mp3");
  snd2 = loadSound("samples/PR.P.01.25.mp3");
  snd3 = loadSound("samples/PR.P.01.02.mp3");
  snd4 = loadSound("samples/PR.P.02.08-L.mp3");
  snd5 = loadSound("samples/PR.P.02.22.mp3");
  snd6 = loadSound("samples/PR.P.03.19.mp3");
  snd7 = loadSound("samples/PR.P.04.07.mp3");
  snd8 = loadSound("samples/PR.P.04.15.mp3");
  snd9 = loadSound("samples/PR.P.04.18.mp3");

  img1 = loadImage("images/CageFace.png");
  img2 = loadImage("images/CageFace2.png");

  var currentSound = snd1;
}

function setup() {
  
  cnv = createCanvas (800,700);
  playText = createP('click on my face');
  playText.style("font-size", "12px") ;
  playText.style("color", "#f20000") ;
  
  playMusic = createButton("Put some music");
  playMusic.mousePressed(musicOn); 
  button = createButton("Re start");
  button.hide(); 

  /*score = createP(scoreNumber);
  score.position(10, 10);
  score.style("color", "red");*/
  /*volSlider = createSlider(0, 255, 100);
  volSlider.position = (810, 700);
  volSlider.style("height", "80px");
  vol = map(volSlider.value(), 0, 255, 0 , 1);*/
  gameOverTexte = createElement('h1', "GAME OVER");
  gameOverTexte.position(200, 300);
  gameOverTexte.hide();
  scoreText = createP('SCORE:'); 
  scoreText.position(10, 10);
  /*scoreText.style("color", "black");
  scoreText.style("font-size", 40);*/

  face = createImg("images/CageFace.png");
  face.mousePressed(playSound);

  
  
  delay = new p5.Delay();
  //amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  
  peakDetect = new p5.PeakDetect();
  peakDetect.threshold = 0.1;

  currentSound = snd1;
  myMetro();

  
}

function musicOn(){

    if (music.isPlaying() ){
      music.stop();
    } else {
      music.setVolume(.6);
      music.play();
    }
  }

/*function myMetro () {
  myCounter = setInterval(function(){
    tcounter = tcounter -1;
    if(tcounter <= 0){
       gameOver(); 
    }}, 1000);}*/

function myMetro (){
  myCounter = setInterval(checkState, 1000);
}

  
function checkState(){ 
  tcounter = tcounter -1;
  if(tcounter <= 0){
  gameOver()}
  }


function gameOver(){
  music.stop();
  music.setVolume(.5);
  musicGameOver.play();
  vel = 0;
  tcounter = 10;
  clearInterval(myCounter);
  button.show();
  gameOverTexte.show();
  button.mousePressed(restart);
  playText.hide();
  face.hide();

  
}


function restart(){
  vel = 0.001;
  tcounter = 10;
  clearInterval(myCounter);

  //myCounter = setInterval(metro, 1000);
  
  /*myCounter = setInterval(function(){
    tcounter = tcounter -1;
    if(tcounter <= 0){clearInterval(myCounter);}}, 1000);*/
  button.hide(); 
  face.show();
  gameOverTexte.hide();
  musicGameOver.stop();
  playText.show();
  music.rate(1);
  scoreNumber = 0;
  myMetro(); 
}

/*function metro(){
  tcounter = tcounter -1;
  if(tcounter <= 0){
    clearInterval(myCounter);
    gameOver()
  }
}*/

function playSound () {
  var sounds = [snd1, snd2, snd3, snd4, snd5, snd6, snd7, snd8, snd9];
  currentSound = random(sounds);
  currentSound.play();
  var delTime = random(.3);
  var feedb = random(.7);
  delay.process(currentSound, delTime, feedb, 5000);
   scoreNumber++;
   
  }
/*
function checkState(){ 
  if(tcounter <= 0){
  gameOver()}
  }*/

function draw(){
//checkState();
/*if (tcounter <= 0){
clearInterval(myCounter);
}*/
//background(random (10) + 240);



fft.setInput(currentSound);
fft.analyze();
peakDetect.update(fft);

if (peakDetect.isDetected){
  console.log("got attack");
  
  background(img2);
  vel = vel + 0.001;
  image(img1, random()*width, random()*height);
  image(img1, random()*width, random()*height);
  image(img1, random()*width, random()*height);
  image(img1, random()*width, random()*height);
  tcounter = 10;
  mr = map(vel, 0.001, 0.1, 1, 3);
  music.rate(mr);


 

  //background(img2);
}
else{
  if (tcounter > 3){background(random (10) + 240); }
  else{
  var backCol = map(tcounter, 5, 0, 255, 5);
  var backCol2 = random(backCol) + 255 - backCol;
  background(backCol2, backCol, backCol, random(255));
  

}
  //background(random (10) + 240);
}

offset1 += vel;
offset2 += vel;
var img1X = map (noise(offset1), 0, 1, 0, width);
var img1Y = map (noise(offset2), 0, 1, 0, height);


//image(playImage, img1X, img1Y);
imageMode(CORNER);

//image(img1, img1X, img1Y);
//image(img1, 300, 40);
//image(img2, 200, 100);

//playText.position(img1X,img1Y+80 );
//myEllipse = ellipse(img1X, img1Y, 50, 50);
 face.position(img1X,img1Y+80 );
 playText.position(img1X-10,img1Y+145);

fill(0);
textSize(40);
text(tcounter, 740, 680);
//console.log(tcounter);

fill(255, 0, 0);
textSize(60);
text(scoreNumber, 10, 65);
}


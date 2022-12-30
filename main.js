Status = "";
objects = [];
label = ""

function preload(){
  song = createVideo("alram.wav");
}
function setup(){
 canvas = createCanvas(380, 380);
 canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
}
function start(){
  objectDector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "status: detecting objects";
}

function modelLoaded(){
  console.log(" model loaded successfully");
  Status = true;
}
function gotResults(error, results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw(){
 image(video, 0, 0, 380, 380);
if(Status != "")
{
  objectDector.detect(video, gotResults);
  r = random(255);
  g = random(255);
  b = random(255);
  for(i=0; i< objects.length; i++ ){
  document.getElementById("status").innerHTML = "status: objects detected"; 
 stroke(r, g, b);
 noFill();
 rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
 fill(r, g, b);
 textSize(15);
 percent = floor(objects[i].confidence * 100);
 text(objects[i].label + " " + percent + "%" , objects[i].x + 20, objects[i].y + 20);
 if( objects[i].label== "person"){
  document.getElementById("babyFind").innerHTML = "Baby Found"; 
  song.stop();
}
else{
  document.getElementById("babyFind").innerHTML = "Baby Not Found"; 
  song.play();
}
}
}
}
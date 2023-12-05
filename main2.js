objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
img = loadImage('dog_cat.jpg');
}


function setup() {
canvas = createCanvas(640, 420);
canvas.center();
video=createCapture(VIDEO)
video.size(640, 420)
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Estatus: detectando objetos"; 
video.hide();
}

function modelLoaded() {
console.log("¡Modelo cargado!")
status = true;
}

function gotResult(error, results) {
if (error) {
  console.log(error);
}
console.log(results);
objects = results;
}



function draw() {
  image(video, 0, 0, 640, 420);
if (status != "") {

  r=random(255);
  g=random(255);
  b=random(255);
  objectDetector.detect(video, gotResult);
  for (var i = 0; i < objects.length; i++) {
    document.getElementById("status").innerHTML = "Estatus: objetos detectados";
    document.getElementById("n").innerHTML = objects.length

    fill(r, g, b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  }
}
}
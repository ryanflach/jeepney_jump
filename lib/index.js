require("../assets/style.scss");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var jeepneyWidth = 100;
var jeepneyHeight = 60;

var jeepneyImage = new Image();
jeepneyImage.src = '/assets/images/bussprite.png'

var jeepney = {
  width: jeepneyWidth,
  height: jeepneyHeight,
  image: jeepneyImage
};

function draw(){
  context.drawImage(jeepneyImage, 0, 0, 224, 110, 50, 300, 112, 55);
}

setInterval(draw, 100);

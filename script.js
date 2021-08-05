const canvas = document.querySelector('#draw');
const brushLine = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

brushLine.strokeStyle = '#BADA55';
brushLine.lineJoin = 'round';
brushLine.lineCap = 'round';
brushLine.lineWidth = "30";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let colors = 0;
let direction = true;

const draw = function(e) {
    if(!isDrawing) return;
    console.log(e);

    brushLine.strokeStyle = `hsl(${colors}, 100%, 50%)`;
   
    brushLine.beginPath();
    //Start From
    brushLine.moveTo(lastX, lastY);
    //move to 
    brushLine.lineTo(e.offsetX, e.offsetY);
    brushLine.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]

    colors ++;
    if(colors >= 360){
        colors = 0;
    }

    if(brushLine.lineWidth >= 200 || brushLine.lineWidth <= 1) {
        direction = !direction;
    }

    if(direction) {
        brushLine.lineWidth++;
    } else {
        brushLine.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

import {CanvasCube} from './classes/CanvasCube.ts';

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var canvasCube = new CanvasCube(canvas);

canvasCube.insertImage('img.jpg', 20, 20, 100, 100);
canvas.onclick = function (e) {
    let layer = canvasCube.getTopLayer(e.offsetX, e.offsetY);
    console.log(layer);
    //canvasCube.insertRect('#123123', e.offsetX, e.offsetY, 20, 20);
}
window.canvasCube = canvasCube;

console.log(canvasCube);
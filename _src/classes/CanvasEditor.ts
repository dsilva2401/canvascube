/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q'; 

export class CanvasEditor {

    // Attributes
        canvasElement: HTMLCanvasElement;
        width: number;
        height: number;
        context: CanvasRenderingContext2D;

    // Methods
        constructor (canvasDomElement: HTMLCanvasElement) {
            this.canvasElement = canvasDomElement;
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;
            this.context = this.canvasElement.getContext('2d');
        }
        public clear () {
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        public drawImage (imgSrc: string, x: number, y: number, width: number, height: number) {
            var deferred = Q.defer(); 
            var img = document.createElement('img');
            img.src = imgSrc;
            img.width = width;
            img.height = height;
            img.onload = () => {
                this.context.drawImage( img, x, y, width, height );
                deferred.resolve();
            }
            return deferred.promise;
        }
        public drawRect (color: string, x: number, y: number, width: number, height: number) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        }
        public getPixelColorHex (x: number, y: number) {
            var p = this.context.getImageData(x, y, 1, 1).data; 
            var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
            return hex;
        }
        private rgbToHex (r: number, g: number, b: number) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1,7);
        }

}
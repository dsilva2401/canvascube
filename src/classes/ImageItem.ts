/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q';
import {Item, ItemConstructorParams} from './Item.ts';

export interface ImageItemConstructorParams extends ItemConstructorParams {
    width: number;
    height: number;
    imageSrc: string;
}

export class ImageItem extends Item {
    
    // Attributes
        width: number;
        height: number;
        imageSrc: string;

    // Methods
        constructor (params: ImageItemConstructorParams) {
            super(params);
            this.width = params.width;
            this.height = params.height;
            this.imageSrc = params.imageSrc;
            this.resizeable = true;
        }
        getBusySpaces () {
            var busySpaces = {};
            for (var i=this.y; i<this.height+this.y; i++) {
                for (var j=this.x; j<this.width+this.x; j++) {
                    busySpaces[this.currentLayer.width*i+j] = 1;
                }
            }
            return busySpaces;
        }
        isBusy (x: number, y: number) {
            return (
                x >= this.x && x <= (this.x+this.width) &&
                y >= this.y && y <= (this.y+this.height)
            );
        }
        render () {
            return this.canvasEditor.drawImage(
                this.imageSrc,
                this.x, this.y,
                this.width, this.height
            );
        }

}
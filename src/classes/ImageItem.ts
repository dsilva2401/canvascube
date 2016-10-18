import {Item} from './Item.ts';

export class ImageItem extends Item {
    
    // Attributes
        imgSrc: string;
        x: number;
        y: number;
        width: number;
        height: number;

    // Methods
        constructor (imgSrc: string, x: number, y: number, width: number, height: number) {
            super();
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

}
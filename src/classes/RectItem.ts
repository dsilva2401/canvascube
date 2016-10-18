import {Item} from './Item.ts';

export class RectItem extends Item {

    // Attributes
        color: string;
        x: number;
        y: number;
        width: number;
        height: number;

    // Methods
        constructor (color: string, x: number, y: number, width: number, height: number) {
            super();
            this.color = color;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

}
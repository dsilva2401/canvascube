import {CanvasCube} from './CanvasCube.ts';
import {Item} from './Item.ts';

export class Layer {

    // Attributes
        id: string;
        canvasCube: CanvasCube;
        item: Item;
        availableSpaces: any;
        type: string;

    // Methods
        constructor (canvasCube: CanvasCube) {
            this.id = Math.floor(Math.random()*10000000)+'';
            this.canvasCube = canvasCube;
            this.availableSpaces = {};
        }
        setItem (item: Item) {
            this.item = item;
        }
        setAsBusySpace (x: number, y: number) {
            this.availableSpaces[y*this.canvasCube.height+x] = true;
        }
        isBusy (x: number, y: number) {
            return this.availableSpaces[y*this.canvasCube.height+x];
        }
        setSquareBusySpace  (x: number, y: number, width: number, height: number) {
            for (var i=0; i<height; i++) {
                for (var j=0; j<width; j++) {
                    this.setAsBusySpace(x+j, y+i);
                }
            }
        }
        moveItem (x: number, y: number) {}

}
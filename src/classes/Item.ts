/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q';
import {Layer} from './Layer.ts';
import {CanvasEditor} from './CanvasEditor.ts';

export interface ItemConstructorParams {
    canvasEditor: CanvasEditor;
    x: number;
    y: number;
}

export class Item {

    // Attributes
        id: string;
        x: number;
        y: number;
        resizeable: boolean;
        canvasEditor: CanvasEditor;
        currentLayer: Layer;

    // Methods
        constructor (params: ItemConstructorParams) {
            this.id = Math.floor(Math.random()*10000000000)+'';
            this.canvasEditor = params.canvasEditor;
            this.x = params.x;
            this.y = params.y;
            this.resizeable = false;
        }
        setCurrentLayer (layer: Layer) {
            this.currentLayer = layer;
        }
        render () {
            return Q.defer().promise;
        }
        getBusySpaces () {}
        isBusy (x: number, y: number) {}

}
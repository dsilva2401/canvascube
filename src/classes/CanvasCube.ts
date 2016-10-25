/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q'; 
import {CanvasEditor} from './CanvasEditor.ts';
import {Layer} from './Layer.ts';
import {Item} from './Item.ts';
import {ImageItem, ImageItemConstructorParams} from './ImageItem.ts';
import {RectangleItem, RectangleItemConstructorParams} from './RectangleItem.ts';

interface InsertImageParams extends ImageItemConstructorParams {
    layerId?: string;
}
interface InsertRectangleParams extends RectangleItemConstructorParams {
    layerId?: string;
}

export class CanvasCube {

    // Attributes
        canvasEditor: CanvasEditor;
        canvasElement: HTMLCanvasElement;
        width: number;
        height: number;
        layers: Layer[];
        currentLayerId: string;

    // Methods
        constructor (canvasElement: HTMLCanvasElement) {
            this.canvasEditor = new CanvasEditor(canvasElement);
            this.canvasElement = canvasElement;
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;
            this.currentLayerId = ''; 
            this.layers = [];
        }
        newLayer () {
            let layer = new Layer ({
                width: this.width,
                height: this.height
             });
            this.layers.push(layer);
            return;
        }
        insertImage (params: InsertImageParams) {
            params.canvasEditor = this.canvasEditor;
            var imageItem = new ImageItem(params);
            if (!this.layers.length) this.newLayer();
            var layer = (
                params.layerId ?
                this.getLayerById(params.layerId) :
                this.layers[this.layers.length-1]
            );
            layer.insertItem(imageItem);
            this.render();
        }
        insertRectangle (params: InsertRectangleParams) {
            params.canvasEditor = this.canvasEditor;
            var rectangleItem = new RectangleItem(params);
            if (!this.layers.length) this.newLayer();
            var layer = (
                params.layerId ?
                this.getLayerById(params.layerId) :
                this.layers[this.layers.length-1]
            );
            layer.insertItem(rectangleItem);
            this.render();
        }
        getItemAt (x: number, y: number): Item {
            for (var i=this.layers.length-1; i>=0; i--) {
                var item = this.layers[i].getItemAt(x, y); 
                if (item) return item;
            }
            return null;
        }
        getLayerById (layerId: string): Layer {
            return this.layers.filter((layer) => {
                return (layer.id==layerId);
            })[0];
        }
        reset () {
            this.layers = [];
            this.render();
        }
        render () {
            var deferred = Q.defer();
            this.canvasEditor.clear();
            var currentLayer = 0;
            var fn = () => {
                if (currentLayer>=this.layers.length) {
                    deferred.resolve();
                    return;
                }
                this.layers[currentLayer].render().then(() => {
                    currentLayer++;
                    fn();
                });
            }
            fn();
            return deferred.promise;
        }
        getItemById (itemId: string): Item {
            for (var i=0; i<this.layers.length; i++) {
                var item = this.layers[i].items.filter((item) => {
                    return (item.id == itemId);
                })[0];
                if (item) {
                    return item;
                }
            }
            return null;
        }
        moveItem (itemId: string, x: number, y: number) {
            var item = this.getItemById(itemId);
            item.x = x;
            item.y = y;
            this.render();
        }
        resizeItem (itemId: string, width: number, height: number) {
            var bitem = this.getItemById(itemId);
            if (!bitem.resizeable) return;
            var item = <ImageItem> bitem;
            item.width = width;
            item.height = height;
            this.render();
        }

}
/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q'; 
import {CanvasEditor} from './CanvasEditor.ts';
import {Layer} from './Layer.ts';
import {ImageLayer} from './ImageLayer.ts';
import {RectLayer} from './RectLayer.ts';
import {ImageItem} from './ImageItem.ts';
import {RectItem} from './RectItem.ts';

export class CanvasCube {

    // Attributes
        canvasEditor: CanvasEditor;
        width: number;
        height: number;
        layers: Layer[];

    // Methods
        constructor (canvasElement: HTMLCanvasElement) {
            this.canvasEditor = new CanvasEditor(canvasElement);
            this.width = this.canvasEditor.width;
            this.height = this.canvasEditor.height;
            this.layers = [];
            canvasElement.oncontextmenu = function (e) {
                console.log(e);
            }
        }
        private addLayer (layer: Layer) {
            this.layers.push(layer);
        }
        public insertImage (imgSrc: string, x: number, y: number, width: number, height: number) {
            let imgItem = new ImageItem(imgSrc, x, y, width, height);
            let imgLayer = new ImageLayer(this);
            imgLayer.setItem(imgItem);
            this.addLayer(imgLayer);
            this.render();
        }
        public insertRect (color: string, x: number, y: number, width: number, height: number) {
            let rectItem = new RectItem(color, x, y, width, height);
            let rectLayer = new RectLayer(this);
            rectLayer.setItem(rectItem);
            this.addLayer(rectLayer);
            this.render();
        }
        public getTopLayer (x: number, y: number): Layer {
            for (var i=this.layers.length-1; i>=0; i--) {
                if (this.layers[i].isBusy(x, y)) {
                    return this.layers[i];
                }
            }
            return null;
        }
        private renderLayer (layer?: Layer) {
            if (!layer) return;
            let deferred = Q.defer();
            var item;
            switch (layer.type) {
                case 'image':
                    item = <ImageItem> layer.item;
                    this.canvasEditor.drawImage(
                        item.imgSrc,
                        item.x,
                        item.y,
                        item.width,
                        item.height
                    ).then(() => {
                        deferred.resolve();
                    });
                break;
                case 'rect':
                    item = <RectItem> layer.item;
                    this.canvasEditor.drawRect(
                        item.color,
                        item.x,
                        item.y,
                        item.width,
                        item.height
                    );
                    deferred.resolve();
                break;
            }
            return deferred.promise;
        }
        public clear () {
            this.layers = [];
            this.render();
        }
        public render () {
            this.canvasEditor.clear();
            var currentLayer = 0;
            var fn = () => {
                if (currentLayer>=this.layers.length) return;
                this.renderLayer(this.layers[currentLayer]).then(() => {
                    currentLayer++;
                    fn();
                });
            }
            fn();
        }
        public getLayerById (layerId: string): Layer {
            return this.layers.filter(function (layer) {
                return (layer.id==layerId);
            })[0];
        }
        public layerToTop (layerId: string) {
            var layerIndex = this.layers.indexOf(this.getLayerById(layerId));
            var buff = this.layers[layerIndex];
            console.log(layerIndex);
        }

}
/// <reference path="../../typings/index.d.ts"/>

import * as Q from 'q';
import {CanvasCube} from './CanvasCube.ts';
import {Item} from './Item.ts';

interface LayerConstructorParams {
    width: number;
    height: number;
}

export class Layer {

    // Attributes
        id: string;
        items: Item [];
        busySpaces: any;
        width: number;
        height: number;

    // Methods
        constructor (params: LayerConstructorParams) {
            this.id = Math.floor(Math.random()*100000000)+'';
            this.busySpaces = {};
            this.items = [];
            this.width = params.width;
            this.height = params.height;
        }
        insertItem (item: Item) {
            item.setCurrentLayer(this);
            this.items.push(item);
            this.fillBusySpaces();
        }
        render () {
            var deferred = Q.defer();
            var currentItem = 0;
            var fn = () => {
                if (currentItem>=this.items.length) {
                    deferred.resolve();
                    return;
                }
                this.items[currentItem].render().then(() => {
                    currentItem++;
                    fn();
                });
            }
            fn();
            this.fillBusySpaces();
            return deferred.promise;
        }
        fillBusySpaces () {
            this.busySpaces = {};
            this.items.forEach((item) => {
                Object.keys(item.getBusySpaces()).forEach((spaceAddress) => {
                    this.busySpaces[spaceAddress] = 1;
                })
            });
        }
        getItemAt (x: number, y: number): Item {
            if (!this.busySpaces[this.width*y+x]) return null;
            for (var i=this.items.length-1; i>=0; i--) {
                if (this.items[i].isBusy(x, y)) return this.items[i];
            }
            return null;
        }

}
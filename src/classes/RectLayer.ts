import {Layer} from './Layer.ts';
import {CanvasCube} from './CanvasCube.ts';
import {RectItem} from './RectItem.ts';

export class RectLayer extends Layer {

    // Attributes

    // Methods
        constructor (canvasCube: CanvasCube) {
            super(canvasCube);
            this.type = 'rect';
        }
        setItem (rectItem: RectItem) {
            super.setItem(rectItem);
            this.setSquareBusySpace(
                rectItem.x,
                rectItem.y,
                rectItem.width,
                rectItem.height
            );
        }

}
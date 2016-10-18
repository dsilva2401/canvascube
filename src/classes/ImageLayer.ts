import {Layer} from './Layer.ts';
import {CanvasCube} from './CanvasCube.ts';
import {ImageItem} from './ImageItem.ts';

export class ImageLayer extends Layer {

    // Attributes

    // Methods
        constructor (canvasCube: CanvasCube) {
            super(canvasCube);
            this.type = 'image';
        }
        setItem (imageItem: ImageItem) {
            super.setItem(imageItem);
            this.setSquareBusySpace(
                imageItem.x,
                imageItem.y,
                imageItem.width,
                imageItem.height
            );
        }

}
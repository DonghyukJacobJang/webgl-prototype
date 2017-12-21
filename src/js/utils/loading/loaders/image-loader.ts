const ee = require('event-emitter');
import Asset from '../asset';

export default class ImageLoader {
  public asset: Asset;
  constructor(asset) {
    ee(this);
    this.asset = asset;
  }

  public load() {
    const image = new Image();

    image.onload = () => {
      this.asset.data = image;
      this.emit('loaded', this.asset);
    };

    image.onerror = () => {
      this.emit('error', `Failed to load ${this.asset.src}`);
    };

    image.src = this.asset.src;
  }
}

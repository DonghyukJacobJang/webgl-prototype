const ee = require('event-emitter');
import { TextureLoader } from 'three';
import Asset from '../asset';

export default class Loader {
  public asset: Asset;
  constructor(asset) {
    ee(this);
    this.asset = asset;
  }

  public load() {
    const loader = new TextureLoader();

    const onLoaded = texture => {
      this.asset.data = texture;
      this.emit('loaded', this.asset);
    };

    function onProgress() {}

    const onError = () => {
      this.emit('error', `Failed to load ${this.asset.src}`);
    };

    loader.load(this.asset.src, onLoaded, onProgress, onError);
  }
}

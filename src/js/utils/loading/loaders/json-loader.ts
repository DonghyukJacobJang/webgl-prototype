const ee = require('event-emitter');
import Asset from '../asset';

export default class JsonLoader {
  public asset: Asset;
  constructor(asset) {
    ee(this);
    this.asset = asset;
  }

  public load() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;

      if (req.readyState === 4 && req.status === 200) {
        this.asset.data = JSON.parse(req.responseText);
        this.emit('loaded', this.asset);
      } else {
        this.emit('error', `Failed to load ${this.asset.src}`);
      }
    };

    req.open('GET', this.asset.src, true);
    req.send();
  }
}

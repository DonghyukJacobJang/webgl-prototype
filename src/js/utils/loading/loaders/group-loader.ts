const ee = require('event-emitter');

import { IS_DESKTOP } from '../../../platform';
import ImageLoader from './image-loader';
import JsonLoader from './json-loader';
import TextureLoader from './texture-loader';

export default class GroupLoader {
  public id: string;
  private fileLoaders: any;
  private queue: number;
  private total: number;
  private loaded: number;
  private currentParallel: number;
  private currentLoader: number;
  private parallelLoads: number;
  private loaders: any;

  constructor(id) {
    ee(this);
    this.id = id;
    this.fileLoaders = {
      image: ImageLoader,
      json: JsonLoader,
      texture: TextureLoader
    };
  }

  public load(manifest) {
    this.loaders = [];
    manifest.forEach(asset => {
      if (this.fileLoaders[asset.type] !== undefined) {
        this.loaders.push(new this.fileLoaders[asset.type](asset));
      }
    });

    this.loaded = 0;
    this.queue = 0;
    this.currentLoader = 0;
    this.currentParallel = 0;
    this.parallelLoads = IS_DESKTOP ? 10 : 5;
    this.total = this.loaders.length;

    if (this.total === 0) {
      this.emit('loaded', []);
    } else {
      this._load();
    }
  }

  private _load() {
    if (this.queue < this.total) {
      if (this.currentParallel < this.parallelLoads) {
        const loader = this.loaders[this.queue];
        this.queue += 1;
        this.currentParallel += 1;
        this.currentLoader += 1;
        loader.once('loaded', this._onLoaded.bind(this));
        loader.once('error', this._onError.bind(this));
        loader.load();
        this._load();
      }
    }
  }

  private _onLoaded() {
    this.loaded += 1;
    // console.log(`${this.id} loaded`, this.loaded, '/', this.total);
    if (this.loaded === this.total) {
      const assets = [];
      this.loaders.forEach(loader => {
        assets.push(loader.asset);
      });
      this.emit('loaded', assets);
    } else {
      this.currentParallel -= 1;
      this._load();
    }
  }

  private _onError(error) {
    this.emit('error', error);
  }
}

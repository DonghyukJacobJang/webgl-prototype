import { WEBGL_DIR } from './constants';
import Asset from './utils/loading/asset';

export default [
  new Asset({
    id: 'image',
    src: `${WEBGL_DIR}test/test-1024.jpg`,
    type: 'image'
  }),
  new Asset({
    id: 'json',
    src: `${WEBGL_DIR}test/data.json`,
    type: 'json'
  }),
  new Asset({
    id: 'texture',
    src: `${WEBGL_DIR}test/test-1024.jpg`,
    type: 'texture'
  })
];

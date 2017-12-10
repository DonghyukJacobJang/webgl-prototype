import { Mesh, MeshLambertMaterial, SphereBufferGeometry } from 'three';
import MaterialModifier from 'three-material-modifier';
import Shader from './shader.glsl';

export default class Sphere {
  public mesh: Mesh;

  constructor() {
    const geometry = new SphereBufferGeometry(1, 64, 64);
    const ExtendedLambertMaterial = MaterialModifier.extend(MeshLambertMaterial,
      {
        uniforms: {
          uTime: {
            type: 'f',
            value: 0
          }
        },
        vertexShader: {
          uniforms: Shader.vertexShader.uniforms,
          functions: Shader.vertexShader.functions,
          preTransform: Shader.vertexShader.preTransform,
          postTransform: Shader.vertexShader.postTransform
        },
        fragmentShader: {
          uniforms: Shader.fragmentShader.uniforms,
          functions: Shader.fragmentShader.functions,
          preFragColor: Shader.fragmentShader.preFragColor,
          postFragColor: Shader.fragmentShader.postFragColor
        }
      });
    const material = new ExtendedLambertMaterial();
    this.mesh = new Mesh(geometry, material);
  }

  public update(delta: number) {
    this.mesh.material.uniforms.uTime.value += delta;
  }
}

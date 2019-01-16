import nanogl from "nanogl";

class CreateModelFromJson 
{
  constructor(json, gl)
  {
    this.gl = gl;
    this.vBuffer = new nanogl.ArrayBuffer(gl, new Float32Array(json.verts), gl.STATIC_DRAW);
    this.nBuffer = new nanogl.ArrayBuffer(gl, new Float32Array(json.normals), gl.STATIC_DRAW);
    this.uvBuffer = new nanogl.ArrayBuffer(gl, new Float32Array(json.texcoords), gl.STATIC_DRAW);
    this.vBuffer.attrib('aPosition', 3, gl.FLOAT);
    this.nBuffer.attrib('aNormal', 3, gl.FLOAT);
    this.uvBuffer.attrib('aUv', 2, gl.FLOAT);
    this.iBuffer = new nanogl.IndexBuffer(gl, gl.UNSIGNED_INT, new Uint32Array(json.indices), gl.STATIC_DRAW);
  }
  draw(shader) {
      shader.bind();
      this.vBuffer.bind();
      this.vBuffer.attribPointer(shader);
      this.nBuffer.bind();
      this.nBuffer.attribPointer(shader);
      this.uvBuffer.bind();
      this.uvBuffer.attribPointer(shader);
      this.iBuffer.bind();
      this.iBuffer.draw(this.gl.TRIANGLES);
    }
};

export default CreateModelFromJson;
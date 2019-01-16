import CreateModelFromJson from "./CreateModelFromJson";
import SphereModel from "./models/sphere.json";
import PlaneModel from "./models/plane.json";

import vert from "./shaders/default.vert";
import frag from "./shaders/default.frag";
import mat4 from "gl-mat4";
import nanogl from "nanogl";

let canvas = document.createElement("canvas");
let gl = canvas.getContext("webgl");
gl.enable(gl.DEPTH_TEST);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sphere = new CreateModelFromJson(SphereModel, gl);
let plane = new CreateModelFromJson(PlaneModel, gl);

let shader = new nanogl.Program(gl, vert, frag);
shader.bind();
gl.viewport(0, 0, canvas.width, canvas.height);
document.body.appendChild(canvas);

let frames = 0;
updateLoop();

function updateLoop()
{
  let view = mat4.create();
  mat4.perspective(view, 45, canvas.width / canvas.height, 1, 100);
  mat4.rotateX(view, view, 0.12);
  mat4.translate(view, view, [0, -2, -10]);
  mat4.rotateY(view, view, 0.01 * frames);

  let model = mat4.create();
  mat4.translate(model, model, [0, -1, 0]);
  mat4.scale(model, model, [5, 5, 5]);
  shader.uModel(model);
  shader.uMvp(view);
  
  
  plane.draw(shader);
  for (let i = 0; i < 3; i++) {
    model = mat4.create();
    mat4.translate(model, model, [0, 0, -2.5 + i * 2.5]);
    shader.uModel(model);
    sphere.draw(shader);
  }
  frames++;

  requestAnimationFrame(updateLoop);
}
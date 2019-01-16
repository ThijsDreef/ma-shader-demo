import CreateModelFromJson from "./CreateModelFromJson";
import SphereModel from "./models/sphere.json";
import PlaneModel from "./models/plane.json";

import vert from "./shaders/default/default.vert";
import frag from "./shaders/default/default.frag";
import customVert from "./shaders/custom/default.vert";
import customFrag from "./shaders/custom/default.frag";
import lightinFrag from "./shaders/lighting/default.frag";
import lightinVert from "./shaders/lighting/default.vert";

import mat4 from "gl-mat4";
import nanogl from "nanogl";
let scale = 1;
let canvas = document.createElement("canvas");
let gl = canvas.getContext("webgl");
let shaders = [];
shaders.push(new nanogl.Program(gl, vert, frag));
shaders.push(new nanogl.Program(gl, customVert, customFrag));
shaders.push(new nanogl.Program(gl, lightinVert, lightinFrag));


gl.enable(gl.DEPTH_TEST);
gl.getExtension("OES_element_index_uint");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sphere = new CreateModelFromJson(SphereModel, gl);
let plane = new CreateModelFromJson(PlaneModel, gl);

loadJson("sphere.json", (json)=>{
  sphere = new CreateModelFromJson(json, gl);
  scale = 0.01;
});
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
  
  shaders[0].bind();
  shaders[0].uModel(model);
  shaders[0].uMvp(view);  
  plane.draw(shaders[0]);
  for (let i = 0; i < shaders.length; i++) {
    shaders[i].bind();
    shaders[i].uModel(model);
    shaders[i].uMvp(view);
    model = mat4.create();
    mat4.translate(model, model, [0, -1, -2.5 + i * 2.5]);
    mat4.scale(model, model, [scale, scale, scale]);
    shaders[i].uModel(model);
    sphere.draw(shaders[i]);
  }
  frames++;

  requestAnimationFrame(updateLoop);
}

function loadJson(url, callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(JSON.parse(xobj.responseText));
      }
  };
  xobj.send(null);  
}
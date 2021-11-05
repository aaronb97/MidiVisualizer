import WebMidi from "webmidi";
import * as THREE from "three";

let camera, scene: THREE.Scene, renderer;
let geometry, material, mesh;

WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
    const input = WebMidi.inputs[0];
    input.addListener("noteon", "all", function (e) {
      console.log(
        "Received 'noteon' message (" + e.note.name + e.note.octave + ")."
      );
      addShape();
    });
  }
});

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
}

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}

function addShape() {
  const ball = new THREE.SphereGeometry(0.02);
  const material = new THREE.MeshBasicMaterial();
  material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const mesh = new THREE.Mesh(ball, material);
  console.log(mesh.position);
  mesh.position.set(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  );

  scene.add(mesh);
}

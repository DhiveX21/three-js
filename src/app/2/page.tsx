"use client";

import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

type Props = {};

const Two = (props: Props) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#333");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const light = new THREE.AmbientLight("#ffffff"); // soft white light
    scene.add(light);
    const renderer = new THREE.WebGLRenderer();
    document.getElementById("element-1")?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const stats = new Stats();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("element-1")?.appendChild(stats.dom);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({
      color: "#F00",
      shininess: 100,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // dat.gui

    const gui = new GUI();

    gui.add(cube.rotation, "x", 0, Math.PI).name("Rotate X Axis");
    gui.add(cube.rotation, "y", 0, Math.PI).name("Rotate Y Axis");
    gui.add(cube.rotation, "z", 0, Math.PI).name("Rotate Z Axis");
    gui.add(cube.scale, "x", 0, 2).name("Scale X Axis");
    gui.add(cube.scale, "y", 0, 2).name("Scale Y Axis");
    gui.add(cube.scale, "z", 0, 2).name("Scale Z Axis");

    const materialParams = {
      cubeColor: cube.material.color.getHex(),
    };

    gui.add(cube.material, "wireframe");
    gui
      .addColor(materialParams, "cubeColor")
      .onChange((value) => cube.material.color.set(value));

    // end dat.gui

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      stats.update();
      controls.update();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div id="element-1">Two</div>;
};

export default Two;

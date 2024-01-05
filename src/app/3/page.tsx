"use client";

import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

type Props = {};

const Three = (props: Props) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#333");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const light = new THREE.PointLight("#ffffff");
    light.position.set(2, 2, 0);
    const light2 = new THREE.PointLight("#ffffff");
    light2.position.set(-2, -2, 0);

    const renderer = new THREE.WebGLRenderer();
    document.getElementById("element-1")?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const stats = new Stats();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("element-1")?.appendChild(stats.dom);

    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.TextureLoader().load("/textures/Login-B.png");
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);

    const geometry1 = new THREE.BoxGeometry();
    const texture1 = new THREE.TextureLoader().load("/textures/Login-B.png");
    const material1 = new THREE.MeshStandardMaterial({
      bumpMap: texture1,
    });
    const cube1 = new THREE.Mesh(geometry1, material1);
    cube1.position.set(2, 0, 0);

    const geometry2 = new THREE.BoxGeometry();
    const texture2 = new THREE.TextureLoader().load("/textures/Login-B.png");
    const material2 = new THREE.MeshStandardMaterial({
      alphaMap: texture2,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.set(-2, 0, 0);
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
    scene.add(light);
    scene.add(light2);
    scene.add(cube);
    scene.add(cube1);
    scene.add(cube2);

    function animate() {
      requestAnimationFrame(animate);

      stats.update();
      controls.update();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube1.rotation.x += 0.01;
      cube1.rotation.y += 0.01;
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div id="element-1">Three</div>;
};

export default Three;

"use client";

import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

type Props = {};

const One = (props: Props) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    document.getElementById("element-1")?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const stats = new Stats();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("element-1")?.appendChild(stats.dom);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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

  return <div id="element-1">One</div>;
};

export default One;

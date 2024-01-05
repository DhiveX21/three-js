"use client";

import React, { useEffect } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

type Props = {};

const Four: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#333");

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.5,
      10000
    );
    camera.position.z = 50;

    // Light setup
    const ambientLight = new THREE.AmbientLight("#ffffff", 1);
    scene.add(ambientLight);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("element-2")?.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);

    // // Stats setup
    // const stats = new Stats();
    // document.getElementById("element-2")?.appendChild(stats.dom);

    // Cubes setup
    const createCube = (position: THREE.Vector3) => {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);
      cube.position.copy(position);
      scene.add(cube);
    };

    createCube(new THREE.Vector3());
    createCube(new THREE.Vector3(-2, 0, 0));
    createCube(new THREE.Vector3(2, 0, 0));

    const floorGeometry = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial = new THREE.MeshNormalMaterial();
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -2, 0);
    scene.add(floor);

    // Handle wheel event for zooming
    console.log(camera.position);
    const handleWheel = (event: WheelEvent) => {
      console.log(event.deltaY);
      console.log(camera.position);
      camera.position.z = camera.position.z + event.deltaY / 100;
      console.log(camera.position);
    };

    // Attach event listener for mouse wheel
    document.addEventListener("wheel", handleWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // stats.update();
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <div id="element-2">Four</div>;
};

export default Four;

"use client";

import React, { useEffect } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
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

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("element-2")?.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);

    // Cubes setup
    const createCube = (position: THREE.Vector3) => {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial();
      const cube = new THREE.Mesh(geometry, material);
      cube.position.copy(position);
      scene.add(cube);
    };

    createCube(new THREE.Vector3());
    createCube(new THREE.Vector3(-2, 0, 0));
    createCube(new THREE.Vector3(2, 0, 0));

    const floorGeometry = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial = new THREE.MeshStandardMaterial();
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -2, 0);
    scene.add(floor);

    createCube(new THREE.Vector3(40, 0, 0));
    createCube(new THREE.Vector3(38, 0, 0));
    createCube(new THREE.Vector3(42, 0, 0));

    const floorGeometry1 = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial1 = new THREE.MeshStandardMaterial();
    const floor1 = new THREE.Mesh(floorGeometry1, floorMaterial1);
    floor1.position.set(40, -2, 0);
    scene.add(floor1);

    createCube(new THREE.Vector3(80, 0, 0));
    createCube(new THREE.Vector3(78, 0, 0));
    createCube(new THREE.Vector3(82, 0, 0));

    const floorGeometry2 = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial2 = new THREE.MeshStandardMaterial();
    const floor2 = new THREE.Mesh(floorGeometry2, floorMaterial2);
    floor2.position.set(80, -2, 0);
    scene.add(floor2);

    // Light setup

    // pointlight
    const pointLight = new THREE.PointLight("#ffffff", 20, 20);
    pointLight.position.set(6, 6, 6);
    pointLight.receiveShadow = true;
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointLight);
    scene.add(pointLightHelper);

    //SpotLight
    const spotLight = new THREE.SpotLight(
      "#ffffff",
      20,
      2000,
      Math.PI / 8,
      0.1
    );
    spotLight.position.set(46, 6, 6);
    spotLight.rotation.x = Math.PI / 4;
    spotLight.target = floor1;
    spotLight.receiveShadow = true;
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLight);
    scene.add(spotLightHelper);

    //Directional Light
    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.1);
    directionalLight.position.set(66, 6, 6);
    directionalLight.rotation.x = Math.PI / 4;
    directionalLight.target = floor2;
    directionalLight.receiveShadow = true;
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    scene.add(directionalLight);
    scene.add(directionalLightHelper);

    // dat.gui

    const pointLightGui = new GUI();

    pointLightGui.add(pointLight.position, "x", -6, 6).name("position X Axis");
    pointLightGui.add(pointLight.position, "y", -6, 6).name("position Y Axis");
    pointLightGui.add(pointLight.position, "z", -6, 6).name("position Z Axis");

    // const spotLightGui = new GUI();

    // spotLightGui.add(spotLight.position, "x", -6, 6).name("position X Axis");
    // spotLightGui.add(spotLight.position, "y", -6, 6).name("position Y Axis");
    // spotLightGui.add(spotLight.position, "z", -6, 6).name("position Z Axis");

    // const directionalLightGui = new GUI();

    // directionalLightGui
    //   .add(directionalLight.position, "x", -6, 6)
    //   .name("position X Axis");
    // directionalLightGui
    //   .add(directionalLight.position, "y", -6, 6)
    //   .name("position Y Axis");
    // directionalLightGui
    //   .add(directionalLight.position, "z", -6, 6)
    //   .name("position Z Axis");

    // end dat.gui

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // stats.update();
      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div id="element-2">Four</div>;
};

export default Four;

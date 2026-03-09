import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Dice3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = 200;
    const height = 200;

    // Сцена
    const scene = new THREE.Scene();

    // Камера
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Куб
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Текстуры или просто цифры на гранях
    const loader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load("dice1.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("dice2.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("dice3.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("dice4.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("dice5.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("dice6.png") }),
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Анимация вращения
    let animationFrameId: number;
    let progress = 0;
    const targetRotation = {
      x: Math.floor(Math.random() * 4) * (Math.PI / 2) + 4 * Math.PI,
      y: Math.floor(Math.random() * 4) * (Math.PI / 2) + 4 * Math.PI,
    };

    const animate = () => {
      progress += 0.02;
      if (progress > 1) progress = 1;

      // ease-out эффект
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      cube.rotation.x = targetRotation.x * easeOut(progress);
      cube.rotation.y = targetRotation.y * easeOut(progress);

      renderer.render(scene, camera);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
}

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function OrbitalView({ addLog }) {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.66, window.innerHeight);

    const container = document.getElementById("orbital-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Earth
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg"
    );
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 30
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Satellite
    const satelliteGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const satelliteMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satellite.position.set(8, 0, 0);
    scene.add(satellite);

    // Starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let angle = 0;
    let lastThreatTime = 0;
    const clock = new THREE.Clock();

    const threatObjects = [];

    const simulateThreat = () => {
      const threatTypes = ["Cyberattack", "Debris Collision", "Signal Jamming"];
      const threat =
        threatTypes[Math.floor(Math.random() * threatTypes.length)];
      addLog(
        "[" + new Date().toLocaleTimeString() + "] Threat Detected: " + threat
      );

      // Create a threat visual (a glowing sphere)
      const threatGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const threatMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.8
      });
      const threatMesh = new THREE.Mesh(threatGeometry, threatMaterial);
      threatMesh.position.set(
        Math.random() * 15 - 7.5,
        Math.random() * 15 - 7.5,
        Math.random() * 15 - 7.5
      );
      scene.add(threatMesh);
      threatObjects.push({ mesh: threatMesh, lifetime: clock.getElapsedTime() });
    };

    const animate = () => {
      requestAnimationFrame(animate);

      earth.rotation.y += 0.002;
      atmosphere.rotation.y += 0.002;

      angle += 0.01;
      satellite.position.x = 8 * Math.cos(angle);
      satellite.position.z = 8 * Math.sin(angle);

      const elapsedTime = clock.getElapsedTime();
      if (Math.floor(elapsedTime) % 5 === 0 && elapsedTime - lastThreatTime > 1) {
        simulateThreat();
        lastThreatTime = elapsedTime;
      }

      // Animate threats
      for (let i = 0; i < threatObjects.length; i++) {
        threatObjects[i].mesh.rotation.x += 0.01;
        threatObjects[i].mesh.rotation.y += 0.01;

        // Remove threat after 4 seconds
        if (elapsedTime - threatObjects[i].lifetime > 4) {
          scene.remove(threatObjects[i].mesh);
          threatObjects.splice(i, 1);
          i--;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.66, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [addLog]);

  return null;
}

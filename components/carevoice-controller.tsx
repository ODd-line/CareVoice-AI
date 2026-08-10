"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type ControllerMode = "ready" | "listening" | "medication" | "help" | "family";

const modes: Record<ControllerMode, { color: number; label: string }> = {
  ready: { color: 0x31d17c, label: "Ready for patient" },
  listening: { color: 0x2f86ff, label: "CareVoice is listening" },
  medication: { color: 0xffb629, label: "Medication reminder due" },
  help: { color: 0xff4d48, label: "Nurse request sent" },
  family: { color: 0xe66f45, label: "Family connection open" }
};

const keyDetails: Record<string, { title: string; detail: string; mode?: ControllerMode }> = {
  FAMILY: { title: "Family", detail: "Call or message an approved family member.", mode: "family" },
  MEDS: { title: "Medication", detail: "Review a staff-approved reminder and record a response.", mode: "medication" },
  GAMES: { title: "Games", detail: "Open Mahjong or accept a room challenge." },
  HOME: { title: "Home", detail: "Return to the accessible patient home screen." },
  YES: { title: "Yes", detail: "Give a clear response without navigating a touchscreen." },
  VOICE: { title: "CareVoice", detail: "Begin a guided voice check-in.", mode: "listening" },
  NO: { title: "No", detail: "Decline or answer no with one tactile input." },
  NURSE: { title: "Nurse", detail: "Send a bedside assistance request.", mode: "help" },
  DIAL: { title: "Control dial", detail: "Adjust volume or move through a spoken prompt." },
  JOYSTICK: { title: "Navigation joystick", detail: "Move through rooms, games, and large choices." }
};

function makeLabelTexture(label: string, foreground: string, background: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = foreground;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${label.length > 6 ? 30 : 38}px sans-serif`;
  context.fillText(label, 128, 132);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function CareVoiceController() {
  const mountRef = useRef<HTMLDivElement>(null);
  const setSceneModeRef = useRef<(mode: ControllerMode) => void>(() => undefined);
  const [mode, setMode] = useState<ControllerMode>("ready");
  const [selectedKey, setSelectedKey] = useState(keyDetails.VOICE);
  const [status, setStatus] = useState("Loading controller");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      const timer = window.setTimeout(() => setStatus("3D preview unavailable"), 0);
      return () => window.clearTimeout(timer);
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(9.8, 8.2, 11.8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 9;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.target.set(0.6, 0.35, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;

    const product = new THREE.Group();
    product.rotation.y = -0.28;
    scene.add(product);

    const materials = {
      body: new THREE.MeshPhysicalMaterial({ color: 0xe8e9e2, roughness: 0.32, metalness: 0.08, clearcoat: 0.35 }),
      base: new THREE.MeshPhysicalMaterial({ color: 0x252c29, roughness: 0.28, metalness: 0.72 }),
      inset: new THREE.MeshStandardMaterial({ color: 0x131816, roughness: 0.5, metalness: 0.25 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x242b28, roughness: 0.34, metalness: 0.36 }),
      silver: new THREE.MeshStandardMaterial({ color: 0xb7beb8, roughness: 0.24, metalness: 0.8 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x111412, roughness: 0.84 })
    };

    function rounded(width: number, height: number, depth: number, radius: number, material: THREE.Material) {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 6, radius), material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    const interactive: THREE.Mesh[] = [];
    const lowerBase = rounded(10.2, 0.72, 6.8, 0.42, materials.base);
    lowerBase.position.y = -0.05;
    product.add(lowerBase);

    const body = rounded(9.85, 1.2, 6.45, 0.5, materials.body);
    body.position.y = 0.58;
    body.rotation.x = -0.035;
    product.add(body);

    const keyWell = rounded(7.2, 0.25, 4.25, 0.35, materials.inset);
    keyWell.position.set(-0.82, 1.03, -0.05);
    keyWell.rotation.x = -0.035;
    product.add(keyWell);

    function createKey(label: string, x: number, z: number, color: string, foreground = "#151917") {
      const material = new THREE.MeshPhysicalMaterial({
        color,
        map: makeLabelTexture(label, foreground, color),
        roughness: 0.42,
        clearcoat: 0.24,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0
      });
      const key = rounded(label === "VOICE" ? 1.62 : 1.52, 0.55, 1.36, 0.16, material);
      key.position.set(x, 1.12, z);
      key.rotation.x = -0.035;
      key.userData = { label, baseY: 1.12, pressedAt: 0 };
      interactive.push(key);
      product.add(key);
    }

    const columns = [-3.25, -1.55, 0.15, 1.85];
    createKey("FAMILY", columns[0], -1.08, "#d9e9ff");
    createKey("MEDS", columns[1], -1.08, "#ffe3a7");
    createKey("GAMES", columns[2], -1.08, "#e5dbff");
    createKey("HOME", columns[3], -1.08, "#dfe5df");
    createKey("YES", columns[0], 0.68, "#c8f2d7");
    createKey("VOICE", columns[1], 0.68, "#73e3a5");
    createKey("NO", columns[2], 0.68, "#ffd2c9");
    createKey("NURSE", columns[3], 0.68, "#ff8580", "#32100f");

    const screenFrame = rounded(1.65, 0.48, 2.18, 0.22, materials.dark);
    screenFrame.position.set(3.62, 1.04, -1.23);
    screenFrame.rotation.x = -0.035;
    product.add(screenFrame);

    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x132019, emissive: 0x31d17c, emissiveIntensity: 0.42, roughness: 0.24 });
    const screen = rounded(1.35, 0.16, 1.86, 0.14, screenMaterial);
    screen.position.set(3.62, 1.32, -1.25);
    screen.rotation.x = -0.035;
    product.add(screen);

    const dialBase = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.82, 0.34, 64), materials.silver);
    dialBase.position.set(3.55, 1.15, 1.08);
    product.add(dialBase);
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.62, 0.52, 64), materials.dark);
    dial.position.set(3.55, 1.48, 1.08);
    dial.userData = { label: "DIAL", baseY: 1.48, pressedAt: 0 };
    dial.castShadow = true;
    interactive.push(dial);
    product.add(dial);

    const joystickStem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.64, 32), materials.silver);
    joystickStem.position.set(2.72, 1.44, 1.26);
    joystickStem.rotation.z = 0.14;
    product.add(joystickStem);
    const joystick = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 20), materials.rubber);
    joystick.scale.y = 0.72;
    joystick.position.set(2.66, 1.77, 1.26);
    joystick.userData = { label: "JOYSTICK", baseY: 1.77, pressedAt: 0 };
    joystick.castShadow = true;
    interactive.push(joystick);
    product.add(joystick);

    const ledMaterial = new THREE.MeshStandardMaterial({ color: 0x31d17c, emissive: 0x31d17c, emissiveIntensity: 2.2, roughness: 0.2 });
    const led = rounded(8.4, 0.06, 0.08, 0.03, ledMaterial);
    led.position.set(-0.42, 0.33, 3.24);
    product.add(led);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(13, 96), new THREE.ShadowMaterial({ color: 0x19201c, opacity: 0.18 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.48;
    floor.receiveShadow = true;
    scene.add(floor);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x64756b, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(7, 12, 9);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x7cb7ff, 1.8);
    fillLight.position.set(-9, 5, -4);
    scene.add(fillLight);

    setSceneModeRef.current = (nextMode) => {
      const next = modes[nextMode];
      ledMaterial.color.setHex(next.color);
      ledMaterial.emissive.setHex(next.color);
      screenMaterial.emissive.setHex(next.color);
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerUp = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(interactive, false)[0]?.object as THREE.Mesh | undefined;
      if (!hit) return;
      const detail = keyDetails[String(hit.userData.label)];
      if (!detail) return;
      hit.userData.pressedAt = performance.now();
      setSelectedKey(detail);
      if (detail.mode) setMode(detail.mode);
    };
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      if (width < 480) {
        controls.minDistance = 22;
        controls.maxDistance = 44;
        camera.position.set(20.6, 17.5, 25.7);
        controls.target.set(0, 0.1, 0);
      } else if (width < 760) {
        controls.minDistance = 12;
        controls.maxDistance = 26;
        camera.position.set(11.8, 10.2, 14.8);
        controls.target.set(0, 0.3, 0);
      } else {
        controls.minDistance = 9;
        controls.maxDistance = 22;
        camera.position.set(9.8, 8.2, 11.8);
        controls.target.set(0.6, 0.35, 0);
      }
      camera.updateProjectionMatrix();
      controls.update();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const clock = new THREE.Clock();
    const animate = (time: number) => {
      const delta = clock.getDelta();
      interactive.forEach((part) => {
        const pressedAt = Number(part.userData.pressedAt || 0);
        const target = Number(part.userData.baseY);
        part.position.y = THREE.MathUtils.damp(part.position.y, target, 10, delta);
        if (pressedAt && time - pressedAt < 180) part.position.y -= Math.sin(((time - pressedAt) / 180) * Math.PI) * 0.12;
      });
      ledMaterial.emissiveIntensity = 1.8 + Math.sin(time * 0.004) * 0.5;
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    const statusTimer = window.setTimeout(() => setStatus("Interactive model ready"), 0);

    return () => {
      window.clearTimeout(statusTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial && material.map) material.map.dispose();
          material.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  function chooseMode(nextMode: ControllerMode) {
    setMode(nextMode);
    setSceneModeRef.current(nextMode);
  }

  return (
    <div className="controller-experience">
      <div ref={mountRef} className="controller-canvas" aria-label="Interactive 3D CareVoice Micro controller. Drag to rotate and select a key." />
      <p className="controller-render-status"><span className="controller-live-dot" />{status}</p>
      <div className="controller-readout" aria-live="polite">
        <span>Selected control</span>
        <strong>{selectedKey.title}</strong>
        <p>{selectedKey.detail}</p>
      </div>
      <div className="controller-modes" role="group" aria-label="Controller status simulation">
        {(Object.keys(modes) as ControllerMode[]).map((item) => (
          <button key={item} type="button" className={mode === item ? "is-active" : ""} onClick={() => chooseMode(item)}>
            {item === "help" ? "Help sent" : item}
          </button>
        ))}
        <span>{modes[mode].label}</span>
      </div>
    </div>
  );
}
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const mount = document.getElementById("microCanvas");
const renderStatus = document.getElementById("renderStatus");
const modeLabel = document.getElementById("modeLabel");
const modeDot = document.getElementById("modeDot");
const keyReadout = document.getElementById("keyReadout");
const rotateButton = document.getElementById("rotateButton");
const explodeButton = document.getElementById("explodeButton");
const resetViewButton = document.getElementById("resetViewButton");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f4ed);
scene.fog = new THREE.Fog(0xf2f4ed, 16, 28);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
const desktopCamera = new THREE.Vector3(8.8, 8.2, 10.8);
const mobileCamera = new THREE.Vector3(10.8, 10.4, 14.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
mount.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 9;
controls.maxDistance = 24;
controls.maxPolarAngle = Math.PI * 0.49;
controls.target.set(0, 0.45, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.65;

const product = new THREE.Group();
product.rotation.y = -0.25;
scene.add(product);

const materials = {
  body: new THREE.MeshPhysicalMaterial({ color: 0xe6e8df, roughness: 0.36, metalness: 0.08, clearcoat: 0.3 }),
  base: new THREE.MeshPhysicalMaterial({ color: 0x2b302d, roughness: 0.28, metalness: 0.72 }),
  inset: new THREE.MeshStandardMaterial({ color: 0x161a18, roughness: 0.46, metalness: 0.25 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x252b28, roughness: 0.32, metalness: 0.36 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xb7beb8, roughness: 0.24, metalness: 0.8 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x111412, roughness: 0.84 }),
  screen: new THREE.MeshPhysicalMaterial({ color: 0x0e1512, roughness: 0.18, metalness: 0.15, clearcoat: 0.9 }),
};

const interactiveKeys = [];
const lightMaterials = [];
const explodeParts = [];
const keyData = {
  FAMILY: ["Family", "Call or message an approved family member."],
  MEDS: ["Medication", "Review a staff-approved reminder and record a response."],
  GAMES: ["Games", "Open Mahjong or accept a room challenge."],
  HOME: ["Home", "Return to the patient’s accessible home screen."],
  YES: ["Yes", "Give a clear response to a CareVoice prompt."],
  VOICE: ["CareVoice", "Press to begin a voice check-in."],
  NO: ["No", "Decline or answer no without navigating the screen."],
  NURSE: ["Nurse", "Send a non-emergency bedside assistance request."],
};

function makeRounded(width, height, depth, radius, material) {
  const geometry = new RoundedBoxGeometry(width, height, depth, 6, radius);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeLabelTexture(label, foreground = "#151917", background = "#e9ebe4") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = foreground;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${label.length > 6 ? 31 : 38}px Manrope, sans-serif`;
  context.fillText(label, 128, 132);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function createKey(label, x, z, options = {}) {
  const width = options.width || 1.52;
  const depth = options.depth || 1.36;
  const color = options.color || "#e9ebe4";
  const keyMaterial = new THREE.MeshPhysicalMaterial({
    color,
    map: makeLabelTexture(label, options.foreground || "#151917", color),
    roughness: 0.42,
    metalness: 0.02,
    clearcoat: 0.24,
    emissive: new THREE.Color(options.emissive || 0x000000),
    emissiveIntensity: 0,
  });
  const key = makeRounded(width, 0.55, depth, 0.16, keyMaterial);
  key.position.set(x, 1.12, z);
  key.rotation.x = -0.035;
  key.userData = { keyLabel: label, baseY: key.position.y, explodeY: options.explodeY || 1.25 };
  product.add(key);
  interactiveKeys.push(key);
  lightMaterials.push(keyMaterial);
  explodeParts.push(key);
  return key;
}

const lowerBase = makeRounded(10.2, 0.72, 6.8, 0.42, materials.base);
lowerBase.position.y = -0.05;
product.add(lowerBase);

const body = makeRounded(9.85, 1.2, 6.45, 0.5, materials.body);
body.position.y = 0.58;
body.rotation.x = -0.035;
product.add(body);

const keyWell = makeRounded(7.2, 0.25, 4.25, 0.35, materials.inset);
keyWell.position.set(-0.82, 1.03, -0.05);
keyWell.rotation.x = -0.035;
product.add(keyWell);

const positions = [-3.25, -1.55, 0.15, 1.85];
createKey("FAMILY", positions[0], -1.08, { color: "#d9e9ff" });
createKey("MEDS", positions[1], -1.08, { color: "#ffe3a7" });
createKey("GAMES", positions[2], -1.08, { color: "#e5dbff" });
createKey("HOME", positions[3], -1.08, { color: "#dfe5df" });
createKey("YES", positions[0], 0.68, { color: "#c8f2d7" });
createKey("VOICE", positions[1], 0.68, { width: 1.62, color: "#73e3a5" });
createKey("NO", positions[2], 0.68, { color: "#ffd2c9" });
createKey("NURSE", positions[3], 0.68, { color: "#ff8580", foreground: "#32100f" });

const screenFrame = makeRounded(1.65, 0.48, 2.18, 0.22, materials.dark);
screenFrame.position.set(3.62, 1.04, -1.23);
screenFrame.rotation.x = -0.035;
product.add(screenFrame);

const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x132019, emissive: 0x31d17c, emissiveIntensity: 0.42, roughness: 0.24 });
const screen = makeRounded(1.35, 0.16, 1.86, 0.14, screenMaterial);
screen.position.set(3.62, 1.32, -1.25);
screen.rotation.x = -0.035;
product.add(screen);
lightMaterials.push(screenMaterial);

const dialBase = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.82, 0.34, 64), materials.silver);
dialBase.position.set(3.55, 1.15, 1.08);
dialBase.castShadow = true;
product.add(dialBase);

const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.62, 0.52, 64), materials.dark);
dial.position.set(3.55, 1.48, 1.08);
dial.castShadow = true;
dial.userData = { keyLabel: "DIAL", baseY: dial.position.y, explodeY: 1.45 };
product.add(dial);
interactiveKeys.push(dial);
explodeParts.push(dial);
keyData.DIAL = ["Control dial", "Rotate to change volume or move through a prompt."];

for (let index = 0; index < 24; index += 1) {
  const notch = makeRounded(0.045, 0.08, 0.2, 0.015, materials.silver);
  const angle = (index / 24) * Math.PI * 2;
  notch.position.set(3.55 + Math.sin(angle) * 0.48, 1.77, 1.08 + Math.cos(angle) * 0.48);
  notch.rotation.y = angle;
  product.add(notch);
}

const joystickStem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.64, 32), materials.silver);
joystickStem.position.set(2.72, 1.44, 1.26);
joystickStem.rotation.z = 0.14;
product.add(joystickStem);

const joystickCap = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 20), materials.rubber);
joystickCap.scale.y = 0.72;
joystickCap.position.set(2.66, 1.77, 1.26);
joystickCap.castShadow = true;
joystickCap.userData = { keyLabel: "JOYSTICK", baseY: joystickCap.position.y, explodeY: 1.25 };
product.add(joystickCap);
interactiveKeys.push(joystickCap);
explodeParts.push(joystickCap);
keyData.JOYSTICK = ["Navigation joystick", "Move between rooms, games, and large on-screen choices."];

const nfcRingMaterial = new THREE.MeshStandardMaterial({ color: 0x9ba59f, emissive: 0x31d17c, emissiveIntensity: 0.12, roughness: 0.46 });
const nfcRing = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.035, 16, 64), nfcRingMaterial);
nfcRing.rotation.x = Math.PI / 2;
nfcRing.position.set(3.58, 1.25, -1.22);
product.add(nfcRing);

const ledMaterial = new THREE.MeshStandardMaterial({ color: 0x31d17c, emissive: 0x31d17c, emissiveIntensity: 2.2, roughness: 0.2 });
const ledStrip = makeRounded(8.4, 0.06, 0.08, 0.03, ledMaterial);
ledStrip.position.set(-0.42, 0.33, 3.24);
product.add(ledStrip);

for (let index = 0; index < 8; index += 1) {
  const grille = makeRounded(0.08, 0.12, 1.1, 0.03, materials.dark);
  grille.position.set(-1.8 + index * 0.42, 0.82, 3.18);
  product.add(grille);
}

const usbPort = makeRounded(0.95, 0.22, 0.08, 0.08, materials.rubber);
usbPort.position.set(0, 0.28, -3.42);
product.add(usbPort);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(13, 96),
  new THREE.ShadowMaterial({ color: 0x19201c, opacity: 0.18 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.48;
floor.receiveShadow = true;
scene.add(floor);

scene.add(new THREE.HemisphereLight(0xffffff, 0x64756b, 2.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
keyLight.position.set(7, 12, 9);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -12;
keyLight.shadow.camera.right = 12;
keyLight.shadow.camera.top = 12;
keyLight.shadow.camera.bottom = -12;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0x7cb7ff, 1.8);
fillLight.position.set(-9, 5, -4);
scene.add(fillLight);
const warmLight = new THREE.PointLight(0xffb65d, 28, 22, 2);
warmLight.position.set(6, 2, 7);
scene.add(warmLight);

const modes = {
  ready: { color: 0x31d17c, css: "#31d17c", label: "Ready for patient" },
  listening: { color: 0x2f86ff, css: "#2f86ff", label: "CareVoice is listening" },
  medication: { color: 0xffb629, css: "#ffb629", label: "Medication reminder due" },
  help: { color: 0xff4d48, css: "#ff4d48", label: "Nurse request sent" },
  game: { color: 0x9b66ff, css: "#9b66ff", label: "Room game invitation" },
};

function setMode(modeName) {
  const mode = modes[modeName] || modes.ready;
  ledMaterial.color.setHex(mode.color);
  ledMaterial.emissive.setHex(mode.color);
  screenMaterial.emissive.setHex(mode.color);
  nfcRingMaterial.emissive.setHex(mode.color);
  modeDot.style.background = mode.css;
  modeDot.style.boxShadow = `0 0 16px ${mode.css}`;
  modeLabel.textContent = mode.label;
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === modeName);
  });
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

rotateButton.addEventListener("click", () => {
  controls.autoRotate = !controls.autoRotate;
  rotateButton.classList.toggle("is-active", controls.autoRotate);
  rotateButton.setAttribute("aria-pressed", String(controls.autoRotate));
});

let exploded = false;
explodeButton.addEventListener("click", () => {
  exploded = !exploded;
  explodeButton.classList.toggle("is-active", exploded);
  explodeButton.setAttribute("aria-pressed", String(exploded));
});

function setCameraForViewport() {
  const nextPosition = window.innerWidth < 820 ? mobileCamera : desktopCamera;
  camera.position.copy(nextPosition);
  controls.target.set(window.innerWidth < 820 ? 0 : 0.5, 0.45, 0);
  controls.update();
}

resetViewButton.addEventListener("click", setCameraForViewport);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

renderer.domElement.addEventListener("pointerup", (event) => {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(interactiveKeys, false)[0];
  if (!hit) return;
  const label = hit.object.userData.keyLabel;
  const detail = keyData[label] || [label, "Physical CareVoice controller input."];
  keyReadout.querySelector("strong").textContent = detail[0];
  keyReadout.querySelector("p").textContent = detail[1];
  hit.object.userData.pressedAt = performance.now();
  if (label === "VOICE") setMode("listening");
  if (label === "MEDS") setMode("medication");
  if (label === "NURSE") setMode("help");
  if (label === "GAMES") setMode("game");
});

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
setCameraForViewport();
resize();
setMode("ready");

const clock = new THREE.Clock();
function animate(time) {
  const delta = clock.getDelta();
  explodeParts.forEach((part) => {
    const target = part.userData.baseY + (exploded ? part.userData.explodeY : 0);
    part.position.y = THREE.MathUtils.damp(part.position.y, target, 7, delta);
    if (part.userData.pressedAt) {
      const elapsed = time - part.userData.pressedAt;
      if (elapsed < 180) part.position.y -= Math.sin((elapsed / 180) * Math.PI) * 0.16;
      else delete part.userData.pressedAt;
    }
  });
  const pulse = 1.75 + Math.sin(time * 0.004) * 0.55;
  ledMaterial.emissiveIntensity = pulse;
  screenMaterial.emissiveIntensity = 0.34 + Math.sin(time * 0.003) * 0.08;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
renderStatus.textContent = "Interactive model ready";
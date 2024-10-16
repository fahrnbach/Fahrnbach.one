import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
// import { viewport } from 'three/webgpu';

//Loader
// const loader = new GLTFLoader();

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

let clock = new THREE.Clock(); // # THREE SMOKE
let delta = 0; // # THREE SMOKE







//Scene 
const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0xc0f0ff, 0.0015)// # THREE SMOKE // Color, Near




// Load a glTF resource
// loader.load(
// 	// resource URL
// 	'models/Cat/3D_Cat_Trimmed_White.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {

// 		scene.add( gltf.scene );
//     gltf.scene.scale.set(40, 40, 40); 
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object

// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log(error);

// 	}
// );

// Create Sphere
// // !The shape
// const material = new THREE.TextureLoader().load( "textures/water.jpg" );
// material.wrapS = THREE.RepeatWrapping;
// material.wrapT = THREE.RepeatWrapping;
// material.repeat.set( 4, 4 );

const texture = new THREE.TextureLoader().load( "models/2k_earth_daymap.jpg" );
const smokeTexture = new THREE.TextureLoader().load("models/smoke/webp/White_Cloud.webp")// #Smoke Texture
smokeTexture.colorSpace = "srgb"; // #Smoke Texture
const smokeGeometry = new THREE.PlaneGeometry(300,300);  // #Smoke Texture
 // #Smoke Texture
const smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff, // vertex color = color x colormap
    map: smokeTexture,
    emissive: 0x222222, // color of emissive light
    opacity: 0.15,
    transparent: true
});

smokeMaterial.side = THREE.DoubleSide

let smokeParticles = []  // #Smoke Texture
// Iterates through smoke 'Mirrors'
for (let i = 0; i < 90; i++) { //Can Adjust Number (90)
  let smokeElement = new THREE.Mesh(smokeGeometry, smokeMaterial);
  smokeElement.scale.set(.1, .1, .1); // Set Scale to Double Scale
  // Position smoke "Mirrors" at random location
  smokeElement.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * -50 - 10)
  smokeElement.rotation.z = Math.random() * 360;
  // i % 2 === 0 ? smokeElement.rotation.y = 180 : smokeElement.rotation.y = 0

  scene.add(smokeElement)
  // smokeMaterial.color = 
  smokeParticles.push(smokeElement); //add to array of smoke textures
}

let smokeParticles2 = []  // #Smoke Texture
// Iterates through smoke 'Mirrors'
for (let i = 0; i < 90; i++) { //Can Adjust Number (90)
  let smokeElement = new THREE.Mesh(smokeGeometry, smokeMaterial);
  smokeElement.scale.set(.1, .1, .1); // Set Scale to Double Scale
  // Position smoke "Mirrors" at random location
  smokeElement.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 80)
  smokeElement.rotation.z = Math.random() * 360;
  // i % 2 === 0 ? smokeElement.rotation.y = 180 : smokeElement.rotation.y = 0

  scene.add(smokeElement)
  // smokeMaterial.color = 
  smokeParticles2.push(smokeElement); //add to array of smoke textures
}

const geometry = new THREE.SphereGeometry(3, 64, 64);
// !The Color
const material = new THREE.MeshStandardMaterial({
    color: '#00ffa3',
    roughness: 0.5,
    map: texture,
    emissive: 0x22222
})
// !The Combination of Color and Shape
const mesh = new THREE.Mesh(geometry, material);
// Add mesh to scene
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}




//Let there be Light
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(0, 10, 10)
light.intensity = 1000
scene.add(light)

// const ambientLight = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
// scene.add( ambientLight );


// Camera
// !Above 50 for FOV there may be distortion
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
// !Move Camera Back to see sphere
camera.position.z = 20
//Add camera to scene
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(window.devicePixelRatio)  // # THREE SMOKE
// renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setClearColor( 0xffffff, 0);



//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5



// Resize
window.addEventListener('resize', () => {
  //Update Sizes
  console.log(window.innerWidth)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
  // mesh.position.x = window.innerWidth / 4 - 100
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
  // #Smoke Texture
  delta = clock.getDelta(); //amount of time passed since last clock update  // #Smoke Texture
  for (let i=0; i < smokeParticles.length; i++) {
    smokeParticles[i].rotation.z +=(delta * 0.12);
  }
  delta = clock.getDelta(); //amount of time passed since last clock update  // #Smoke Texture
  for (let i=0; i < smokeParticles.length; i++) {
    smokeParticles2[i].rotation.z +=(delta * 0.12);
  }
}

loop()

// Timeline Magic
const tl = gsap.timeline({defaults: { duration: 1}})
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.duration(5)
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.duration(1)
tl.fromTo('.title', {opacity: 0}, {opacity: 1})
// Tween.to(mesh.rotation, 10, {y: Math.PI * 2, repeat: -1, ease: Linear.easeNone});

// Mouse Animation Colorrrrr
let mouseDown = false;
let rgb = []
window.addEventListener('pointerdown', () => (mouseDown = true))
window.addEventListener('pointerup', () => (mouseDown = false))

window.addEventListener('pointermove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width)  * 255),
      Math.round((e.pageY / sizes.height)  * 255),
      150,
    ]

    // mesh.rotation.x = Math.PI / (e.pageX / sizes.width + 1);

    //Let's Animate!
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})
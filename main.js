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

//Scene 
const scene = new THREE.Scene();

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

const geometry = new THREE.SphereGeometry(3, 64, 64);
// !The Color
const material = new THREE.MeshStandardMaterial({
    color: '#00ffa3',
    roughness: 0.5,
    map: texture
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
renderer.setPixelRatio(2)
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
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
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
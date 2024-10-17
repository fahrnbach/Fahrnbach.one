import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin)

console.warn("Hi, Thanks So much for Visiting!", "\n", "I am available for hire, and seeking work!")
// console.log('%c Contact Info:', 'background: #222; color: #ff0808')
// console.log('%c jacob@fahrnbach.one', 'background: #222; color: #bada55')

let welcome = () => {
  let message =
    '%c 🔥 Thanks For Visiting! Email jacob@fahrnbach.one 🔥';
  let styles = [
    'font-size: 12px',
    'color: #fffce1',
    'font-family: monospace',
    'background: #202020',
    'display: inline-block',
    'padding: 1rem 3rem',
    'border: 1px solid #fffce1',
    'border-radius: 4px;'
  ].join(';');
  console.log(message, styles);
};

welcome()

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.scrollTo(0, 0)

let shouldRender = true

let clock = new THREE.Clock(); // # THREE SMOKE
let delta = 0; // # THREE SMOKE

const scene = new THREE.Scene();

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const about = document.querySelector('.about')
const html = document.querySelector('html')

// #region Smoke Init

scene.fog = new THREE.Fog(0xc0f0ff, 0.0015)// # THREE SMOKE // Color, Near
const smokeTexture = new THREE.TextureLoader().load("models/smoke/webp/White_Cloud.webp")// #Smoke Texture
smokeTexture.colorSpace = "srgb"; // #Smoke Texture
const smokeGeometry = new THREE.PlaneGeometry(300,300);  // #Smoke Texture
 // #Smoke Texture
const smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff, // vertex color = color x colormap
    map: smokeTexture,
    emissive: 0x222222, // color of emissive light
    opacity: 0.10,
    transparent: true
});

smokeMaterial.side = THREE.DoubleSide

let smokeParticles = []  // #Smoke Texture
// Iterates through smoke 'Mirrors'
for (let i = 0; i < 90; i++) { //Can Adjust Number (90)
  let smokeElement = new THREE.Mesh(smokeGeometry, smokeMaterial);
  smokeElement.scale.set(.1, .1, .1); // Set Scale to Double Scale
  // Position smoke "Mirrors" at random location
  smokeElement.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * -80)
  smokeElement.rotation.z = Math.random() * 360;
  // i % 2 === 0 ? smokeElement.rotation.y = 180 : smokeElement.rotation.y = 0

  scene.add(smokeElement)
  // smokeMaterial.color = 
  smokeParticles.push(smokeElement); //add to array of smoke textures
}
// #Smoke 
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

// #endregion Smoke Init
// #region Earth Init
const earthTexture = new THREE.TextureLoader().load( "models/2k_earth_daymap.jpg" );
const geometry = new THREE.SphereGeometry(3, 64, 64);
// !The Color
const material = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.5,
    map: earthTexture,
    emissive: 0x22222
})
// !The Combination of Color and Shape
const earth = new THREE.Mesh(geometry, material);
// Add earth to scene
scene.add(earth);
// #endregion Earth Init
// #region Moon Init
const moonTexture = new THREE.TextureLoader().load( "models/Moon_Texture_Map_Compact.jpg" );
const moonGeometry = new THREE.SphereGeometry(.5, 64, 64);
// !The Color
const moonMaterial = new THREE.MeshStandardMaterial({
    // color: '#00ffa3',
    roughness: 0.5,
    map: moonTexture,
    emissive: 0x22222
})
// !The Combination of Color and Shape
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
// Add earth to scene
earth.add(moon);
moon.position.x = 7
moon.rotation.y = Math.PI

const moonObj = new THREE.Object3D();
moonObj.add(moon)
scene.add(moonObj)
moonObj.rotation.x = Math.PI / 7
//#endregion Moon Init
// #region Lights, Camera, Action
//Let there be Light
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(0, 10, 10)
light.intensity = 750
scene.add(light)

const ambientLight = new THREE.AmbientLight( 0x404040, 3); // soft white light
scene.add( ambientLight );


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
controls.autoRotateSpeed = 3

//#endregion Lights, Camera, Action
// #region Resize Function
// Resize
window.addEventListener('resize', () => {
  //Update Sizes
  // console.log(window.innerWidth)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
  // earth.position.x = window.innerWidth / 4 - 100
})

//  #endregion Resize Function
// #region Renderer Loop
const loop = () => {
  if (shouldRender) {
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop)
    earth.rotateY(0.002)
    moonObj.rotateY(0.005)
    // moonObj.rotateX(0.001)
    // moonObj.rotateZ(0.007)
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
}

loop()

//#endregion Renderer Loop

// #region Three Click Detection
// canvas.addEventListener('mousedown', onMouseDown, false);

// function onMouseDown(e) {
//     var vectorMouse = new THREE.Vector3( //vector from camera to mouse
//         -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
//         (window.innerHeight/2-e.clientY)*2/window.innerHeight,
//         -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
//     vectorMouse.applyQuaternion(camera.quaternion);
//     vectorMouse.normalize();        

//     var vectorObject = new THREE.Vector3(); //vector from camera to object
//     vectorObject.set(moon.x - camera.position.x,
//                      moon.y - camera.position.y,
//                      moon.z - camera.position.z);
//     vectorObject.normalize();
//     if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 1) {
//         //mouse's position is near object's position
//       console.log('moon')
//     }
// }
// #endregion Three Click Detection
// #region Animation Magic
// Timeline Magic
// &Three Stuff
const tl = gsap.timeline({defaults: { duration: 1}})
tl.duration(7)
tl.fromTo(earth.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.duration(1)

// ^Nav Stuff
tl.fromTo('.info', {opacity:'0'}, {opacity: '1'})
// !Detecting if device is desktop for nav pulldown animation
if (window.innerWidth > 650) {
  tl.fromTo('.nav', {y: '-150%'}, {y: '0%'})
}

// ^Mouse has clicked animations
let pointerDown = false;
let rgb = []
let animationTriggered = false

window.addEventListener('pointerdown', (e) => {
  pointerDown = true
  // console.log(e.target)
  if (e.target != about){
    gsap.to('.name', {opacity: 0})
    gsap.to('.info', {opacity: 0})
  }
// !Detecting if device is mobile/tablet for nav slide up animation
    if (window.innerWidth <= 650 && !animationTriggered) {
      tl.fromTo('.nav', {y: '0%'}, {y: '-225%'})
    }
    animationTriggered = true
})
window.addEventListener('pointerup', () => (pointerDown = false))
// &Three Stuff
window.addEventListener('pointermove', (e) => {
  if (pointerDown) {
    rgb = [
      Math.round((e.pageX / sizes.width)  * 255),
      Math.round((e.pageY / sizes.height)  * 255),
      150,
    ]

    // earth.rotation.x = Math.PI / (e.pageX / sizes.width + 1);

    //Let's Animate!
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(earth.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})
// ^Nav Stuff
let scrollPosition = 0
let hasScrolled = false
window.addEventListener('scroll', (e) => {
  if (e.target == about) {
    gsap.to('.name', {y: 0})
  }
  gsap.to('.name', {opacity: 1})
  if (html.scrollTop > window.innerHeight / 2 * 1.7 && scrollPosition < html.scrollTop) {
    
    // html.scroll(0, window.innerHeight * 2)
    gsap.to(window, { duration: .5, scrollTo: { y: "#about"} });
    gsap.to('.aboutMe', {y: '250vh', duration: 1.5})
    gsap.to('.up-button-container', {display: 'none'})
    gsap.to('.up-button', {display: 'none'})
    // hasScrolled = true
    scrollPosition = html.scrollTop
  }
  // if (html.scrollTop < window.innerHeight / 2 * 1.7) {
  //   gsap.to('.aboutMe', {y: '-250vh'})
  // }
})

setTimeout(() => {
  const tl2 = gsap.timeline({defaults: { duration: 1}})
  if (html.scrollTop < window.innerHeight) {
    // console.log('hii')
    tl2.fromTo('.up-button', {y: '-10%', opacity: 0}, {y: '0%', opacity: 1})
    tl2.fromTo('.up-button', {y: '0',  opacity: 1}, {y: '-10%',  opacity: .5})
    tl2.fromTo('.up-button', {y: '-10%',  opacity: .5}, {y: '0%', opacity: 1})
    tl2.fromTo('.up-button', {y: '0',  opacity: 1}, {y: '-10%',  opacity: .5})
    tl2.fromTo('.up-button', {y: '-10%',  opacity: .5}, {y: '0%', opacity: 1})  
    tl2.fromTo('.up-button', {y: '0',  opacity: 1}, {y: '-10%',  opacity: .5})
    tl2.fromTo('.up-button', {y: '-10%', opacity: 0}, {y: '0%', opacity: 1})
    tl2.fromTo('.up-button', {y: '0',  opacity: 1}, {y: '-10%',  opacity: .5})
    tl2.fromTo('.up-button', {y: '-10%',  opacity: .5}, {y: '0%', opacity: 1})
  }
}, 5000);

let mobilePressTime = null 
let mobileButton = document.querySelector('.mobile-continue-button')
mobileButton.addEventListener('pointerdown', () => {
  mobilePressTime = Date.now();
  gsap.to('.mobile-continue-button',{
    backgroundColor: '#202020bb',
    border: '2px solid orange',
    outline: '2px solid white'
  })
})


const name = document.querySelector('.name')
let bottomDistance = (window.innerHeight - name.clientHeight) - 40

mobileButton.addEventListener('pointerup', () => {
  gsap.to('.mobile-continue-button',{
    backgroundColor: '#202020bb',
    border: 'inherit',
    outline: '2px solid white'
  })
    gsap.to('.name', {y: bottomDistance - 1, backgroundColor: '#000000bb', height: '20vh', duration: 1});
    setTimeout(() => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#about"} });
    }, 10);
    // !Name-Animation on Entry
})

const upButton = document.querySelector('.up-button');
upButton.addEventListener('pointerup', () => {
  gsap.to(window, { duration: 1, scrollTo: { y: "#about"} });
})

const exitAbout = document.querySelector('.exit-about');
exitAbout.addEventListener('pointerup', () => {
  gsap.to(window, { duration: 1, scrollTo: { y: "#lander"} });
  // !Name-Animation on Exit
  gsap.to('.name', {y: 0, backgroundColor: 'transparent', duration: 1});
})

// #endregion Animation Magic

// #region Nav
let reloadButton = document.querySelector('.reload')
reloadButton.addEventListener('pointerup', () => {
  window.location.reload()
})

//#endregion Nav


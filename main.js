import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

//navigation

console.log(window.location.pathname)

//prevent default nav link navigation
let preventDefaultLinks = document.querySelectorAll('.nav-button-link')
preventDefaultLinks.forEach((link)=> {
  link.addEventListener('click', (event) => {
    event.preventDefault()
  })
})

const navPaths = {
  '/': 'home',
  '/about': 'about',
  '/explore': 'explore',
  '/contact': 'contact'
}

function navigateHome () {
  history.pushState({}, '', "/")
}

function navigate404 () {
  window.location.replace('/404')
  history.pushState({}, '', "/404")
}

function navigateToPath (path) {
  history.pushState({}, '', `${path}`)
}

if (!navPaths[window.location.pathname] == true) {
  navigate404();
}

console.log(navPaths[window.location.pathname])
console.log(navPaths[window.location.pathname])

if (navPaths[window.location.pathname]) {
  console.log('page loading...')


// registration

gsap.registerPlugin(ScrollToPlugin)

console.warn("Hi, Thanks So much for Visiting!", "\n", "I am available for hire, and seeking work!")
// console.log('%c Contact Info:', 'background: #222; color: #ff0808')
// console.log('%c jacob@fahrnbach.one', 'background: #222; color: #bada55')

let welcome = () => {
  let message =
    '%c 🔥 Thanks For Visiting! I`m Seeking work, and available for hire \n Email jacob@fahrnbach.one 🔥';
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

// init

welcome()

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.scrollTo(0, 0)

let parentClass = 'contact-star-hookin'
let starSegments = 15
let starPath = 'M259.13,443.35c-59.24-57.45-72.1-143.09-37.6-200.87,44.13-73.88,163.94-99.24,251.35-30.08-29.77-101.85-121.56-164.89-209.46-154.68-92.69,10.77-139.99,98.21-144.27,106.44,6.9,10.86,35.96,59.25,22.89,120.21-12.19,56.88-56.43,103.11-114.93,121.38'
let drawTime = 5
let starStyles = [{fill: 'none'}, {stroke: '#fff'}, {strokeMiterLimit: 10}, {strokeWidth: '10px'}, {opacity: 0.5}]


const mobileBreakpoint = 650

let pointerDown = false;
let exiting = false;


const about = document.querySelector('.about')
const aboutMe = document.querySelector('.about-me')
const html = document.querySelector('html')

let aboutMeIsVisible = false
let aboutIsVisible = false

const options = {
  threshold: .7,
};

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let elem = entry.target;
      // console.log(entry)
      
      if (entry.intersectionRatio > 1) {
        aboutMeIsVisible = true
        aboutIsVisible = true
      }
    }
    else {
      aboutMeIsVisible = false
      aboutIsVisible = false
    }
  });
};

const observer = new IntersectionObserver(intersectionCallback, options);
observer.observe(aboutMe)
observer.observe(about)

let shouldRender = true

let clock = new THREE.Clock(); // # THREE SMOKE
let delta = 0; // # THREE SMOKE

const scene = new THREE.Scene();

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

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
const earthTexture = new THREE.TextureLoader().load( "models/2k_earth_daymap.webp" );
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
// !add framerate setinterval
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
//Init
const name = document.querySelector('.name')
let exploreOpen = false
let aboutOpen = false
let contactOpen = false

let bottomDistance = (window.innerHeight - name.clientHeight) - 40

let nameLocation = null
function nameMoveToBottom() {
  nameLocation = 'bottom'
  gsap.to('.name', {y: bottomDistance - 1, backgroundColor: '#000000bb', height: '20vh', duration: 1});
  // console.log('name at bottom')
}
function nameMoveToTop() {
  nameLocation = 'top'
  gsap.to('.name', {y: 0, backgroundColor: 'transparent', duration: 1});
  // console.log('name at top')
}
function nameToTransparent() {
  gsap.to('.name', {opacity: 0})
  // console.log('nametotransparentfx')
}
function nameToOpaque() {
  gsap.to('.name', {opacity: 1})
  // console.log('nametoopaquefx')
}

function infoClickToTransparent() {
  if (pointerDown) {
    setTimeout(() => {
      tl.to('.info', {opacity: '0'})
    }, 50);
  }
}


function nameAnimation() {
  nameToOpaque()
    if (window.innerWidth <= mobileBreakpoint) {
      nameMoveToBottom();
      setTimeout(() => {
      }, 2000);
      nameToTransparent();
    }
}
// --About
function showAboutButton() {
  aboutOpen = true
  exploreOpen = false
  contactOpen = false
  gsap.to('.about', {opacity: 1, duration: 2})
  gsap.to('.about', {display: 'flex', duration: 2})
  gsap.to('.contact', {display: 'none'})
  gsap.to('.contact', {opacity: 0, duration: 1})
  gsap.to('.explore', {display: 'none'})
  gsap.to('.explore', {opacity: 0, duration: 1})
  nameAnimation();
  setTimeout(() => {
    gsap.to('.about-me', {overwrite: true, y: '250vh', duration: 1})
    gsap.to(window, { overwrite: true, duration: 1, scrollTo: { y: "#about"} });
  }, 100);
  // window.navigator
}
const navAboutButton = document.querySelector('.nav-about-button');
navAboutButton.addEventListener('pointerup', () => {
  showAboutButton()
  history.pushState({}, '', "/about")
})
// --Contact
function showContactButton() {
  contactOpen = true
  exploreOpen = false
  aboutOpen = false
  gsap.to('.contact', {opacity: 1, duration: 2})
  gsap.to('.contact', {display: 'flex', duration: 2})
  gsap.to('.explore', {opacity: 0, duration: 1})
  gsap.to('.about', {opacity: 0, duration: 1})
  nameAnimation();
  setTimeout(() => {
    gsap.to('.about-me', {overwrite: true, y: '250vh', duration: 1})
    gsap.to(window, { overwrite: true, duration: 1, scrollTo: { y: "#contact"} });
  }, 200);
// let parentClass = 'contact-star-animation-container'
// let starPath = 'M259.13,443.35c-59.24-57.45-72.1-143.09-37.6-200.87,44.13-73.88,163.94-99.24,251.35-30.08-29.77-101.85-121.56-164.89-209.46-154.68-92.69,10.77-139.99,98.21-144.27,106.44,6.9,10.86,35.96,59.25,22.89,120.21-12.19,56.88-56.43,103.11-114.93,121.38'
// let starSegments = 15
// let drawTime = 2.5
// let starStyles = [{fill: 'none'}, {stroke: '#fff'}, {strokeMiterLimit: 10}, {strokeWidth: '10px'}, {opacity: 0.5}]

// drawStarFxParent(parentClass, starSegments, starPath, drawTime, starStyles, 5, false);
starComponent.drawStar();
}

const navContactButton = document.querySelector('.nav-contact-button');
navContactButton.addEventListener('pointerup', () => {
  showContactButton()
  history.pushState({}, '', "/contact")
})
// -- Explore
function showExploreButton() {
  exploreOpen = true
  contactOpen = false
  aboutOpen = false
  gsap.to('.explore', {opacity: 1, duration: 2})
  gsap.to('.explore', {display: 'flex', duration: 2})
  gsap.to('.about', {opacity: 0, duration: 1})
  gsap.to('.contact', {opacity: 0, duration: 1})
  nameAnimation();  
  setTimeout(() => {
    gsap.to('.about-me', {overwrite: true, y: '250vh', duration: 1})
    gsap.to(window, { overwrite: true, duration: 1, scrollTo: { y: "#explore"} });
  }, 200);
}

const navExploreButton = document.querySelector('.nav-explore-button');
navExploreButton.addEventListener('pointerup', () => {
  showExploreButton()
  history.pushState({}, '', "/explore")
})
navExploreButton.addEventListener('navigate', () => {
  
})


// Timeline Magic
// &Three Stuff
const tl = gsap.timeline({defaults: { duration: 1}})
tl.duration(7)
tl.fromTo(earth.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.duration(1)

// ^Nav Stuff
// if (pointerDown) {
//   tl.fromTo('.info', {opacity:'0'}, {opacity: '1'})
// }
// !Detecting if device is desktop for nav pulldown animation
if (window.innerWidth > mobileBreakpoint) {
  tl.fromTo('.nav', {y: '-150%'}, {y: '0%'})
}

// ^Mouse has clicked animations
let rgb = []
let animationTriggered = false

window.addEventListener('pointerdown', (e) => {
  pointerDown = true
  // console.log(e.target)
  // console.log(e.target != about)
  if (e.target == canvas) {
    gsap.to('.info', {opacity: 0})
  }
  if (e.target == mobileButton || 
    e.target == navAboutButton || e.target == navContactButton || 
    e.target == navExploreButton && pointerDown){
    // nameToTransparent();
    infoClickToTransparent();
  }
// !Detecting if device is mobile/tablet for nav slide up animation
    if (window.innerWidth <= mobileBreakpoint && !animationTriggered) {
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
// #region Scroll Animation
let scrollPosition = 0
let hasScrolled = false

let scrollDirection = null
let prevScrollPoint = null

let counter = 1

function showAboutScroll() {
  aboutOpen = true
  if (exploreOpen || contactOpen) {
    gsap.to('.explore', {opacity: 0, duration: 1})
    gsap.to('.contact', {opacity: 0, duration: 1})
  }

}

window.addEventListener('scroll', (e) => {
  scrollDirection = prevScrollPoint > html.scrollTop ? 'up' : 'down'
  // console.log(scrollDirection)

  if (nameLocation === 'bottom') {
    // nameMoveToTop();
    // nameToTransparent();
  }
  if (
    html.scrollTop > window.innerHeight / 2 * 1.5 && 
    scrollPosition <= html.scrollTop && 
    !aboutMeIsVisible &&
    !aboutIsVisible &&
    !exploreOpen &&
    !contactOpen
    // &&scrollDirection === 'up'
  ) {
    gsap.to('.about', {opacity: 1, duration: 0})
    gsap.to('.info', {opacity: 0})
    showAboutScroll();
    // console.log('scrollreveal')
    // html.scroll(0, window.innerHeight * 2)
    gsap.to('.up-button-container', {display: 'none'})
    gsap.to('.up-button', {display: 'none'})
    gsap.to(window, { duration: 0, scrollTo: { y: "#about"} });
    gsap.to('.about-me', {y: '250vh', duration: 1})
    scrollPosition = html.scrollTop
  } 
  else if (exiting) {
    gsap.to(window, {overwrite: true, duration: .5, scrollTo: { y: '#lander'} });
    gsap.to('.about-me', {overwrite: true, y: '0', duration: .5})
  }
  prevScrollPoint = html.scrollTop
})

// #endregion Scroll Animation
//Scroll Up Indicator Bounce Animation
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

mobileButton.addEventListener('pointerup', () => {
  gsap.to('.mobile-continue-button',{
    backgroundColor: '#202020bb',
    border: 'inherit',
    outline: '2px solid white'
  })
  // nameToOpaque();
  showAboutButton();
    // !Name-Animation on Entry
})

const upButton = document.querySelector('.up-button');
upButton.addEventListener('pointerup', () => {
  gsap.to(window, { duration: 1, scrollTo: { y: "#about"} });
})

const exitAbout = document.querySelector('.exit-about');
exitAbout.addEventListener('pointerup', () => {
  navigateHome();
  aboutOpen = false
  gsap.to('.about', {opacity: 1})
  // !Name-Animation on Exit
  exiting = true
  setTimeout(() => {
    nameMoveToTop();
  }, 100);
  setTimeout(() => {
    nameToOpaque();
  }, 500);
  gsap.to(window, {duration: .5, scrollTo: { y: "#lander"} });
  gsap.to('.about-me', {y: '0', duration: .5})
  // nameMoveToTop();
  setTimeout(() => {
    exiting = false
  }, 1050);
})

const exitExplore = document.querySelector('.exit-explore');
exitExplore.addEventListener('pointerup', () => {
  navigateHome();
  exploreOpen = false
  gsap.to('.about', {opacity: 1})
  // console.log('exit-explore')
  gsap.to('.explore', {display: 'none', duration: 1})
  gsap.to('.explore', {opacity: 0, duration: 1})
  // !Name-Animation on Exit
  exiting = true
  setTimeout(() => {
    nameMoveToTop();
  }, 100);
  setTimeout(() => {
    nameToOpaque();
  }, 500);
  gsap.to(window, {duration: .5, scrollTo: { y: "#lander"} });
  gsap.to('.explore', {y: '0', duration: .5})
  setTimeout(() => {
    exiting = false
  }, 1050);
})

const exitContact = document.querySelector('.exit-contact');
exitContact.addEventListener('pointerup', () => {
  navigateHome();
  contactOpen = false
  gsap.to('.about', {opacity: 1})
  // console.log('exit-contact')
  gsap.to('.contact', {display: 'none', duration: 1})
  gsap.to('.contact', {opacity: 0, duration: 1})
  // !Name-Animation on Exit
  exiting = true
  setTimeout(() => {
    nameMoveToTop();
  }, 100);
  setTimeout(() => {
    nameToOpaque();
  }, 500);
  gsap.to(window, {duration: .5, scrollTo: { y: "#lander"} });
  gsap.to('.contact', {y: '0', duration: .5})
  setTimeout(() => {
    exiting = false
  }, 1050);
  // drawStarFxParent('contact-star-animation-container',0,0,0,0,0, true)
  console.log('exiting')
  starComponent.undrawStar()
})

//#region Explore Stars
// We Are Go For Launch
const exploreBG = document.querySelector('.explore-background')
for (let i=0; i < 400; i++) {
  var star = document.createElement('div')
  
  star.classList.add('star')
  
  let size = Math.random() * 2.5 + 1
  star.style.bottom = Math.random() * html.scrollHeight / 2 + 'px'
  star.style.left = Math.random() * html.scrollWidth + 'px'
  star.style.width = size + 'px'
  star.style.height = size + 'px'
  
  let delay = Math.random() * 3
  star.style.animationDelay = delay + 's'
  
  exploreBG.appendChild(star)
}

for (let i=0; i < 100; i++) {
  var star = document.createElement('div')
  
  star.classList.add('star-animated')
  
  let size = Math.random() * 2.5 + 1
  star.style.bottom = Math.random() * html.scrollHeight / 2 + 'px'
  star.style.left = Math.random() * html.scrollWidth + 'px'
  star.style.width = size + 'px'
  star.style.height = size + 'px'
  
  let delay = Math.random() * 3
  star.style.animationDelay = delay + 's'
  
  exploreBG.appendChild(star)
}
//#endregion Explore Stars



// #endregion Animation Magic

// #region Nav
// let reloadButton = document.querySelector('.reload')
// reloadButton.addEventListener('pointerup', () => {
//   window.location.reload()
// })

//#endregion Nav

// #region SVG Animation

// #region SVGDrawStarModule

class SVGStarComponent {
  constructor(parentClass, numberOfSegments, svgPath, drawTime, providedStyles, rotationSpeed = 1) {
    this.parentClass = parentClass;
    this.numberOfSegments = numberOfSegments;
    this.svgPath = svgPath;
    this.drawTime = drawTime;
    this.providedStyles = providedStyles;
    this.rotationSpeed = rotationSpeed;
    this.parentDiv = document.querySelector(`.${this.parentClass}`);
    this.defaultStyles = [{fill: 'none'}, {stroke: '#231f20'}, {strokeMiterLimit: 10}, {strokeWidth: '5px'}, {opacity: .5}];
    this.defaultHeight = 500;
    this.defaultWidth = 500;
    this.parentRotation = 0
  }
  
  drawStar() {
    // !getBoundingClientRect returns zero if the div display is set to none
    // this.parentDivBounds = this.parentDiv.getBoundingClientRect();
    // this.parentDivHeight = this.parentDivBounds.height
    // this.parentDivWidth = this.parentDivBounds.width
    // if (this.parentDivHeight == 0) {this.parentDivHeight = this.defaultHeight}
    // if (this.parentDivWidth == 0) {this.parentDivWidth = this.defaultWidth}
    if (this.providedStyles) {this.defaultStyles = this.providedStyles}
    let svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgContainer.classList.add('drawStarFXSVG') //!
    svgContainer.setAttribute('xmlns',"http://www.w3.org/2000/svg")
    svgContainer.setAttribute('version',"1.1")
    svgContainer.setAttribute('viewBox',`0 0 ${this.defaultWidth} ${this.defaultHeight}`)
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgContainer.appendChild(defs)
    let style = document.createElementNS("http://www.w3.org/2000/svg", "stye");
    defs.appendChild(style)
    let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgContainer.appendChild(g1)
    let g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.id = 'Layer_1'
    g1.appendChild(g2)
    let g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.appendChild(g3)
    this.parentDiv.appendChild(svgContainer)
    let segmentRotate = 0
  for(let i=0; i < this.numberOfSegments; i++) {
    let starSegment = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.defaultStyles.forEach((style) => {
      for (const key in style) {
        starSegment.style[key] = style[key]
      }
    })
    starSegment.style.transform = `rotate(${segmentRotate}deg)`
    segmentRotate += 360/this.numberOfSegments
    starSegment.style.transformOrigin = 'center'
    // starSegment.setAttribute('d', 'M151.1,347.32c7.21-110.1,102.13-193.36,212.23-186.15')
    // add class for future identification
    starSegment.classList.add('line1')
    starSegment.setAttribute('d', this.svgPath)
    g3.appendChild(starSegment);
    var length = starSegment.getTotalLength();
    // Clear any previous transition
    starSegment.style.transition = starSegment.style.WebkitTransition = 'none';
    // Set up the starting positions
    starSegment.style.strokeDasharray = length + ' ' + length;
    starSegment.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    starSegment.getBoundingClientRect();
    // Define our transition
    starSegment.style.transition = starSegment.style.WebkitTransition =
      `stroke-dashoffset ${this.drawTime}s ease-in-out`;
    // Go!
    
    setTimeout(() => {
      starSegment.style.strokeDashoffset = '0';
    }, this.drawTime * 1000);
  }
    this.rotating = setInterval(() => {
        if (this.parentRotation >= 360) {
          this.parentRotation = 0
        }
        this.parentDiv.style.transform = `rotate(${this.parentRotation}deg)`
        this.parentRotation+= this.rotationSpeed / 100 * Math.PI * 2
    }, 2);
}


  undrawStar() {
      
      clearInterval(this.rotating)
      const svgEl = document.querySelector('.drawStarFXSVG')
      const hookin = document.querySelector('.contact-star-hookin')
      const starSegments = document.querySelectorAll('.line1')
      const parentEl = svgEl.parentElement
      // hookin.style,backgroundColor = 'blue'
      starSegments.forEach((el) => {
        let length = el.getTotalLength();
        setTimeout(() => {
          el.style.strokeDashoffset = length;
        }, 0);
                // console.log(parentEl)
                while (svgEl.firstChild) {
                    svgEl.removeChild(svgEl.lastChild);
                  }
                  svgEl.remove();
                  parentEl.removeAttribute('style');
          })
  }
}
let starComponent = new SVGStarComponent(parentClass, starSegments, starPath, drawTime, starStyles, 1)

// #endregion SVGDrawStarModule




// #endRegion SVG Animation

// #region navigation
if (window.location.pathname == '/about') {
  setTimeout(() => {
    showAboutButton();
    console.log(window.location.pathname)
  }, 500);
}
if (window.location.pathname == '/explore') {
  setTimeout(() => {
    showExploreButton();
    console.log(window.location.pathname)
  }, 1000);
  // showExploreButton();
  // console.log('explore opened')
}
if (window.location.pathname == '/contact') {
  setTimeout(() => {
    showContactButton();
    console.log(window.location.pathname)
  }, 500);
}
window.addEventListener('popstate', function(event) {
  if (window.location.pathname == '/') {
      nameToOpaque()
      nameMoveToTop()
  }
  if (window.location.pathname == '/about') {
    setTimeout(() => {
      showAboutButton();
      console.log(window.location.pathname)
    }, 500);
  }
  if (window.location.pathname == '/explore') {
    setTimeout(() => {
      showExploreButton();
      console.log(window.location.pathname)
    }, 1000);
    // showExploreButton();
    // console.log('explore opened')
  }
  if (window.location.pathname == '/contact') {
    setTimeout(() => {
      showContactButton();
      console.log(window.location.pathname)
    }, 500);
  }
  console.log('Back button pressed');
});

console.log(navPaths[window.location.pathname]);

};

// #endregion navigation

// #region explorenav
const orbButtons = document.querySelectorAll('.orb');
const sections = document.querySelectorAll('.explore-card-inner');

const projectData = {
    art: {
      title: 'Art App',
      description: 'A visually rich app with custom Illustrator UI and AI-enhanced art.',
      image: '/screenshots/art-screenshot.png',
      link: 'https://art.fahrnbach.one',
      code: 'https://github.com/fahrnbach/art-app',
      blog: 'https://blog.fahrnbach.one/art-app'
    },
    blog: {
      title: 'Blog (Python CMS)',
      description: 'A Markdown-based blog with a custom Python CMS backend.',
      image: '/screenshots/blog-screenshot.png',
      link: 'https://blog.fahrnbach.one',
      code: 'https://github.com/fahrnbach/blog-monorepo',
      blog: 'https://blog.fahrnbach.one/blog-monorepo'
    },
    library: {
      title: 'Component Library',
      description: 'Reusable Angular components built with a custom Node.js backend.',
      image: '/screenshots/library-screenshot.png',
      link: 'https://library.fahrnbach.one', // optional custom frontend link
      code: 'https://github.com/fahrnbach/angular-library',
      blog: 'https://blog.fahrnbach.one/angular-library'
    },
    ongoing: {
      title: 'Ongoing Projects',
      description: 'A responsive site (github 🤣) showcasing my design, dev, and UI skills.',
      image: '/screenshots/ongoing-screenshot.png',
      link: 'https://github.com/fahrnbach',
      code: 'https://github.com/fahrnbach',
      blog: 'https://blog.fahrnbach.one/sign-git-commits'
    },
    portfolio: {
      title: 'My Portfolio [You are Here 📍]',
      description: 'A Single Page Application entirely made in Vanilla Javascript',
      image: '/screenshots/portfolio-screenshot.png',
      link: 'https://fahrnbach.one',
      code: 'https://github.com/portfolio-site',
      blog: 'https://blog.fahrnbach.one/portfolio-site'
    }
};

// 💪 Update Mobile UI Buttons
document.querySelectorAll('.explore-card-inner').forEach(card => {
  const key = card.dataset.section;
  const data = projectData[key];

  if (!data) return;

  const actionDiv = document.createElement('div');
  actionDiv.className = 'mobile-project-actions';

  if (data.link) {
    const viewSite = document.createElement('a');
    viewSite.className = 'mobile-button';
    viewSite.href = data.link;
    viewSite.target = '_blank';
    viewSite.textContent = '🌐 View Site';
    actionDiv.appendChild(viewSite);
  }

  if (data.code) {
    const viewCode = document.createElement('a');
    viewCode.className = 'mobile-button';
    viewCode.href = data.code;
    viewCode.target = '_blank';
    viewCode.textContent = '📁 View Code';
    actionDiv.appendChild(viewCode);
  }

  if (data.blog) {
    const viewBlog = document.createElement('a');
    viewBlog.className = 'mobile-button';
    viewBlog.href = data.blog;
    viewBlog.textContent = '🐇 Blog Post';
    actionDiv.appendChild(viewBlog);
  }

  card.appendChild(actionDiv);
});

// 🧠 Update tertiary panel display
function updateTertiaryPanel(key) {
  const data = projectData[key];
  if (!data) return;

  const panel = document.getElementById('tertiary-panel');
  document.getElementById('project-image').src = data.image;
  document.getElementById('project-image').alt = `${data.title} Screenshot`;
  document.getElementById('project-title').textContent = data.title;
  document.getElementById('project-description').textContent = data.description;
  document.getElementById('project-link').href = data.link;
  document.getElementById('project-code').href = data.code;
  document.getElementById('project-blog').href = data.blog;

  panel.classList.add('visible');
}

// ✅ Scroll to section on orb click
orbButtons.forEach(button => {
  button.addEventListener('click', () => {
    const sectionKey = button.dataset.section;
    orbButtons.forEach(o => o.classList.remove('active'));
    button.classList.add('active');

    const target = document.querySelector(`.explore-card-inner[data-section="${sectionKey}"]`);
    if (target) {
      updateTertiaryPanel(sectionKey);
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// ✅ Highlight orb + update panel on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionKey = entry.target.dataset.section;
      updateTertiaryPanel(sectionKey);
      const key = entry.target.dataset.section;
      updateFloatingPreview(key);
      
      orbButtons.forEach(o => {
        o.classList.toggle('active', o.dataset.section === sectionKey);
      });
    }
  });
}, {
  threshold: 0.6
});

sections.forEach(section => observer.observe(section));

function updateFloatingPreview(key) {
  const data = projectData[key];
  if (!data || !data.blog) return;

  const preview = document.getElementById('floating-preview');
  const thumb = preview.querySelector('.preview-thumb');
  const title = preview.querySelector('.preview-title');
  const link = preview.querySelector('.preview-blog-link');

  thumb.src = data.image;
  thumb.alt = `${data.title} preview`;
  title.textContent = data.title;
  link.href = data.blog;

  preview.classList.add('visible');
}

document.querySelectorAll('.explore-card-inner').forEach(card => {
  const projectKey = card.dataset.section;
  const data = projectData[projectKey];

  if (data && data.title) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('floating-title');
    titleDiv.textContent = data.title;

    // Only insert on mobile-sized screens
    if (window.innerWidth <= 768) {
      card.parentNode.insertBefore(titleDiv, card);
    }
  }
});

// #endregion explorenav
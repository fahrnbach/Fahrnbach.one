let initalWindow = {
  height: window.innerHeight,
  width: window.innerWidth
}

let showcaseContent = document.querySelector('.showcase-content');
let html = document.querySelector('html')

let initialRect = showcaseContent.getBoundingClientRect()
let initialSquaresToRender= (Math.round(initialRect.height / initialRect.width) * 4 * 4)

let rect = showcaseContent.getBoundingClientRect()
let numberRows = 30
let squaresToRender = (Math.round(rect.width / rect.height * 4 * numberRows))

window.addEventListener('resize', () => {
  // renderSquaresAgain()
  console.log(squaresToRender)
  rect = showcaseContent.getBoundingClientRect()
  if (initialSquaresToRender == squaresToRender){
    squaresToRender = (Math.round(rect.width / rect.height * 4 * 4))
  } else {
    squaresToRender = initialSquaresToRender - squaresToRender
  }
  renderSquares()
  addArt()
})

function renderSquares() {
  for (let i = 0; i < squaresToRender; i++) {
      let div = document.createElement('div')
      div.style.width = rect.height / 4 + 'px'
      // div.style.width = '25%'
      div.style.height = rect.height / 4 + 'px'
      // div.style.height = '25%'
      // div.style.aspectRatio = '1/1'
      div.style.border = '1px solid black'
      div.style.display = 'flex'
      div.style.alignContent = 'center'
      div.style.justifyContent = 'center'
      // div.style.position = 'absolute'
      div.style.backgroundColor = `rgb(${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}%)`
      div.classList.add(`showcase-${i}`)
      div.classList.add(`showcase-added`)
      showcaseContent.appendChild(div)
  }
}

function renderSquaresAgain() {
  let showcaseSquares = document.querySelectorAll('.showcase-added')
  showcaseSquares.forEach((el) => {
    let renderAgain = showcaseContent.getBoundingClientRect()
    el.style.height = renderAgain.height / 4 + 'px'
    el.style.width = renderAgain.height / 4 + 'px'
    // el.style.height = '0'
    // el.style.height = '25%'
    addArt();
  })
//   for (let i = 0; i < numberOfSquares; i++) {
//     let div = document.createElement('div')
//     // div.style.width = rect.height / 4 + 'px'
//     // div.style.width = '25%'
//     // div.style.height = rect.height / 4 + 'px'
//     div.style.height = '25%'
//     div.style.aspectRatio = '1/1'
//     div.style.border = '1px solid black'
//     div.style.display = 'flex'
//     div.style.alignContent = 'center'
//     div.style.justifyContent = 'center'
//     // div.style.position = 'absolute'
//     div.style.backgroundColor = `rgb(${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}%)`
//     div.classList.add(`showcase-${i}`)
//     div.classList.add(`showcase-added`)
//     showcaseContent.appendChild(div)
// }
}

renderSquares()


class SVGStarComponent {
    constructor(parentClass, numberOfSegments, svgPath, drawTime, providedStyles, rotationSpeed = 1) {
      this.parentClass = parentClass;
      this.numberOfSegments = numberOfSegments;
      this.svgPath = svgPath;
      this.drawTime = drawTime;
      this.providedStyles = providedStyles;
      this.rotationSpeed = rotationSpeed;
      this.parentDiv = document.querySelector(`.${this.parentClass}`);
      this.defaultStyles = [{fill: 'none'}, {stroke: '#231f20'}, {strokeMiterLimit: 10}, {strokeWidth: '5px'}, {opacity: 1}];
      this.defaultHeight = 500;
      this.defaultWidth = 500;
      this.parentRotation = 0
    }
    
    drawStar() {
      // !getBoundingClientRect returns zero if the div display is set to none
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
      starSegment.style.alignSelf = 'center'
      starSegment.style.display = 'flex'
      // starSegment.setAttribute('d', 'M151.1,347.32c7.21-110.1,102.13-193.36,212.23-186.15')
      // add class for future identification
      starSegment.classList.add('line1')
      starSegment.setAttribute('d', this.svgPath)
      svgContainer.appendChild(starSegment);
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
      setTimeout(() => {
        
        clearInterval(this.rotating)
        const svgEl= document.querySelector('.drawStarFXSVG')
        const starSegments = document.querySelectorAll('.line1')
        const parentEl = svgEl.parentElement
        starSegments.forEach((el) => {
          let length = el.getTotalLength();
          setTimeout(() => {
            el.style.strokeDashoffset = length;
          }, 0);
            setTimeout(() => {
                  // console.log(parentEl)
                  while (svgEl.firstChild) {
                      svgEl.removeChild(svgEl.lastChild);
                    }
                    svgEl.remove();
                    parentEl.removeAttribute('style');
                }, 10000);
            })
          }, 10000);
    }
  }
//   let parentClass = 'contact-star-animation-container'
  let starSegments = 1
//   let starPath = 'M250.81,267.18c-5.26-5.11-6.41-12.72-3.34-17.85,3.92-6.57,14.57-8.82,22.34-2.67-2.65-9.05-10.8-14.65-18.61-13.75-8.24.96-12.44,8.73-12.82,9.46.61.97,3.2,5.27,2.03,10.68-1.08,5.05-5.02,9.16-10.21,10.79'
//trinity
// let starPath = 'M199.45,294.23c-48.34-27.91-64.91-89.73-37-138.07s89.73-64.91,138.07-37c48.34,27.91,64.91,89.73,37,138.07-27.91,48.34-89.73,64.91-138.07,37ZM212.46,343.84c27.91,48.34,89.73,64.91,138.07,37,48.34-27.91,64.91-89.73,37-138.07-27.91-48.34-89.73-64.91-138.07-37-48.34,27.91-64.91,89.73-37,138.07ZM199.99,192.22c-55.82,0-101.08,45.25-101.08,101.08s45.25,101.08,101.08,101.08,101.08-45.25,101.08-101.08-45.25-101.08-101.08-101.08Z'  
// let starPath = 'M259.13,443.35c-59.24-57.45-72.1-143.09-37.6-200.87,44.13-73.88,163.94-99.24,251.35-30.08-29.77-101.85-121.56-164.89-209.46-154.68-92.69,10.77-139.99,98.21-144.27,106.44,6.9,10.86,35.96,59.25,22.89,120.21-12.19,56.88-56.43,103.11-114.93,121.38'
  // let starPath = 'M266.34,500c-90.49-74.16-97.63-197.07-44.81-257.52,57.46-65.75,196.6-69.86,278.47,30.52-25.92-140.35-137.94-227.09-236.58-215.28-86.43,10.35-136.54,93.23-144.27,106.44,39.74,36.82,44.95,91.57,22.89,120.21-26.05,33.81-96.62,39.67-142.04-10.45'
  // smile
  let starPath = 'M447.02,250c0,108.81-88.21,197.02-197.02,197.02S52.98,358.81,52.98,250,141.19,52.98,250,52.98s197.02,88.21,197.02,197.02ZM178.74,148.57c-27.83,0-50.39,22.56-50.39,50.39s22.56,50.39,50.39,50.39,50.39-22.56,50.39-50.39-22.56-50.39-50.39-50.39ZM318.21,148.57c-27.83,0-50.39,22.56-50.39,50.39s22.56,50.39,50.39,50.39,50.39-22.56,50.39-50.39-22.56-50.39-50.39-50.39ZM161.2,345.75c48.81,49.35,128.24,49.79,177.6.98'
  let drawTime = 5
  let starStyles = [{fill: 'none'}, {stroke: '#fff'}, {strokeMiterLimit: 10}, {strokeWidth: '5px'}, {opacity: 1}]

function addArt() {
  for (let i = 0; i < squaresToRender; i++) {
      let square = document.querySelector(`.showcase-${i}`)
      let parentClass = `showcase-${i}`
      let starComponent = new SVGStarComponent(parentClass, starSegments, starPath, drawTime, starStyles, 0)
      starComponent.drawStar()
  }
}

addArt();


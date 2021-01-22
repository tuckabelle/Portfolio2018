import lottie from 'lottie-web'

console.log('hey there')
/* 
lottie.loadAnimation({
  container: document.getElementById('bodymovinanim'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'assets/images/data_adam.json' // the path to the animation json
})
 */

//Play an animation back on second click

let adamDiv = document.getElementById('lottie_adam')
let workDiv = document.getElementById('lottie_work')
let aboutDiv = document.getElementById('lottie_about')
let thinkerDiv = document.getElementById('lottie_thinker')

let animationAdam = lottie.loadAnimation({
  container: adamDiv,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/images/data_adam.json'
})

animationAdam.addEventListener('DOMLoaded', e => {
  animationAdam.playSegments([0, 68], true)
  animationAdam.playSegments([0, 48], true)
})

var directionMenu = 1
adamDiv.addEventListener('mouseenter', e => {
  animationAdam.setDirection(directionMenu)
  animationAdam.playSegments([48, 57], true)
})

adamDiv.addEventListener('mouseleave', e => {
  //animationMenu.setDirection(-directionMenu)
  animationAdam.playSegments([57, 80], true)
})

//window.onresize = animationWork.resize.bind(animationAdam)

let animationWork = lottie.loadAnimation({
  container: workDiv,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/images/data_work.json'
})
let animationAbout = lottie.loadAnimation({
  container: aboutDiv,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/images/data_about.json'
})

const workObserver = new IntersectionObserver(elements => {
  if (elements[0].intersectionRatio !== 0) {
    animationWork.play()
  }
})

const workEl = document.getElementById('lottie_work')
workObserver.observe(workEl)

const aboutObserver = new IntersectionObserver(elements => {
  if (elements[0].intersectionRatio !== 0) {
    animationAbout.play()
  }
})

const aboutEl = document.getElementById('lottie_about')
aboutObserver.observe(aboutEl)

let animationThinker = lottie.loadAnimation({
  container: thinkerDiv,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/images/data_thinker.json'
})

// do not import Barba like this if you load the library through the browser
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import { TweenMax, TimelineMax } from 'gsap/all'
import anime from 'animejs/lib/anime.min.js'

barba.use(barbaPrefetch)

barba.hooks.beforeEnter(() => {})

barba.init({
  debug: true,
  transitions: [
    {
      sync: true,
      before(data) {},
      beforeEnter(data) {
        const [
          goingForward,
          currentThumb,
          nextThumb,
          currentPos,
          nextPos,
          directionCurrent,
          directionNext
        ] = getValues(
          data.current.namespace,
          data.current.url.path,
          data.next.url.path,
          data.current.container,
          data.next.container
        )

        console.log(getPosition(nextThumb))
        let tester = getPosition(data.current.container)
        data.current.container.style.position = 'fixed'
        data.current.container.style.top = tester.y + 'px'
        data.current.container.style.left = tester.x + 'px'

        anime.set(data.next.container, {
          translateX: directionNext,
          position: 'absolute',
          top: 0
        })

        anime({
          targets: data.current.container,
          translateX: directionCurrent,
          easing: 'easeOutSine',
          duration: 1400,
          delay: 100,
          complete: function(anim) {
            if (data.next.namespace == 'detail') {
              window.scrollTo(0, 0)
            } else {
              window.scrollTo(0, 1100)
            }
          }
        })
      },
      //beforeEnter(data) {},

      enter(data) {
        const [
          goingForward,
          currentThumb,
          nextThumb,
          currentPos,
          nextPos,
          directionCurrent,
          directionNext
        ] = getValues(
          data.current.namespace,
          data.current.url.path,
          data.next.url.path,
          data.current.container,
          data.next.container
        )

        let bodyRect = data.current.container.getBoundingClientRect()
        let offset = currentPos.top - bodyRect.top

        const newt = currentThumb.cloneNode(true)
        newt.style.position = 'fixed'
        newt.style.top = offset + 'px'
        newt.style.left = currentPos.left + 'px'
        //newt.style.right = oldPos.right + 'px'
        newt.height = currentPos.height
        newt.width = currentPos.width
        data.current.container.appendChild(newt)
        newt.style.zIndex = '100'

        let tester2 = getPosition(nextThumb)
        window.scrollTo(0, 1200)

        anime({
          targets: newt,
          position: 'fixed',
          visibility: 'visible',
          zindex: 100,
          translateX: 0,
          translateY: 0,
          height: nextPos.height,
          width: nextPos.width,
          delay: 300,
          easing: 'easeInOutQuad',
          duration: 2400
        })

        const done = this.async()
        anime({
          targets: data.next.container,
          translateX: 0,
          easing: 'easeOutSine',
          duration: 1600,
          delay: 1600,
          complete: function(anim) {
            console.log('done')
            done()
          }
        })
      }
    }
  ]
})

function getValues(
  currentNamespace,
  currentUrl,
  nextUrl,
  currentContainer,
  nextContainer
) {
  //going forward
  let goingForward = true
  if (currentNamespace == 'detail') {
    goingForward = false
  }
  const directionCurrent = (goingForward ? -100 : 100) + '%'
  const directionNext = (goingForward ? 100 : -100) + '%'

  //images
  const imgRef = findImgRef(currentNamespace, currentUrl, nextUrl)
  const currentThumb = currentContainer.querySelector(imgRef).parentNode
  const nextThumb = nextContainer.querySelector(imgRef).parentNode

  //image heights
  const currentPos = currentThumb.getBoundingClientRect()
  const nextPos = nextThumb.getBoundingClientRect()

  //return values
  return [
    goingForward,
    currentThumb,
    nextThumb,
    currentPos,
    nextPos,
    directionCurrent,
    directionNext
  ]
}

function findImgRef(cn, cu, nu) {
  if (cn == 'home') {
    let imgRef = 'img[data-ref="' + nu + '"]'
    return imgRef
  } else {
    let imgRef = 'img[data-ref="' + cu + '"]'
    return imgRef
  }
}

function getPosition(el) {
  let xPos = 0
  let yPos = 0

  while (el) {
    if (el.tagName == 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      const xScroll = el.scrollLeft || document.documentElement.scrollLeft
      const yScroll = el.scrollTop || document.documentElement.scrollTop

      xPos += el.offsetLeft - xScroll + el.clientLeft
      yPos += el.offsetTop - yScroll + el.clientTop
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft
      yPos += el.offsetTop - el.scrollTop + el.clientTop
    }

    el = el.offsetParent
  }
  return {
    x: xPos,
    y: yPos
  }
}

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
      before(data) {
        //localStorage.setItem('scrollYPos', window.scrollY)

        const imgRef = findImgRef(
          data.current.namespace,
          data.current.url.path,
          data.next.url.path
        )

        const oldThumb = data.current.container.querySelector(imgRef)
        const oldPos = oldThumb.getBoundingClientRect()
        const oldPosHeight = oldPos.top

        const newPost = getPosition(oldThumb)

        const lastYPos = localStorage.getItem('scrollYPos')

        const newNewPos = lastYPos - oldPosHeight

        //console.log(newNewPos)
        //console.log('Now scrolling ' + lastYPos)
        localStorage.removeItem('scrollPlace')
        localStorage.removeItem('scrollYPos')
        localStorage.setItem('scrollYPos', window.scrollY)
        localStorage.setItem('scrollPlace', newNewPos)

        let goingForward = true

        if (data.current.namespace == 'detail') {
          goingForward = false
        }

        //console.log('Next ' + newYPos)
        const directionCurrent = (goingForward ? -100 : 100) + '%'
        const directionNext = (goingForward ? 100 : -100) + '%'

        //console.log(directionNext)
        anime.set(data.next.container, {
          translateX: directionNext,
          position: 'absolute',
          top: 0,
          complete: function(anim) {
            window.scrollTo(0, newNewPos)
          }
        })
      },
      leave(data) {
        let goingForward = true

        if (data.current.namespace == 'detail') {
          goingForward = false
        }

        const done = this.async()

        const imgRef = findImgRef(
          data.current.namespace,
          data.current.url.path,
          data.next.url.path
        )

        const oldThumb = data.current.container.querySelector(imgRef)
        const newThumb = data.next.container.querySelector(imgRef)

        const oldPos = oldThumb.getBoundingClientRect()
        const newPos = newThumb.getBoundingClientRect()
        const aspectRatio = oldThumb.naturalWidth / oldThumb.naturalHeight
        const newHeight = Math.round(newPos.width / aspectRatio)

        const newid = newThumb.getAttribute('id')
        //console.log(newid)

        let bodyRect = data.current.container.getBoundingClientRect()
        let offset = oldPos.top - bodyRect.top
        //console.log(offset)

        // const newt = oldThumb.cloneNode(true)
        // newt.style.position = 'fixed'
        // newt.style.top = offset + 'px'
        // newt.style.left = oldPos.left + 'px'
        // //newt.style.right = oldPos.right + 'px'
        // newt.height = newHeight
        // newt.width = oldPos.width
        // data.current.container.appendChild(newt)
        //
        // newt.style.zIndex = '100'

        const directionCurrent = (goingForward ? -100 : 100) + '%'
        const directionNext = (goingForward ? 100 : -100) + '%'

        let leftdest = newPos.left
        let leftdest2 = newPos.left
        //console.log(newPos.top)

        const newNewPos = localStorage.getItem('scrollPlace')

        anime.set(newThumb, {
          left: directionCurrent
        })

        anime({
          targets: data.current.container,
          translateX: directionCurrent,
          easing: 'easeOutSine',
          duration: 600,
          delay: 200
        })

        anime({
          targets: newThumb,
          position: 'fixed',
          visibility: 'visible',
          zindex: 100,

          left: 0,

          easing: 'easeInOutQuad',
          duration: 200
        })

        anime({
          targets: oldThumb,
          position: 'fixed',
          visibility: 'visible',
          zindex: 100,

          left: directionNext,

          easing: 'easeInOutQuad',
          duration: 200
        })

        anime({
          targets: data.next.container,
          translateX: 0,
          easing: 'easeOutSine',
          duration: 600,
          delay: 400,
          complete: function(anim) {
            console.log('done')
            done()
          }
        })

        // TweenMax.to(data.current.container, 2, {
        //   xPercent: goingForward ? -100 : 100
        // })
        //
        // TweenMax.to(data.next.container, 2, {
        //   xPercent: goingForward ? 100 : -100,
        //   onComplete: function() {
        //     TweenMax.set(data.next.container, {
        //       clearProps: 'all',
        //       onComplete: done
        //     })
        //   }
        // })
        // TweenMax.to(newt, 2, {
        //   position: 'fixed',
        //   visibility: 'visible',
        //   top: newPos.top,
        //   left: goingForward ? leftdest2 : leftdest,
        //   height: newHeight,
        //   width: newPos.width
        // })
      },
      afterEnter(data) {
        const nextPage = data.next.container

        const imgRef = findImgRef(
          data.current.namespace,
          data.current.url.path,
          data.next.url.path
        )

        const oldThumb = data.current.container.querySelector(imgRef)
        const newThumb = data.next.container.querySelector(imgRef)

        //console.log(oldThumb.offsetParent.offsetTop)

        let bodyRect = data.next.container.getBoundingClientRect(),
          elemRect = oldThumb.getBoundingClientRect(),
          offset = elemRect.top - bodyRect.top

        // setTimeout(() => {
        //   //console.log(offset)
        //   window.scrollTo(0, offset)
        // }, 100)
      }
    }
  ]
})

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

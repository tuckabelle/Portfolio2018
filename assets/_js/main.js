// do not import Barba like this if you load the library through the browser
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import { TweenMax, TimelineMax } from 'gsap/all'
import SmoothScroll from 'smooth-scroll/src/js/smooth-scroll.js'

barba.use(barbaPrefetch)

barba.init({
  transitions: [
    {
      sync: true,
      beforeLeave(data) {},
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
        console.log(newid)

        const newt = oldThumb.cloneNode(true)
        newt.style.position = 'fixed'
        newt.style.top = oldPos.top + 'px'
        newt.style.left = oldPos.left + 'px'
        newt.style.right = oldPos.right + 'px'
        newt.height = newHeight
        newt.width = oldPos.width
        data.current.container.appendChild(newt)

        let leftdest = -window.screen.width + newPos.left
        let leftdest2 = window.screen.width - newPos.left

        newt.style.zIndex = '100'

        TweenMax.to(data.current.container, 2, {
          xPercent: goingForward ? -100 : 100
        })

        TweenMax.to(data.next.container, 2, {
          xPercent: goingForward ? 100 : -100,
          onComplete: function() {
            TweenMax.set(data.next.container, {
              clearProps: 'all',
              onComplete: done
            })
          }
        })
        TweenMax.to(newt, 2, {
          position: 'fixed',
          visibility: 'visible',
          top: newPos.top,
          left: goingForward ? leftdest2 : leftdest,
          height: newHeight,
          width: newPos.width
        })
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

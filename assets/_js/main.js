// do not import Barba like this if you load the library through the browser
import barba from '@barba/core'
import { TweenMax, TimelineMax } from 'gsap/all'

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

        TweenMax.set(data.next.container, {
          visibility: 'visible',
          xPercent: goingForward ? 100 : -100,
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0
        })

        TweenMax.to(data.current.container, 2, {
          xPercent: goingForward ? -100 : 100
        })
      },

      enter(data) {
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
        console.log(newHeight)

        oldThumb.style.zIndex = '100'
        //console.log(newPos)

        TweenMax.to(oldThumb, 2, {
          position: 'fixed',
          visibility: 'visible',
          top: newPos.top,
          left: newPos.left,
          height: newHeight,
          width: newPos.width
        })

        TweenMax.to(data.next.container, 2, {
          xPercent: 0,
          onComplete: function() {
            TweenMax.set(data.next.container, {
              clearProps: 'all',
              onComplete: done
            })
          }
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

function setTransition(name, el, oldx, newx, newContainer, newThumb) {
  const oldX = findName(oldx)
  const newX = findName(newx)

  function findName(old) {
    if (name == 'home') {
      return old * -1
    } else {
      return old
    }
  }
}

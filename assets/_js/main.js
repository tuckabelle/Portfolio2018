// Page transitions
// Call Barba.js when DOM is ready
import Barba from 'barba.js'
import { TweenMax, TimelineMax } from 'gsap/all'

document.addEventListener('DOMContentLoaded', function() {
  let lastElementClicked
  Barba.Pjax.init()
  Barba.Prefetch.init()

  Barba.Dispatcher.on('linkClicked', function(el) {
    //lastElementClicked = el
  })

  const ExpandTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.loading()]).then(
        this.movePages.bind(this)
      )
    },

    loading: function() {
      let deferred = Barba.Utils.deferred()
      deferred.resolve()
      return deferred.promise
    },

    movePages: function() {
      let _this = this

      _this.oldContainer.style.zIndex = '10'

      let href = Barba.HistoryManager.currentStatus()
        .url.split('/')
        .pop()

      let oldThumb = _this.oldContainer.querySelector(
        'a[href*="' + href + '"].post-block_img > img'
      )

      let oldPos = oldThumb.getBoundingClientRect()

      let destThumb = _this.newContainer.querySelector(
        '.post-thumb_container > img'
      )

      let destPos = destThumb.getBoundingClientRect()

      console.log(destPos)

      _this.cloneThumb = oldThumb.cloneNode(true)
      _this.cloneThumb.style.position = 'fixed'
      _this.cloneThumb.style.top = oldPos.top + 'px'
      _this.cloneThumb.style.left = oldPos.left + 'px'
      _this.cloneThumb.style.right = oldPos.right + 'px'
      _this.cloneThumb.height = oldPos.height
      _this.cloneThumb.width = oldPos.width
      _this.oldContainer.appendChild(_this.cloneThumb)

      destThumb.style.visibility = 'hidden'
      _this.newContainer.style.visibility = 'visible'
      oldThumb.style.visibility = 'hidden'

      setTransition(_this, -100, 100, destThumb)

      TweenMax.to(_this.cloneThumb, 0.3, {
        top: destPos.top,
        left: window.screen.width - destPos.left,
        right: destPos.right,
        height: destThumb.clientHeight,
        width: destThumb.clientWidth,
        onComplete: function() {}
      })
    }
  })

  const ShrinkTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.loading()]).then(
        this.movePages.bind(this)
      )
    },

    loading: function() {
      let deferred = Barba.Utils.deferred()
      deferred.resolve()
      return deferred.promise
    },

    movePages: function() {
      let _this = this

      _this.oldContainer.style.zIndex = '10'
      //this.newContainer.style.visibility = 'visible'

      let href = Barba.HistoryManager.prevStatus()
        .url.split('/')
        .pop()

      let destThumb = _this.newContainer.querySelector(
        'a[href*="' + href + '"].post-block_img > img'
      )

      let destPos = destThumb.getBoundingClientRect()

      let oldThumb = _this.oldContainer.querySelector(
        '.post-thumb_container > img'
      )

      _this.cloneThumb = oldThumb.cloneNode(true)
      _this.cloneThumb.style.position = 'fixed'
      _this.cloneThumb.style.top = oldPos.top + 'px'
      _this.cloneThumb.height = oldPos.height
      _this.cloneThumb.width = oldPos.width
      _this.cloneThumb.style.zIndex = '30'
      _this.oldContainer.appendChild(_this.cloneThumb)

      destThumb.style.visibility = 'hidden'
      _this.newContainer.style.visibility = 'visible'
      oldThumb.style.visibility = 'hidden'

      setTransition(_this, 100, -100, destThumb)

      TweenMax.to(_this.cloneThumb, 0.3, {
        position: 'fixed',
        visibility: 'visible',
        top: destPos.top,
        left: -window.screen.width + destPos.left,
        height: destThumb.clientHeight,
        width: destThumb.clientWidth,
        onComplete: function() {}
      })
    }
  })

  function setTransition(el, oldX, newX, destThumb) {
    TweenMax.to(el.oldContainer, 0.5, {
      xPercent: oldX
    })

    TweenMax.from(el.newContainer, 0.5, {
      xPercent: newX,
      onComplete: function() {
        destThumb.style.visibility = 'visible'
        TweenMax.set(el.newContainer, { clearProps: 'all' })
        el.done()
      }
    })
  }

  Barba.Pjax.getTransition = function() {
    let transitionObj
    if (Barba.HistoryManager.prevStatus().namespace === 'detail') {
      transitionObj = ShrinkTransition
      console.log('shrink')
    } else {
      transitionObj = ExpandTransition
      console.log('expand')
    }

    return transitionObj
  }
})

// do not import Barba like this if you load the library through the browser
import barba from '@barba/core'

// basic default transition (with no rules and minimal hooks)
barba.init({
  transitions: [
    {
      leave({ current, next, trigger }) {
        // do something with `current.container` for your leave transition
        // then return a promise or use `this.async()`
      },
      enter({ current, next, trigger }) {
        // do something with `next.container` for your enter transition
        // then return a promise or use `this.async()`
      }
    }
  ]
})

// dummy example to illustrate rules and hooks
barba.init({
  transitions: [
    {
      name: 'dummy-transition',

      // apply only when leaving `[data-barba-namespace="home"]`
      from: 'home',

      // apply only when transitioning to `[data-barba-namespace="products | contact"]`
      to: {
        namespace: ['detail']
      },

      // do leave and enter concurrently
      sync: false,

      // available hooks…
      beforeAppear() {},
      appear() {},
      afterAppear() {},
      beforeLeave() {},
      leave() {},
      afterLeave() {},
      beforeEnter() {},
      enter() {},
      afterEnter() {}
    }
  ]
})

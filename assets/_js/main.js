// do not import Barba like this if you load the library through the browser
import barba from '@barba/core'

barba.init({
  transitions: [
    {
      sync: true,
      leave(data) {
        console.log('leaving' + data.current.namespace)
      },
      enter(data) {
        // transition that will play concurrently to `leave`
        console.log('entering' + data.next.namespace)
      }
    }
  ]
})

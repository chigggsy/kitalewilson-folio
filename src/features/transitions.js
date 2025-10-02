import barba from '@barba/core'
import gsap from 'gsap'

function transition() {
  barba.init({
    transitions: [
      {
        name: 'opacity-transition',
        leave(data) {
          // console.log('Leaving')
          return gsap.to(data.current.container, {
            opacity: 0,
          })
        },
        enter(data) {
          // console.log('Entering')
          data.current.container.remove()
          return gsap.from(data.next.container, {
            opacity: 0,
          })
        },
      },
    ],
  })
}

export default transition

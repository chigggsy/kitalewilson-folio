import barba from '@barba/core'
import gsap from 'gsap'

function transition() {
  console.log(barba)
  console.log(gsap)

  gsap.to('.loader-bar', {
    yPercent: 100,
    stagger: 0.05,
    duration: 1,
  })

  barba.init({
    transitions: [
      {
        name: 'opacity-transition',
        leave(data) {
          console.log('leaving', data)
          return gsap.to('.loader-bar', {
            yPercent: 0,
            stagger: 0.05,
            duration: 1,
          })
        },
        enter(data) {
          console.log('entering')
          data.current.container.remove()
          return gsap.to('.loader-bar', {
            yPercent: 100,
            stagger: 0.05,
            duration: 1,
          })
        },
      },
    ],
  })
}

export default transition

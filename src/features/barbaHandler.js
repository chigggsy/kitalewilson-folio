import barba from '@barba/core'
import gsap from 'gsap'

import pageAbout from '../pages/pageAbout'
import pageContact from '../pages/pageContact'
import pageHome from '../pages/pageHome'
import pageProjectTemplate from '../pages/pageProjectTemplate'
import pageStills from '../pages/pageStills'
import navbar from './navbar'

navbar()

function barbaHandler() {
  barba.init({
    transitions: [
      {
        name: 'fade-transition',
        leave(data) {
          const tl = gsap.timeline()

          tl.to(data.current.container, {
            duration: 0.5,
            opacity: 0,
          })

          return tl
        },
        enter(data) {
          data.current.container.remove()
          const tl = gsap.timeline()

          tl.from(data.next.container, {
            duration: 0,
            opacity: 0,
          })

          return tl
        },
      },
    ],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          pageHome()
          navbar()
        },
      },
      {
        namespace: 'about',
        beforeEnter() {
          pageAbout()
          navbar()
        },
      },
      {
        namespace: 'stills',
        beforeEnter() {
          pageStills()
          navbar()
        },
      },
      {
        namespace: 'contact',
        beforeEnter() {
          pageContact()
          navbar()
        },
      },
      {
        namespace: 'project',
        beforeEnter() {
          pageProjectTemplate()
          navbar()
        },
      },
    ],
  })
}

export default barbaHandler

import barba from '@barba/core'
// import gsap from 'gsap'

import pageAbout from '../pages/pageAbout'
import pageContact from '../pages/pageContact'
import pageHome from '../pages/pageHome'
import pageProjectTemplate from '../pages/pageProjectTemplate'
import pageStills from '../pages/pageStills'

function barbaHandler() {
  barba.init({
    transitions: [
      // {
      //   name: 'opacity-transition',
      //   leave(data) {
      //     return gsap.to(data.current.container, {
      //       opacity: 0,
      //     })
      //   },
      //   enter(data) {
      //     data.current.container.remove()
      //     return gsap.from(data.next.container, {
      //       opacity: 0,
      //     })
      //   },
      // },
    ],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          pageHome()
        },
      },
      {
        namespace: 'about',
        beforeEnter() {
          pageAbout()
          document.querySelector('.page-wrapper').style.height = '100vh'
        },
      },
      {
        namespace: 'stills',
        beforeEnter() {
          pageStills()
        },
      },
      {
        namespace: 'contact',
        beforeEnter() {
          pageContact()
        },
      },
      {
        namespace: 'project',
        beforeEnter() {
          pageProjectTemplate()
        },
      },
    ],
  })
}

export default barbaHandler

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)

const footer = () => {
  if (!document.querySelector('.footer')) return

  const st_footerBio = new SplitText('.footer-bio', {
    type: 'lines',
    mask: 'lines',
  })

  const st_footerLinkItems = new SplitText(
    '.footer-contact .u-text-italic, .text-link-text',
    {
      type: 'words',
      mask: 'words',
    }
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      toggleActions: 'play none none reset',
    },
    defaults: {
      duration: 1.5,
      y: '120%',
      opacity: 0,
      stagger: { each: 0.08 },
      ease: 'circ.inOut',
    },
    onComplete: () => {
      st_footerBio.revert()
      st_footerLinkItems.revert()
    },
  })
  tl.from(st_footerBio.lines, {}, 0).from(st_footerLinkItems.words, {}, 0)
}

export default footer

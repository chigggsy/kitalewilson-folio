import gsap from 'gsap'
import { GSDevTools } from 'gsap/GSDevTools'
import { SplitText } from 'gsap/SplitText'

import projectNav from '../features/projectNav'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

const pageHome = () => {
  const animation = () => {
    document.fonts.ready.then(() => {
      // Splitting Text
      const st_header = SplitText.create('.preloader-text-wrapper p', {
        type: 'words',
      })
      const st_bio = SplitText.create('.bio', { type: 'words', mask: 'words' })

      // Preloader Timeline
      const tl_preloader = gsap.timeline({ id: 'Preloader' })
      tl_preloader
        .to(
          // Initial text reveal
          st_header.words,
          {
            duration: 2,
            y: '-100%',
            stagger: { each: 0.17 },
            ease: 'circ.inOut',
          },
          0
        )
        .to(
          // Moving italic to line up with the rest of the text
          '.preloader-text-wrapper .is-italic',
          { duration: 1, y: '-2rem', ease: 'circ.inOut' },
          2.5
        )
        .to(
          '.preloader-text-wrapper',
          {
            duration: 3,
            y: '-4rem',
            ease: 'circ.inOut',
          },
          1.5
        )

      // Home Page Timeline
      const tl_home = gsap.timeline({ id: 'Home' })
      tl_home
        .set(
          '.preview-border.is-left',
          {
            transformOrigin: 'center 100%',
          },
          0
        )
        .from(
          '.preview-border.is-left, .preview-border.is-right',
          {
            duration: 2,
            height: 0,
            y: '50vh',
            stagger: { each: 0.2 },
            ease: 'circ.inOut',
          },
          3
        )
        .from(
          '.preview-border.is-bottom, .preview-border.is-top',
          {
            duration: 2,
            width: 0,
            x: '-50vw',
            stagger: { each: 0.2 },
            ease: 'circ.inOut',
          },
          3.3
        )
        .from(
          st_bio.words,
          {
            duration: 1,
            y: '130%',
            stagger: { each: 0.01 },
            ease: 'power3.out',
          },
          3.5
        )

      // GS Dev Tools
      GSDevTools.create({ css: 'z-index: 9999' })
    })
  }

  projectNav()
  animation()
}

export default pageHome

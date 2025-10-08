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
        .to(
          st_header.words,
          {
            duration: 0.4,
            opacity: 0,
            stagger: { each: 0.15 },
            ease: 'circ.inOut',
          },
          2.7
        )

      // Home Page Timeline
      const tl_home = gsap.timeline({
        id: 'Home',
        onComplete: () => {
          gsap.set('.preloader', { display: 'none' })
          st_bio.revert()
          projectNav()
        },
      })
      tl_home
        .set(
          '.preview-border.is-left',
          {
            transformOrigin: 'center 100%',
          },
          0
        )
        .set('.preloader-fill', { display: 'none' }, 1)
        .from(
          // Preview Border
          '.preview-border.is-left, .preview-border.is-right',
          {
            duration: 2,
            height: 0,
            y: '50vh',
            stagger: { each: 0.3 },
            ease: 'circ.inOut',
          },
          1.5
        )
        .from(
          // Preview Border
          '.preview-border.is-bottom, .preview-border.is-top',
          {
            duration: 2,
            width: 0,
            x: '-50vw',
            stagger: { each: 0.3 },
            ease: 'circ.inOut',
          },
          2
        )
        .from(
          st_bio.words,
          {
            duration: 1,
            y: '130%',
            stagger: { each: 0.01 },
            ease: 'power3.out',
          },
          3
        )
        .from(
          '.project-name-wrapper h2',
          {
            duration: 1.5,
            y: '120%',
            stagger: { each: 0.04, from: 'start' },
            ease: 'power4.inOut',
          },
          2.6
        )
        .from(
          '.logo div img',
          {
            duration: 2,
            y: '130%',
            stagger: { each: 0.05, from: 'end' },
            ease: 'power4.inOut',
          },
          2.5
        )
        .from(
          '.nav-item-list a',
          { duration: 0.3, opacity: 0, stagger: { each: 0.01 } },
          3.5
        )
        .from(
          '.project-preview',
          { duration: 1, opacity: 0, ease: 'power4.inOut' },
          2.75
        )

      // GS Dev Tools
      // GSDevTools.create({ css: 'z-index: 9999' })
    })
  }

  animation()
}

export default pageHome

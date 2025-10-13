import gsap from 'gsap'
import { GSDevTools } from 'gsap/GSDevTools'
import { SplitText } from 'gsap/SplitText'

import projectNav from '../features/projectNav'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

const pageHome = () => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isTablet } = context.conditions

      let cleanupProjectNav = null

      // Splitting Text
      const st_loaderText = SplitText.create('.preloader-text-wrapper p', {
        type: 'words',
      })
      const st_bio = SplitText.create('.bio', { type: 'words', mask: 'words' })

      // Timeline
      const tl = gsap.timeline({
        id: 'Preloader',
        onComplete: () => {
          gsap.set('.preloader', { display: 'none' })
          st_bio.revert()

          if (isDesktop) {
            cleanupProjectNav = projectNav(context)
          }
        },
      })
      tl.set(
        '.preview-border.is-left',
        {
          transformOrigin: 'center 100%',
        },
        0
      )
        .to(
          // Initial text reveal
          st_loaderText.words,
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
          st_loaderText.words,
          {
            duration: 0.4,
            opacity: 0,
            stagger: { each: 0.15 },
            ease: 'circ.inOut',
          },
          2.7
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
          isDesktop ? 3 : 3
        )
      if (isDesktop) {
        tl.from(
          '.project-name-wrapper h2',
          {
            duration: 1.5,
            y: '120%',
            stagger: { each: 0.04, from: 'start' },
            ease: 'power4.inOut',
          },
          2.6
        )
      }
      if (isTablet) {
        tl.from(
          '.project',
          {
            duration: 1,
            opacity: 0,
            y: 20,
            stagger: { each: 0.04, from: 'end' },
            ease: 'power3.inOut',
          },
          2.6
        )
      }

      tl.from(
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
          '.preview-video',
          {
            duration: 1.2,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            ease: 'circ.inOut',
          },
          3.5
        )

      return () => {
        if (cleanupProjectNav) {
          cleanupProjectNav()
        }
      }
    }
  )

  // GSDevTools.create({ css: 'z-index: 9999' })
}

export default pageHome

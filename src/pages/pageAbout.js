import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const pageAbout = () => {
  const mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isTablet } = context.conditions
      if (isDesktop) {
        gsap.set('.page-wrapper', { height: '100vh' })
      } else if (isTablet) {
        gsap.set('.page-wrapper', { clearProps: 'height' })
      }
      const st_headings = SplitText.create('.about-block h2', {
        type: 'words',
        mask: 'words',
      })
      const st_bio = SplitText.create('.is-biography p', {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line',
      })
      const st_awards = SplitText.create('.is-awards p', {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line',
      })
      const st_festivals = SplitText.create('.is-festivals p', {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line',
      })
      const st_learnings = SplitText.create('.is-learnings p', {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line',
      })
      const st_clients = SplitText.create('.is-clients p', {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line',
      })

      const tl = gsap.timeline({
        defaults: {
          duration: 1.5,
          y: '120%',
          opacity: 0,
          stagger: { each: 0.02 },
          ease: 'circ.inOut',
        },
      })
      tl.from(
        '.about-image img',
        {
          duration: 1.8,
          y: 0,
          opacity: 0,
          ease: 'power3.inOut',
        },
        0.1
      )
        .from(
          st_headings.words,
          { duration: 1, y: 0, stagger: 0.05, ease: 'power3.inOut' },
          0.7
        )
        .from(st_bio.lines, {}, 0)
        .from(st_awards.lines, {}, 0.1)
        .from(st_festivals.lines, {}, 0.1)
        .from(st_learnings.lines, {}, 0.2)
        .from(
          st_clients.lines,
          {
            onComplete: () => {
              st_headings.revert()
              st_bio.revert()
              st_awards.revert()
              st_festivals.revert()
              st_learnings.revert()
              st_clients.revert()
            },
          },
          0.2
        )
    }
  )
}

export default pageAbout

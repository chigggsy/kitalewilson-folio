import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import textLink from '../features/textLink'
import updateBristolDateTime from '../features/updateBristolDateTime'

const pageContact = () => {
  const mm = gsap.matchMedia()
  let dateTimeInterval = null
  updateBristolDateTime()
  dateTimeInterval = setInterval(updateBristolDateTime, 60000)

  mm.add(
    {
      isDesktop: `(min-width: 992px)`,
      isTablet: `(max-width: 991px)`,
    },
    (/* context*/) => {
      /* let { isDesktop } = context.conditions
      console.log(isDesktop) */
      gsap.set('.page-wrapper', { clearProps: 'all' })

      const st_paragraphs = SplitText.create('.contact-info p', {
        type: 'lines',
        mask: 'lines',
      })

      const st_labels = SplitText.create('label', {
        type: 'lines',
        mask: 'lines',
      })

      const tl = gsap.timeline({
        defaults: {
          duration: 1.5,
          y: '120%',
          opacity: 0,
          stagger: { each: 0.05 },
          ease: 'circ.inOut',
        },
      })
      tl.from(st_paragraphs.lines, {}, 0)
        .from(
          st_labels.lines,
          {
            onComplete: () => {
              st_paragraphs.revert()
              st_labels.revert()
            },
          },
          0.2
        )
        .from(
          '.input',
          {
            y: 0,
            width: '85%',
            stagger: { each: 0.1 },
          },
          0.2
        )
        .from(
          '.submit-btn',
          {
            y: 6,
            ease: 'power3.inOut',
          },
          0.7
        )

      return () => {
        if (dateTimeInterval) {
          clearInterval(dateTimeInterval)
        }
      }
    }
  )

  textLink()
}

export default pageContact

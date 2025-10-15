import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const pageStills = () => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop } = context.conditions

      const tl = gsap.timeline()
      const imageWrapperList = document.querySelectorAll(
        '.stills-image-wrapper'
      )
      const imageList = document.querySelectorAll('.stills-image-wrapper img')
      const imageCropAmount = isDesktop ? 16 : 4
      const imageListCropped = Array.from(imageList).slice(0, imageCropAmount)

      const st_annotations = new SplitText('.stills-annotation', {
        type: 'words',
        wordsClass: 'word',
      })

      gsap.set(st_annotations.words, { opacity: 0 })

      // Intro timeline
      tl.from(
        imageListCropped,
        {
          duration: 1.8,
          // clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          opacity: 0,
          stagger: { each: 0.06, from: 'end' },
          ease: 'power3.inOut',
        },
        0
      )

      // Hover Interaction Handlers
      const handleMouseEnter = (e) => {
        const words = e.currentTarget.querySelectorAll(
          '.stills-annotation .word'
        )

        gsap.to(words, {
          duration: 0.6,
          opacity: 1,
          stagger: 0.08,
          ease: 'power3.inOut',
        })
      }

      const handleMouseLeave = (e) => {
        const words = e.currentTarget.querySelectorAll(
          '.stills-annotation .word'
        )

        gsap.to(words, {
          duration: 0.6,
          opacity: 0,
          stagger: 0.08,
          ease: 'power3.inOut',
        })
      }

      if (isDesktop) {
        imageWrapperList.forEach((imageWrapper) => {
          imageWrapper.addEventListener('mouseenter', handleMouseEnter)
          imageWrapper.addEventListener('mouseleave', handleMouseLeave)
        })
      }

      return () => {
        imageWrapperList.forEach((imageWrapper) => {
          imageWrapper.removeEventListener('mouseenter', handleMouseEnter)
          imageWrapper.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }
  )
}

export default pageStills

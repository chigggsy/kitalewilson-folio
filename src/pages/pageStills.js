import gsap from 'gsap'
// import { SplitText } from 'gsap/SplitText'

const pageStills = () => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isTablet } = context.conditions
      console.log(isTablet) // Remove this log

      const tl = gsap.timeline()
      const imageList = document.querySelectorAll('.stills-image-wrapper img')
      let imageCropAmount = 0

      isDesktop ? (imageCropAmount = 16) : (imageCropAmount = 4)

      const imageListCropped = Array.from(imageList).slice(0, imageCropAmount)
      tl.from(
        imageListCropped,
        {
          duration: 1.5,
          y: isDesktop ? -16 : 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          stagger: { each: 0.08, from: 'start' },
          ease: 'power3.inOut',
        },
        0
      )
    }
  )
}

export default pageStills

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Hls from 'hls.js'

const pageProjectTemplate = () => {
  const mm = gsap.matchMedia()
  const nextProject = document.querySelector('.project-navigation.is-next')
  const prevProject = document.querySelector('.project-navigation.is-previous')

  function handleMouseEnter(e) {
    const project = e.currentTarget
    const projectNavImage = project.querySelector('.project-navigation-image')
    const projectName = project.querySelector('h2')
    const projectNameItalic = project.querySelector('.project-name-italic')
    const st_projectName = new SplitText(projectName, {
      type: 'words',
    })
    const st_projectNameItalic = new SplitText(projectNameItalic, {
      type: 'words',
    })

    const tl_projectNav = gsap.timeline()
    tl_projectNav
      .to(st_projectName.words, { y: -22 }, 0)
      .to(
        st_projectNameItalic.words,
        {
          duration: 0.6,
          y: -22,
          stagger: 0.02,
          ease: 'power3.out',
        },
        0
      )
      .to(
        projectNavImage,
        {
          duration: 0.3,
          opacity: 0,
          ease: 'power3.inOut',
        },
        0
      )
  }

  function handleMouseLeave(e) {
    const project = e.currentTarget
    const projectNavImage = project.querySelector('.project-navigation-image')
    const projectName = project.querySelector('h2')
    const projectNameItalic = project.querySelector('.project-name-italic')
    const st_projectName = new SplitText(projectName, {
      type: 'words',
    })
    const st_projectNameItalic = new SplitText(projectNameItalic, {
      type: 'words',
    })

    const tl = gsap.timeline()
    tl.to(st_projectName.words, { y: 22 }, 0)
      .to(
        st_projectNameItalic.words,
        {
          duration: 0.6,
          y: 22,
          stagger: 0.02,
          ease: 'power3.out',
        },
        0
      )
      .to(projectNavImage, { duration: 0.3, opacity: 1, ease: 'power3.out' }, 0)
  }

  function hlsPlayerInit() {
    const video = document.querySelector('.project-video')

    if (!video) return

    const videoSrc = video.getAttribute('data-hls-src')

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoSrc)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Video is ready to play')
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
    }
  }

  nextProject.addEventListener('mouseenter', handleMouseEnter)
  nextProject.addEventListener('mouseleave', handleMouseLeave)
  prevProject.addEventListener('mouseenter', handleMouseEnter)
  prevProject.addEventListener('mouseleave', handleMouseLeave)

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isTablet } = context.conditions
      console.log(isDesktop, isTablet) // REMOVE THIS

      const st_projectDetailHeadingList = new SplitText(
        '.project-details-list .project-detail .u-text-italic',
        {
          type: 'words',
          mask: 'words',
        }
      )

      const st_projectDetailValues = new SplitText(
        '.project-details-list .project-detail .u-text-italic + *',
        {
          type: 'words',
          mask: 'words',
        }
      )

      gsap.set('.page-wrapper', { clearProps: 'all' })

      const tl_intro = gsap.timeline()

      tl_intro
        .from(
          '.project-video',
          {
            duration: 1.2,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            ease: 'circ.inOut',
          },
          0.4
        )
        .from(
          st_projectDetailHeadingList.words,
          {
            duration: 1.5,
            y: '120%',
            opacity: 0,
            stagger: { each: 0.04 },
            ease: 'circ.inOut',
          },
          0.4
        )
        .from(
          st_projectDetailValues.words,
          {
            duration: 1.5,
            y: '120%',
            opacity: 0,
            stagger: { each: 0.04 },
            ease: 'circ.inOut',
          },
          0.5
        )
        .from(
          '.project-gallery-image',
          {
            duration: 1,
            opacity: 0,
            stagger: { each: 0.06 },
            ease: 'power3.inOut',
            onComplete: () => {
              st_projectDetailHeadingList.revert()
              st_projectDetailValues.revert()
            },
          },
          0.8
        )
    }
  )

  hlsPlayerInit()
}

export default pageProjectTemplate

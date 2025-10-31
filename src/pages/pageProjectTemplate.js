import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Hls from 'hls.js'

console.log(Hls)

const pageProjectTemplate = () => {
  const mm = gsap.matchMedia()
  const nextProject = document.querySelector('.project-navigation.is-next')
  const prevProject = document.querySelector('.project-navigation.is-previous')

  function handleMouseLeave(e) {
    const project = e.currentTarget
    const projectName = project.querySelector('h2')
    const projectNameItalic = project.querySelector('.project-name-italic')
    const st_projectName = new SplitText(projectName, {
      type: 'words',
    })
    const st_projectNameItalic = new SplitText(projectNameItalic, {
      type: 'words',
    })

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: 'power3.out', stagger: 0.02 },
    })
    tl.to(st_projectName.words, { y: 22 }, 0).to(
      st_projectNameItalic.words,
      {
        y: 22,
      },
      0
    )
  }

  nextProject.addEventListener('mouseenter', handleMouseEnter)
  nextProject.addEventListener('mouseleave', handleMouseLeave)
  prevProject.addEventListener('mouseenter', handleMouseEnter)
  prevProject.addEventListener('mouseleave', handleMouseLeave)

  function handleMouseEnter(e) {
    const project = e.currentTarget
    const projectName = project.querySelector('h2')
    const projectNameItalic = project.querySelector('.project-name-italic')
    const st_projectName = new SplitText(projectName, {
      type: 'words',
    })
    const st_projectNameItalic = new SplitText(projectNameItalic, {
      type: 'words',
    })

    const tl_projectNav = gsap.timeline({
      defaults: { duration: 0.6, ease: 'power3.out', stagger: 0.02 },
    })
    tl_projectNav.to(st_projectName.words, { y: -22 }, 0).to(
      st_projectNameItalic.words,
      {
        y: -22,
      },
      0
    )
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

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isTablet } = context.conditions
      console.log(isDesktop, isTablet) // REMOVE THIS
      gsap.set('.page-wrapper', { clearProps: 'all' })

      // Split text ----- continue here....

      const tl_intro = gsap.timeline()

      tl_intro.from(
        '.project-video',
        {
          duration: 1.2,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          ease: 'circ.inOut',
        },
        0.4
      )
    }
  )

  hlsPlayerInit()
}

export default pageProjectTemplate

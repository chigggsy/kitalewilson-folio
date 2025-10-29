import gsap from 'gsap'

const projectNav = (context) => {
  // Map project URLs to video IDs
  const projectVideoMap = {
    '/work/project-zero': 'preview-pz',
    '/work/even-in-darkness': 'preview-eid',
    '/work/a-silent-rebellion': 'preview-asr',
    '/work/the-well-within': 'preview-tww',
    '/work/min-min': 'preview-minmin',
    '/work/bukola': 'preview-bukola',
    '/work/doom': 'preview-doom',
    '/work/present-tense': 'preview-presenttense',
    '/work/exposed': 'preview-exposed',
    '/work/signia': 'preview-signia',
  }

  const navHover = () => {
    const projectList = document.querySelectorAll('.project')
    const allVideos = document.querySelectorAll('.preview-video')
    const cleanups = []
    let currentVideoId = null

    context.add('handleMouseEnter', (e) => {
      const project = e.currentTarget
      const projectName = project.querySelector('h2')
      const projectNameItalic = project.querySelector('.project-name-italic')
      const projectPropertyList = project.querySelectorAll('.project-property')

      // Get the project URL and corresponding video
      const projectUrl = project.getAttribute('href')
      const videoId = projectVideoMap[projectUrl]

      // Check if this is a different video than the current one
      const isDifferentVideo = videoId !== currentVideoId

      // Hide all videos first
      allVideos.forEach((video) => {
        video.classList.add('is-hidden')
      })

      // Show the corresponding video
      if (videoId) {
        const targetVideo = document.getElementById(videoId)
        if (targetVideo) {
          targetVideo.classList.remove('is-hidden')

          // Restart video only if it's a different video
          if (isDifferentVideo) {
            targetVideo.currentTime = 0
            targetVideo.play()
          }

          // Update current video tracking
          currentVideoId = videoId
        }
      }

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power3.out' },
      })
      tl.to(projectName, { y: -22 }, 0)
        .to(projectNameItalic, { y: -22 }, 0)
        .to(projectPropertyList, { top: 0, stagger: { amount: 0.15 } }, 0)
    })

    context.add('handleMouseLeave', (e) => {
      const project = e.currentTarget
      const projectName = project.querySelector('h2')
      const projectNameItalic = project.querySelector('.project-name-italic')
      const projectPropertyList = project.querySelectorAll('.project-property')

      // Don't hide videos on mouse leave - keep the last hovered video visible

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power3.inOut' },
      })
      tl.to(projectName, { y: 0 }, 0.52)
        .to(projectNameItalic, { y: 0 }, 0.52)
        .to(
          projectPropertyList,
          { top: -18, stagger: { amount: 0.15, from: 'end' } },
          0.35
        )
    })

    projectList.forEach((project) => {
      project.addEventListener('mouseenter', context.handleMouseEnter)
      project.addEventListener('mouseleave', context.handleMouseLeave)

      cleanups.push(() => {
        project.removeEventListener('mouseenter', context.handleMouseEnter)
        project.removeEventListener('mouseleave', context.handleMouseLeave)
      })
    })
    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }

  const translateProjectPreview = () => {
    const mapperMovement = gsap.utils.mapRange(0, window.innerWidth, -10, 10)

    context.add('handleMouseMove', (e) => {
      const mouseX = e.clientX
      const translateionAmount = mapperMovement(mouseX)
      gsap.to('.project-preview-wrapper', {
        translateX: translateionAmount,
        duration: 0.5,
      })
    })

    document.addEventListener('mousemove', context.handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', context.handleMouseMove)
    }
  }

  const cleanupNavHover = navHover()
  const cleanupTranslate = translateProjectPreview()

  return () => {
    cleanupNavHover()
    cleanupTranslate()
  }
}

export default projectNav

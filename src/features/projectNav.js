import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

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

  const handleProjectClick = () => {
    const projectList = document.querySelectorAll('.project')
    const cleanups = []

    context.add('handleClick', (e) => {
      e.preventDefault()

      const clickedProject = e.currentTarget
      const clickedIndex = Array.from(projectList).indexOf(clickedProject)
      const previewVideos = document.querySelectorAll('.preview-video')
      const st_bio = SplitText.create('.bio', { type: 'words', mask: 'words' })

      // Calculate distance of each project from the clicked one
      const projectsWithDistance = Array.from(projectList).map(
        (project, index) => ({
          element: project,
          distance: Math.abs(index - clickedIndex),
        })
      )

      // Sort by distance (farthest first)
      projectsWithDistance.sort((a, b) => b.distance - a.distance)

      // Exit animation timeline
      const tl = gsap.timeline()

      // Animate preview video clipPath from top to bottom (disappear)
      tl.to(
        previewVideos,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.2,
          ease: 'circ.inOut',
        },
        0
      )
        .to(
          // Preview Border
          '.preview-border.is-left, .preview-border.is-right',
          {
            duration: 2,
            height: 0,
            y: '-50vh',
            stagger: { each: 0.3 },
            ease: 'circ.inOut',
          },
          0.35
        )
        .to(
          // Preview Border
          '.preview-border.is-bottom, .preview-border.is-top',
          {
            duration: 2,
            width: 0,
            x: '50vw',
            stagger: { each: 0.3 },
          },
          0.35
        )
        .to(
          st_bio.words,
          {
            duration: 1.5,
            y: '-130%',
            stagger: { each: 0.01 },
            ease: 'power3.out',
          },
          0.5
        )

      // Fade out other projects (staggered from farthest to closest)
      projectsWithDistance.forEach((item, index) => {
        if (item.distance > 0) {
          tl.to(
            item.element,
            {
              opacity: 0,
              duration: 1,
              ease: 'power3.inOut',
            },
            0.5 + index * 0.08
          )
        }
      })
    })

    //comment for git lol

    projectList.forEach((project) => {
      project.addEventListener('click', context.handleClick)

      cleanups.push(() => {
        project.removeEventListener('click', context.handleClick)
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
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
        // Re-add the special class for The Well Within image
        if (video.id === 'preview-tww') {
          video.classList.add('is-hidden-tww')
        }
      })

      // Show the corresponding video/image
      if (videoId) {
        const targetMedia = document.getElementById(videoId)
        if (targetMedia) {
          targetMedia.classList.remove('is-hidden', 'is-hidden-tww')

          // Restart video only if it's a different video and it's actually a video element
          if (isDifferentVideo && targetMedia.tagName === 'VIDEO') {
            targetMedia.currentTime = 0
            targetMedia.play()
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

  const cleanupProjectClick = handleProjectClick()
  const cleanupNavHover = navHover()
  const cleanupTranslate = translateProjectPreview()

  return () => {
    cleanupProjectClick()
    cleanupNavHover()
    cleanupTranslate()
  }
}

export default projectNav

import gsap from 'gsap'

const projectNav = () => {
  const navHover = () => {
    const projectList = document.querySelectorAll('.project')
    const cleanups = []

    projectList.forEach((project) => {
      const projectName = project.querySelector('h2')
      const projectNameItalic = project.querySelector('.project-name-italic')
      const projectPropertyList = project.querySelectorAll('.project-property')

      const handleMouseEnter = () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: 'power3.out' },
        })
        tl.to(projectName, { y: -22 }, 0)
          .to(projectNameItalic, { y: -22 }, 0)
          .to(projectPropertyList, { top: 0, stagger: { amount: 0.15 } }, 0)
      }

      const handleMouseLeave = () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: 'power3.inOut' },
        })
        tl.to(projectName, { y: 0 }, 0.15)
          .to(projectNameItalic, { y: 0 }, 0.15)
          .to(
            projectPropertyList,
            { top: -18, stagger: { amount: 0.15, from: 'end' } },
            0
          )
      }

      project.addEventListener('mouseenter', handleMouseEnter)
      project.addEventListener('mouseleave', handleMouseLeave)

      cleanups.push(() => {
        project.removeEventListener('mouseenter', handleMouseEnter)
        project.removeEventListener('mouseleave', handleMouseLeave)
      })
    })
    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }

  const translateProjectPreview = () => {
    const mapperMovement = gsap.utils.mapRange(0, window.innerWidth, -10, 10)

    const handleMouseMove = (e) => {
      const mouseX = e.clientX
      const translateionAmount = mapperMovement(mouseX)
      gsap.to('.project-preview-wrapper', {
        translateX: translateionAmount,
        duration: 0.5,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
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

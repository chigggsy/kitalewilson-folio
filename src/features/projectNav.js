import gsap from 'gsap'

const projectNav = (context) => {
  const navHover = () => {
    const projectList = document.querySelectorAll('.project')
    const cleanups = []

    context.add('handleMouseEnter', (e) => {
      const project = e.currentTarget
      const projectName = project.querySelector('h2')
      const projectNameItalic = project.querySelector('.project-name-italic')
      const projectPropertyList = project.querySelectorAll('.project-property')

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

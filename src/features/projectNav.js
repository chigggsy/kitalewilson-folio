import gsap from 'gsap'

const projectNav = () => {
  const navHover = () => {
    const projectList = document.querySelectorAll('.project')

    projectList.forEach((project) => {
      const projectName = project.querySelector('h2')
      const projectNameItalic = project.querySelector('.project-name-italic')
      const projectPropertyList = project.querySelectorAll('.project-property')

      project.addEventListener('mouseenter', () => {
        const TLmouseEnter = gsap.timeline({
          defaults: { duration: 0.6, ease: 'power3.out' },
        })
        TLmouseEnter.to(projectName, { y: -22 }, 0)
          .to(projectNameItalic, { y: -22 }, 0)
          .to(projectPropertyList, { top: 0, stagger: { amount: 0.15 } }, 0)
      })

      project.addEventListener('mouseleave', () => {
        const TLmouseLeave = gsap.timeline({
          defaults: { duration: 0.6, ease: 'power3.inOut' },
        })
        TLmouseLeave.to(projectName, { y: 0 }, 0.15)
          .to(projectNameItalic, { y: 0 }, 0.15)
          .to(
            projectPropertyList,
            { top: -18, stagger: { amount: 0.15, from: 'end' } },
            0
          )
      })
    })
  }

  const translateProjectPreview = () => {
    const mapperMovement = gsap.utils.mapRange(0, window.innerWidth, 15, -15)
    const mapperRotation = gsap.utils.mapRange(0, window.innerWidth, -2, 2)

    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX
      const translateionAmount = mapperMovement(mouseX)
      const rotationAmount = mapperRotation(mouseX)
      gsap.to('.project-preview-wrapper', {
        translateX: translateionAmount,
        rotateY: rotationAmount,
        duration: 0.5,
      })
    })
  }

  navHover()
  translateProjectPreview()
}

export default projectNav

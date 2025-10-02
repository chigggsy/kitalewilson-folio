import gsap from 'gsap'

const projectNav = () => {
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
        .to(projectPropertyList, { top: 0, stagger: { each: 0.11 } }, 0)
    })

    project.addEventListener('mouseleave', () => {
      const TLmouseLeave = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power3.out' },
      })
      TLmouseLeave.to(projectName, { y: 0 }, 0.35)
        .to(projectNameItalic, { y: 0 }, 0.35)
        .to(
          projectPropertyList,
          { top: -18, stagger: { each: 0.11, from: 'end' } },
          0
        )
    })
  })
}

export default projectNav

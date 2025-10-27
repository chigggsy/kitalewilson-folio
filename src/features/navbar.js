import gsap from 'gsap'

const navbar = () => {
  console.log('navbar loaded')

  const navItemWrapperList = document.querySelectorAll('.nav-item-wrapper')

  navItemWrapperList.forEach((navItemWrapper) => {
    const navItem = navItemWrapper.querySelector('.nav-item')
    const navItemItalic = navItemWrapper.querySelector('.nav-item-italic')
    const navUnderline = navItemWrapper.querySelector('.nav-underline')

    navItem.classList.remove('is-active')
    navItemItalic.classList.remove('is-active')
    navUnderline.classList.remove('is-active')

    function handleMouseEnter(e) {
      const hoveredItemParent = e.currentTarget.parentElement
      const hoveredItem = hoveredItemParent.querySelector('.nav-item')
      const hoveredItemItalic =
        hoveredItemParent.querySelector('.nav-item-italic')

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power3.out' },
      })

      tl.to(hoveredItem, { y: '-1rem' }, 0).to(
        hoveredItemItalic,
        { y: '-1.25rem' },
        0
      )
    }

    function handleMouseLeave(e) {
      const hoveredItemParent = e.currentTarget.parentElement
      const hoveredItem = hoveredItemParent.querySelector('.nav-item')
      const hoveredItemItalic =
        hoveredItemParent.querySelector('.nav-item-italic')

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power3.inOut' },
      })

      tl.to(hoveredItem, { y: '0rem' }, 0).to(
        hoveredItemItalic,
        { y: '0rem' },
        0
      )
    }

    navItem.addEventListener('mouseenter', handleMouseEnter)
    navItem.addEventListener('mouseleave', handleMouseLeave)
  })
}

export default navbar

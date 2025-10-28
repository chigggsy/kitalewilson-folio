const navbar = () => {
  const navItemWrapperList = document.querySelectorAll('.nav-item-wrapper')

  function updateActiveNav() {
    const currentPath = window.location.pathname

    // Remove active state from all underlines
    document.querySelectorAll('.nav-underline').forEach((underline) => {
      underline.classList.remove('is-active')
    })

    let activeLink

    // Special handling for home and work project pages
    if (currentPath === '/' || currentPath.startsWith('/work/')) {
      // Activate the home/work link - be specific to avoid selecting the logo
      activeLink = document.querySelector('.nav-item-wrapper[href="/"]')
    } else {
      // For other pages, try to find exact match within nav items
      activeLink = document.querySelector(
        `.nav-item-wrapper[href="${currentPath}"]`
      )
    }

    console.log('Current path:', currentPath)
    console.log('Active link:', activeLink)

    if (activeLink) {
      const underline = activeLink.querySelector('.nav-underline')
      console.log('Underline element:', underline)
      if (underline) {
        underline.classList.add('is-active')
      }
    }
  }

  navItemWrapperList.forEach((navItemWrapper) => {
    navItemWrapper.addEventListener('mouseenter', () => {
      const underline = navItemWrapper.querySelector('.nav-underline-wrapper')
      underline.classList.add('is-hover')
    })
    navItemWrapper.addEventListener('mouseleave', () => {
      const underline = navItemWrapper.querySelector('.nav-underline-wrapper')
      underline.classList.remove('is-hover')
    })
  })

  updateActiveNav()
}

export default navbar

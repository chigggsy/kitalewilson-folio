import gsap from 'gsap'

const navbar = () => {
  updateActiveNav()
  const navItemWrapperList = document.querySelectorAll('.nav-item-wrapper')
  const logo = document.querySelector('.logo')
  const transitionWrapper = document.querySelector('.transition-wrapper')

  function updateActiveNav() {
    const currentPath = window.location.pathname
    let activeLink

    document.querySelectorAll('.nav-underline').forEach((underline) => {
      underline.classList.remove('is-active')
    })

    if (currentPath === '/' || currentPath.startsWith('/work/')) {
      activeLink = document.querySelector('.nav-item-wrapper[href="/"]')
    } else {
      activeLink = document.querySelector(
        `.nav-item-wrapper[href="${currentPath}"]`
      )
    }

    if (activeLink) {
      const underline = activeLink.querySelector('.nav-underline')
      if (underline) {
        underline.classList.add('is-active')
      }
    }
  }

  function handleNavClick(e) {
    e.preventDefault()
    const targetUrl = e.currentTarget.getAttribute('href')
    const currentPath = window.location.pathname
    const previewBorder = document.querySelectorAll('.preview-border')
    const nav = document.querySelector('.nav')

    // Don't transition if we're already on this page
    if (targetUrl === currentPath) return

    // Remove active class from current underline to trigger its exit animation
    const activeUnderline = document.querySelector('.nav-underline.is-active')
    if (activeUnderline) {
      activeUnderline.classList.remove('is-active')
    }

    if (previewBorder) {
      gsap.to(previewBorder, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }

    // Fade out nav if navigating to home page
    if (targetUrl === '/' && nav) {
      gsap.to(nav, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }

    // Animate transition wrapper to opacity 1 (fade out)
    gsap.to(transitionWrapper, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Navigate to new page after animation completes
        window.location.href = targetUrl
      },
    })
  }

  navItemWrapperList.forEach((navItemWrapper) => {
    // Add click handler for page transitions
    navItemWrapper.addEventListener('click', handleNavClick)
  })

  // Add click handler for logo
  if (logo) {
    logo.addEventListener('click', handleNavClick)
  }

  // Reset transition wrapper opacity on page load (fade in)
  if (transitionWrapper) {
    gsap.set(transitionWrapper, { opacity: 1 })
    gsap.to(transitionWrapper, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    })
  }
}

export default navbar

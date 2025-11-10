import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default function initFullscreenImageViewer() {
  const mm = gsap.matchMedia()

  mm.add({ isDesktop: '(min-width: 992px)' }, (context) => {
    const { isDesktop } = context.conditions

    // Only run on desktop
    if (!isDesktop) return

    // Get all gallery images
    const galleryImages = document.querySelectorAll(
      '.project-gallery-image img'
    )

    // Get fullscreen viewer elements
    const viewer = document.querySelector('.fullscreen-image-viewer')
    const viewerImage = document.querySelector('.fullscreen-image-viewer img')
    const closeButton = document.querySelector('.fullscreen-control')
    const st_exitFullscreen = new SplitText(closeButton, {
      type: 'words',
      mask: 'words',
    })

    // Return early if elements don't exist
    if (!viewer || !viewerImage || !closeButton || galleryImages.length === 0) {
      return
    }

    let isOpen = false

    /**
     * Opens fullscreen viewer
     */
    function openFullscreen(clickedImage) {
      if (isOpen) return

      isOpen = true

      // Set up fullscreen viewer image
      viewerImage.src = clickedImage.src
      viewerImage.srcset = clickedImage.srcset || ''
      viewerImage.alt = clickedImage.alt || ''

      // Show viewer
      viewer.style.display = 'flex'

      // Reset close button words position
      gsap.set(st_exitFullscreen.words, { y: '0%' })

      // Create entrance timeline
      const tl = gsap.timeline()

      // Fade in the viewer background
      tl.fromTo(
        viewer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power3.inOut',
        },
        0
      )

      // Fade and scale in the image
      tl.fromTo(
        viewerImage,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.75,
          ease: 'circ.inOut',
        },
        0.35
      ).from(
        st_exitFullscreen.words,
        {
          duration: 1,
          y: '1rem',
          stagger: { each: 0.04 },
          ease: 'circ.inOut',
        },
        0.6
      )

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    /**
     * Closes fullscreen viewer
     */
    function closeFullscreen() {
      if (!isOpen) return

      // Create exit timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide viewer after animation
          viewer.style.display = 'none'
          viewerImage.src = ''
          viewerImage.srcset = ''
          isOpen = false
        },
      })

      // Fade and scale out the image
      tl.fromTo(
        viewerImage,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.75,
          ease: 'circ.inOut',
        },
        0.2
      )

      tl.to(
        st_exitFullscreen.words,
        {
          duration: 1,
          y: '-110%',
          stagger: { each: 0.04 },
          ease: 'circ.inOut',
        },
        0
      ).to(
        viewer,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power3.inOut',
        },
        0.8
      )

      // Restore body scroll
      document.body.style.overflow = ''
    }

    /**
     * Handle gallery image clicks
     */
    function handleImageClick(e) {
      const clickedImage = e.currentTarget
      openFullscreen(clickedImage)
    }

    /**
     * Handle close button click
     */
    function handleCloseClick() {
      closeFullscreen()
    }

    /**
     * Handle escape key press
     */
    function handleKeyPress(e) {
      if (e.key === 'Escape' && isOpen) {
        closeFullscreen()
      }
    }

    /**
     * Handle clicking outside image to close
     */
    function handleViewerClick(e) {
      // Close if clicking the viewer background (not the image or close button)
      if (e.target === viewer) {
        closeFullscreen()
      }
    }

    // Add event listeners
    galleryImages.forEach((img) => {
      img.style.cursor = 'pointer'
      img.addEventListener('click', handleImageClick)
    })

    closeButton.addEventListener('click', handleCloseClick)
    viewer.addEventListener('click', handleViewerClick)
    document.addEventListener('keydown', handleKeyPress)

    // Cleanup function
    return () => {
      // Remove cursor styles
      galleryImages.forEach((img) => {
        img.style.cursor = ''
        img.removeEventListener('click', handleImageClick)
      })

      closeButton.removeEventListener('click', handleCloseClick)
      viewer.removeEventListener('click', handleViewerClick)
      document.removeEventListener('keydown', handleKeyPress)

      // Reset viewer state
      if (isOpen) {
        viewer.style.display = 'none'
        viewer.style.opacity = '0'
        viewerImage.src = ''
        viewerImage.srcset = ''
        document.body.style.overflow = ''
      }
    }
  })

  // Return MatchMedia cleanup
  return () => {
    mm.revert()
  }
}

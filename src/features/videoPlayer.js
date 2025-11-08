import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const videoPlayer = (videoElement) => {
  if (!videoElement) return () => {}

  const wrapper = videoElement.closest('.video-player-wrapper')
  if (!wrapper) {
    console.warn('Video player wrapper not found')
    return () => {}
  }

  // Get UI elements
  const playPauseBtn = wrapper.querySelector('.vp-play-pause-btn')
  const progressHitbox = wrapper.querySelector('.vp-progress-hitbox')
  const progressBar = wrapper.querySelector('.vp-progress-bar')
  const progressFilled = wrapper.querySelector('.vp-progress-filled')
  const progressHover = wrapper.querySelector('.vp-progress-hover')
  const currentTimeEl = wrapper.querySelector('.vp-current-time')
  const totalTimeEl = wrapper.querySelector('.vp-total-time')
  const fullscreenBtn = wrapper.querySelector('.vp-fullscreen-btn')
  const muteBtn = wrapper.querySelector('.vp-mute-btn')
  const playerUI = wrapper.querySelector('.vp-player-ui')
  const pausedOverlay = wrapper.querySelector('.vp-paused-overlay')
  const centerIcon = wrapper.querySelector('.vp-center-icon')
  const tooltipFullscreen = wrapper.querySelector(
    '.vp-control-tooltip.is-fullscreen'
  )
  const tooltipMute = wrapper.querySelector('.vp-control-tooltip.is-mute')

  let hideControlsTimeout = null
  let isPlaying = false
  let splitFullscreen = null
  let splitMute = null
  let fullscreenTooltipTimeline = null
  let muteTooltipTimeline = null

  // Format time helper
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Update progress bar
  const updateProgress = () => {
    if (!videoElement.duration) return
    const percent = (videoElement.currentTime / videoElement.duration) * 100
    gsap.to(progressFilled, { width: `${percent}%`, duration: 0.1 })
    currentTimeEl.textContent = formatTime(videoElement.currentTime)
  }

  // Show controls
  const showControls = () => {
    gsap.to([playerUI, centerIcon, pausedOverlay], {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Auto-hide controls after 3 seconds if playing
    if (isPlaying) {
      clearTimeout(hideControlsTimeout)
      hideControlsTimeout = setTimeout(hideControls, 3000)
    }
  }

  // Hide controls
  const hideControls = () => {
    if (!isPlaying) return // Don't hide if paused
    gsap.to([playerUI, centerIcon, pausedOverlay], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoElement.paused) {
      videoElement.play()
      isPlaying = true

      // Show pause icon
      playPauseBtn.classList.remove('is-play')
      playPauseBtn.classList.add('is-pause')

      // Start auto-hide timer
      hideControlsTimeout = setTimeout(hideControls, 3000)
    } else {
      videoElement.pause()
      isPlaying = false

      // Show play icon
      playPauseBtn.classList.remove('is-pause')
      playPauseBtn.classList.add('is-play')

      // Keep controls visible when paused
      showControls()
      clearTimeout(hideControlsTimeout)
    }
  }

  // Update progress hover indicator
  const updateProgressHover = (e) => {
    if (!progressHover) return
    const rect = progressBar.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const percent = pos * 100
    gsap.to(progressHover, {
      width: `${percent}%`,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  // Hide progress hover indicator
  const hideProgressHover = () => {
    if (!progressHover) return
    const tl = gsap.timeline()
    tl.to(progressHover, { duration: 0.5, opacity: '0%' }).to(
      progressHover,
      { duration: 0, clearProps: 'all' },
      0.5
    )
  }

  // Seek video
  const seek = (e) => {
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    videoElement.currentTime = pos * videoElement.duration
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen()
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  // Toggle mute
  const toggleMute = () => {
    videoElement.muted = !videoElement.muted
    muteBtn.classList.toggle('is-muted', videoElement.muted)
  }

  // Tooltip animations
  const showTooltip = (splitInstance, timelineRef) => {
    if (!splitInstance) return

    // Kill any existing animation on this tooltip
    if (timelineRef === 'fullscreen' && fullscreenTooltipTimeline) {
      fullscreenTooltipTimeline.kill()
    } else if (timelineRef === 'mute' && muteTooltipTimeline) {
      muteTooltipTimeline.kill()
    }

    const tl = gsap.timeline()
    tl.to(splitInstance.chars, {
      top: '-1.1rem',
      duration: 0.6,
      stagger: 0.008,
      ease: 'circ.out',
    })

    // Store the timeline reference
    if (timelineRef === 'fullscreen') {
      fullscreenTooltipTimeline = tl
    } else if (timelineRef === 'mute') {
      muteTooltipTimeline = tl
    }
  }

  const hideTooltip = (splitInstance, timelineRef) => {
    if (!splitInstance) return

    // Kill any existing animation on this tooltip
    if (timelineRef === 'fullscreen' && fullscreenTooltipTimeline) {
      fullscreenTooltipTimeline.kill()
    } else if (timelineRef === 'mute' && muteTooltipTimeline) {
      muteTooltipTimeline.kill()
    }

    const tl = gsap.timeline()
    tl.to(splitInstance.chars, { duration: 0.2, opacity: 0 }, 0)
    tl.to(splitInstance.chars, {
      duration: 0,
      top: '1.1rem',
      opacity: 1,
    })

    // Store the timeline reference
    if (timelineRef === 'fullscreen') {
      fullscreenTooltipTimeline = tl
    } else if (timelineRef === 'mute') {
      muteTooltipTimeline = tl
    }
  }

  // Event listeners
  const handleVideoClick = () => togglePlayPause()
  const handlePlayPauseClick = () => togglePlayPause()
  const handleProgressClick = (e) => seek(e)
  const handleProgressMouseMove = (e) => updateProgressHover(e)
  const handleProgressMouseLeave = () => hideProgressHover()
  const handleFullscreenClick = () => toggleFullscreen()
  const handleFullscreenHover = () => showTooltip(splitFullscreen, 'fullscreen')
  const handleFullscreenHoverOut = () =>
    hideTooltip(splitFullscreen, 'fullscreen')
  const handleMuteClick = () => toggleMute()
  const handleMuteHover = () => showTooltip(splitMute, 'mute')
  const handleMuteHoverOut = () => hideTooltip(splitMute, 'mute')
  const handleMouseMove = () => showControls()
  const handleMouseLeave = () => {
    if (isPlaying) {
      clearTimeout(hideControlsTimeout)
      hideControlsTimeout = setTimeout(hideControls, 1000)
    }
  }
  const handleTimeUpdate = () => updateProgress()
  const handleLoadedMetadata = () => {
    totalTimeEl.textContent = formatTime(videoElement.duration)
    currentTimeEl.textContent = formatTime(0)
  }

  // Attach event listeners
  videoElement.addEventListener('click', handleVideoClick)
  videoElement.addEventListener('timeupdate', handleTimeUpdate)
  videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
  playPauseBtn?.addEventListener('click', handlePlayPauseClick)
  progressHitbox?.addEventListener('click', handleProgressClick)
  progressHitbox?.addEventListener('mousemove', handleProgressMouseMove)
  progressHitbox?.addEventListener('mouseleave', handleProgressMouseLeave)
  fullscreenBtn?.addEventListener('click', handleFullscreenClick)
  fullscreenBtn?.addEventListener('mouseenter', handleFullscreenHover)
  fullscreenBtn?.addEventListener('mouseleave', handleFullscreenHoverOut)
  muteBtn?.addEventListener('click', handleMuteClick)
  muteBtn?.addEventListener('mouseenter', handleMuteHover)
  muteBtn?.addEventListener('mouseleave', handleMuteHoverOut)
  wrapper.addEventListener('mousemove', handleMouseMove)
  wrapper.addEventListener('mouseleave', handleMouseLeave)

  // Initialize SplitText for tooltips
  if (tooltipFullscreen) {
    splitFullscreen = new SplitText(tooltipFullscreen, { type: 'chars' })
  }
  if (tooltipMute) {
    splitMute = new SplitText(tooltipMute, { type: 'chars' })
  }

  // Initial state setup (video starts paused, so show all UI)
  gsap.set([playerUI, centerIcon, pausedOverlay], { opacity: 1 })
  playPauseBtn?.classList.add('is-play')

  // Disable native browser controls
  videoElement.removeAttribute('controls')
  videoElement.controls = false

  // Cleanup function
  return () => {
    clearTimeout(hideControlsTimeout)
    videoElement.removeEventListener('click', handleVideoClick)
    videoElement.removeEventListener('timeupdate', handleTimeUpdate)
    videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
    playPauseBtn?.removeEventListener('click', handlePlayPauseClick)
    progressHitbox?.removeEventListener('click', handleProgressClick)
    progressHitbox?.removeEventListener('mousemove', handleProgressMouseMove)
    progressHitbox?.removeEventListener('mouseleave', handleProgressMouseLeave)
    fullscreenBtn?.removeEventListener('click', handleFullscreenClick)
    fullscreenBtn?.removeEventListener('mouseenter', handleFullscreenHover)
    fullscreenBtn?.removeEventListener('mouseleave', handleFullscreenHoverOut)
    muteBtn?.removeEventListener('click', handleMuteClick)
    muteBtn?.removeEventListener('mouseenter', handleMuteHover)
    muteBtn?.removeEventListener('mouseleave', handleMuteHoverOut)
    wrapper.removeEventListener('mousemove', handleMouseMove)
    wrapper.removeEventListener('mouseleave', handleMouseLeave)

    // Revert SplitText
    splitFullscreen?.revert()
    splitMute?.revert()
  }
}

export default videoPlayer

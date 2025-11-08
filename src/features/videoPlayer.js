import gsap from 'gsap'

const videoPlayer = (videoElement) => {
  if (!videoElement) return () => {}

  const wrapper = videoElement.closest('.video-player-wrapper')
  if (!wrapper) {
    console.warn('Video player wrapper not found')
    return () => {}
  }

  // Get UI elements
  const playPauseBtn = wrapper.querySelector('.vp-play-pause-btn')
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

  let hideControlsTimeout = null
  let isPlaying = false

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

  // Event listeners
  const handleVideoClick = () => togglePlayPause()
  const handlePlayPauseClick = () => togglePlayPause()
  const handleProgressClick = (e) => seek(e)
  const handleProgressMouseMove = (e) => updateProgressHover(e)
  const handleProgressMouseLeave = () => hideProgressHover()
  const handleFullscreenClick = () => toggleFullscreen()
  const handleMuteClick = () => toggleMute()
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
  progressBar?.addEventListener('click', handleProgressClick)
  progressBar?.addEventListener('mousemove', handleProgressMouseMove)
  progressBar?.addEventListener('mouseleave', handleProgressMouseLeave)
  fullscreenBtn?.addEventListener('click', handleFullscreenClick)
  muteBtn?.addEventListener('click', handleMuteClick)
  wrapper.addEventListener('mousemove', handleMouseMove)
  wrapper.addEventListener('mouseleave', handleMouseLeave)

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
    progressBar?.removeEventListener('click', handleProgressClick)
    progressBar?.removeEventListener('mousemove', handleProgressMouseMove)
    progressBar?.removeEventListener('mouseleave', handleProgressMouseLeave)
    fullscreenBtn?.removeEventListener('click', handleFullscreenClick)
    muteBtn?.removeEventListener('click', handleMuteClick)
    wrapper.removeEventListener('mousemove', handleMouseMove)
    wrapper.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export default videoPlayer

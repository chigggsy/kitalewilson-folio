import gsap from 'gsap'

const textLink = () => {
  if (!document.querySelector('.text-link')) return

  const textLinkList = document.querySelectorAll('.text-link')

  textLinkList.forEach((textLink) => {
    const textLinkText = textLink.querySelector('.text-link-text')
    const textLinkItalic = textLink.querySelector('.text-link-italic')
    textLink.addEventListener('mouseenter', () => {
      const tl = gsap.timeline()
      tl.to(textLinkText, { y: '-100%' }, 0).to(textLinkItalic, { y: '0%' }, 0)
    })
  })
}

export default textLink

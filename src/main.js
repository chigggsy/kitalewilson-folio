import pageGlobal from './pages/pageGlobal'
import './styles/style.css'

// Global
pageGlobal()

// Page specific
if (window.location.pathname === '/') {
  console.log('home page script loaded')
} else if (window.location.pathname === '/stills') {
  console.log('stills page script loaded')
} else if (window.location.pathname === '/about') {
  console.log('about page script loaded')
} else if (window.location.pathname === '/contact') {
  console.log('contact page script loaded')
} else if (window.location.pathname.startsWith('/work/')) {
  console.log('project page script loaded')
}

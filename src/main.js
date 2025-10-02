import pageAbout from './pages/pageAbout'
import pageContact from './pages/pageContact'
import pageGlobal from './pages/pageGlobal'
import pageHome from './pages/pageHome'
import pageProjectTemplate from './pages/pageProjectTemplate'
import pageStills from './pages/pageStills'
import './styles/style.css'

// Global
pageGlobal()

// Page specific
if (window.location.pathname === '/') {
  pageHome()
} else if (window.location.pathname === '/stills') {
  pageStills()
} else if (window.location.pathname === '/about') {
  pageAbout()
} else if (window.location.pathname === '/contact') {
  pageContact()
} else if (window.location.pathname.startsWith('/work/')) {
  pageProjectTemplate()
}

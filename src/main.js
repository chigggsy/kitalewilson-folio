import barbaHandler from './features/barbaHandler'

import './styles/style.css'

// Global
barbaHandler()

/*

OLD ROUTING METHOD

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
*/

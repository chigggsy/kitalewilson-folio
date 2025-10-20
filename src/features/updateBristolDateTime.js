function updateBristolDateTime() {
  const now = new Date()

  // Get date components for Bristol timezone
  const weekday = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
  })

  const day = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    day: 'numeric',
  })

  const month = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    month: 'short',
  })

  const year = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
  })

  // Get time for Bristol timezone
  const time = now.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  // Format date with ordinal suffix
  const ordinal = getOrdinalSuffix(parseInt(day))
  const formattedDate = `${weekday}, ${day}${ordinal} ${month} ${year}`

  // Uppercase AM/PM
  const formattedTime = time.toUpperCase()

  // Update the DOM elements
  document.getElementById('date').textContent = formattedDate
  document.getElementById('time').textContent = formattedTime
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

updateBristolDateTime()
setInterval(updateBristolDateTime, 60000)

export default updateBristolDateTime

export function formatDate(dateString) {
  const dateObject = new Date(dateString)

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return new Intl.DateTimeFormat('en-UK', options).format(dateObject)
}

// {
//   item.content.includes('1.') ? '1' : '2'
// }

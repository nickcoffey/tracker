export function convertToFull(text) {
    if(text.length === 1) {
        text = `0${text}`
    }
    return text
}

export function getCurrentDateString() {
    var date = new Date()
    var fullHours = convertToFull(date.getHours().toString())
    var fullMinutes = convertToFull(date.getMinutes().toString())
    var fullMonth = convertToFull(date.getMonth().toString())
    var fullDay = convertToFull(date.getDate().toString())
    var fullSeconds = convertToFull(date.getSeconds().toString())
    return `${date.getFullYear()}-${fullMonth}-${fullDay} ${fullHours}:${fullMinutes}:${fullSeconds}`
}

export function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return `${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
}
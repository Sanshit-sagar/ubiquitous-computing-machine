
export function getLocaleTimestring(timestamp) {
    return new Date(timestamp).toLocaleTimeString()
}

export function getDateString(timestamp) {
    return new Date(timestamp).toDateString()
}

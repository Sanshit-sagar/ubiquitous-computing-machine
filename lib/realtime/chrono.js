
export function getDaysInMonth() {
    const month = new Date().getMonth();
    return month===2 ? 28 : month%2===0 ? 30 : 31
}

export function getUnixIndexForDay(epoch) {
    return epoch - (epoch % 3600*24)
}

export function getUnixIndexForWeek(epoch) {
    return epoch - (epoch % 3600*24*7)
}

export function getUnixIndexForMonth(epoch) {
    return epoch - (epoch % 3600*24*7*getDaysInMonth())
}

export default function getChronologicalIndicies() {
    const epoch = new Date().getTime();

    var indicies = {
        dayIndex: getUnixIndexForDay(epoch),
        weekIndex: getUnixIndexForWeek(epoch),
        monthIndex: getUnixIndexForMonth(epoch),
    }
    return indicies
}


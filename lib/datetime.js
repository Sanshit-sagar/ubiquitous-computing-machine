import { DateTime } from 'luxon'

export function getLocaleTimestring(timestamp) {
    return new Date(timestamp).toLocaleTimeString()
}

export function getDateString(timestamp) {
    return new Date(timestamp).toDateString()
}

export const timeDifference = (timestamp) => {
    const units = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
    ];

    let dateTime = DateTime.fromMillis(parseInt(timestamp))

    const diff = dateTime.diffNow().shiftTo(...units);
    const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';
    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });

    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};
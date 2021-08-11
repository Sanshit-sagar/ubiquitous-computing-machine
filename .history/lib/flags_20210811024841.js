const flagMap = {
    'UK': '🇬🇧 ',
    'United Kingdom': '🇬🇧 ',
    'Britain': '🇬🇧 ',
    'England': '🇬🇧 ',
    'Canada': '🇨🇦 ',
    'Czech Republic': '🇵🇭',
    'Germany': '🇩🇪',
    'India': '🇮🇳',
    'United States': '🇺🇸',
    'United States of America': '🇺🇸',
    'America': '🇺🇸',
    'USA': '🇺🇸',
    'US': '🇺🇸',
    'U.S.': '🇺🇸',
    'U.S.A': '🇺🇸',
};

export function getFlags(country) {
    return flagMap[country] || `${country}`;
}
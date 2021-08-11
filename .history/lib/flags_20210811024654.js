const flagMap = {
    'UK': '🇬🇧 ',
    'United Kingdom': '🇬🇧 ',
    'Britain': '🇬🇧 ',
    'England': '🇬🇧 ',
    'Canada': '🇨🇦 ',
    'Czech Republic': '🇵🇭',
    'Germany': '🇩🇪',
    'India': '🇮🇳',
};

export function getFlags(country) {
    return flagMap[country] || `${country}`;
}
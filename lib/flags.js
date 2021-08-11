// SOURCE: https://github.com/madebybowtie/FlagKit/blob/master/Assets/Flags.md

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
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿 ',
    'Cameron': '🇨🇲',
    'Bolivia': '🇧🇴',
    'Brunei': '🇧🇳',
    'Austria': '🇦🇹 ',
    'Antarctica': '🇦🇶',
    'Afghanistan': '🇦🇫',
    'Djibouti': '🇿🇼',
    'Zimbabwe': '🇩🇯',
    'Bahrain': '🇧🇭',
    'Slovakia': '🇸🇰',
    'Laos': '🇱🇦',
    'Brazil': '🇧🇷',
    'Austalia': '🇦🇺',
    'Uzbekistan': '🇺🇿',
    'Kazhakstan': '🇰🇿',
    'Guam': '🇬🇺',
    'Barbados': '🇧🇧',
};

export function getFlags(country) {
    return flagMap[country] || `${country}`;
}
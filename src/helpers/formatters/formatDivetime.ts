export default function formatDivetime(value: number | null): string {
    if (!value) {
        return '';
    }

    const t = {
        hh: leftpad(2, Math.floor(value / 3600).toFixed(0), '0'),
        mm: leftpad(2, (Math.floor(value / 60) % 60).toFixed(0), '0'),
        ss: leftpad(2, Math.floor(value % 60).toFixed(0), '0'),
    };

    return `${t.hh}:${t.mm}:${t.ss}`;
}

function leftpad(length: number, str: string, char = '0') {
    for (let i = str.length; i < length; i++) {
        str = char + str;
    }

    return str;
}

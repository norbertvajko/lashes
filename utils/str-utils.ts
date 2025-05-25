export const convertToTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Define a mapping object for Romanian diacritics
const diacriticMap: any = {
    'ă': 'a',
    'î': 'i',
    'ș': 's',
    'ț': 't',
    'â': 'a'
};

export const convertDiacriticsToNormal = (str: string) => {
    return str.replace(/[ăîșțâ]/g, match => diacriticMap[match]);
}

export const splitStringsUsingRegex = (inputString: string): string[] => {
    // Split by newline and keep empty strings for consecutive new lines
    const lines = inputString.split(/(\n)/g);
    const chars: string[] = [];

    for (const line of lines) {
        // Push each character in the line, including the new line character as a separate element
        if (line) {
            for (const char of line) {
                chars.push(char);
            }
        } else {
            // If line is empty (consecutive new lines), add a new line element to keep it in the array
            chars.push('\n'); // This will allow us to display a new line
        }
    }

    return chars;
};

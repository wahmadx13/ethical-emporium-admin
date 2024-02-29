export function capitalizeFirstLetter(str: string) {
    // Convert the string to lowercase first
    str = str.toLowerCase();

    // If the string has words separated by "-" or "_", replace them with spaces
    str = str.replace(/[_-]/g, ' ');

    // Split the string into words
    let words = str.split(' ');

    // Capitalize the first letter of each word
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a string
    let result = words.join(' ');

    // If the string is just two characters long, make both uppercase
    if (result.length === 2) {
        result = result.toUpperCase();
    } else {
        // Capitalize the first letter of the string
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
}

export function transformStringToLowerCase(str: string) {
    // Convert the entire string to lowercase
    str = str.toLowerCase();

    // Remove any "-", "_", or spaces
    str = str.replace(/[_-\s]/g, '');

    // Make the first letter lowercase
    str = str.charAt(0).toLowerCase() + str.slice(1);

    return str;
}

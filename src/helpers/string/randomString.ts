const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const alphabetSize = alphabet.length;
export default function psuedorandomString(length = 9): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabetSize));
    }
    return result;
}

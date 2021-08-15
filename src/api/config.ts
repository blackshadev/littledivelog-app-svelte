declare const process: { env: { isProd: boolean } };

function isProd() {
    return process?.env?.isProd === true;
}

export const apiURL = isProd() ? 'https://dive.littledev.nl/api' : 'http://localhost:8000/api';

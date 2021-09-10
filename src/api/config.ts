declare const process: { env: { NODE_ENV: string } };

function isProd() {
    return process.env.NODE_ENV === 'production';
}

export const apiURL = isProd() ? 'https://dive.littledev.nl/api' : 'http://localhost:8000/api';

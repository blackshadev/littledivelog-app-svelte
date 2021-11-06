import { randomItem } from '../array/randomItem';

export const allGreetings = [
    'Ready to log some more?',
    'Happy logging',
    'Do you have improvement suggestions? Contact me!',
    'Live, dive, log, repeat.',
];

export function getGreeting(): string {
    return randomItem(allGreetings);
}

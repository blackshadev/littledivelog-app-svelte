import dayjs from 'dayjs';

export default function formatDatetime(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

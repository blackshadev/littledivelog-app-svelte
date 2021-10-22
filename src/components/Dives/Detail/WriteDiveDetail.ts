import type { BuddySummary } from '../../../api/types/buddies/BuddySummary';
import type { Place } from '../../../api/types/places/country';
import type { TagSummary } from '../../../api/types/tags/TagSummary';

export interface WriteDiveDetail {
    id: null | number;
    updated: string;
    date: string;
    divetime: string;
    max_depth: number;
    tanks: {
        volume: number;
        oxygen: number;
        pressure: {
            begin: number;
            end: number;
            type: 'psi' | 'bar';
        };
    }[];
    country_code: string | undefined;
    place?: Place | { name: string; country_code: string };
    buddies: BuddySummary[];
    tags: TagSummary[];
}

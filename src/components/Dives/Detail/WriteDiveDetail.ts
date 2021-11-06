import type { BuddySummary } from '../../../api/types/buddies/BuddySummary';
import type { Place } from '../../../api/types/places/country';
import type { TagSummary } from '../../../api/types/tags/TagSummary';
import type { DiveTank } from '../../../api/types/tanks/DiveTank';
import type { Optional } from '../../../helpers/types/optional';

export interface WriteDiveDetail {
    id: null | number;
    updated: string;
    date: string;
    divetime: string;
    max_depth: number;
    tanks: DiveTank[];
    country_code: string | undefined;
    place?: Optional<Place, 'place_id'>;
    buddies: BuddySummary[];
    tags: TagSummary[];
}

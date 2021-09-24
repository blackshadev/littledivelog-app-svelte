import type { BuddySummary } from '../../api/types/buddies/BuddySummary';
import type { TagSummary } from '../../api/types/tags/TagSummary';
import type { UniversalTag } from '../../api/types/universalTag';

export function universalTagFromTagSummary(tag: TagSummary): UniversalTag {
    return {
        id: tag.tag_id,
        text: tag.text,
        color: tag.color,
    };
}

export function universalTagFromBuddySummary(tag: BuddySummary): UniversalTag {
    return {
        id: tag.buddy_id,
        text: tag.text,
        color: tag.color,
    };
}

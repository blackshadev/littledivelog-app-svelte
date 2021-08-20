<script lang="ts">
import { getSelectedDiveContext } from "../Context/SelectedDive";


    const { diveId } = getSelectedDiveContext();
</script>


<span>{$diveId}</span>



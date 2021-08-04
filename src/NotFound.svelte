 <script lang="ts">
import {location} from 'svelte-spa-router'
</script>

<p>
    Page {$location} not found
</p>

<style lang="scss">
  p {
    @apply text-lg;
  }
</style>
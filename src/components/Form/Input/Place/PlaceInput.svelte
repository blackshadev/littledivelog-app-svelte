<script lang="ts">
    import AutocompleteInput from '../Autocomplete/AutocompleteInput.svelte';
    import * as api from '../../../../api/places';
    import { withAccessToken } from '../../../../helpers/auth/withAccessToken';
    import type { Place } from '../../../../api/types/places/country';
    import { onMount } from 'svelte';

    export let countryValue: string | undefined = undefined;
    export let id: string;
    export let inputClassName: string | undefined = undefined;
    let countryOptions: { label: string; value: string }[] = [];
    async function getCountries() {
        const countries = await withAccessToken(api.getCountries)();
        countryOptions = countries.map((country) => ({ label: country.name, value: country.iso2 }));
    }

    getCountries();

    let placeOptions: { label: string; value: Place }[] = [];
    export let placeValue: { place_id?: number; name: string; country_code?: string } | undefined = undefined;
    let placeFilterValue: string = '';

    async function updatePlaces(
        filterValue?: string,
        countryValue?: string
    ): Promise<{ label: string; value: Place }[]> {
        const places = await withAccessToken((token) => api.getPlaces(token, filterValue, countryValue))();

        return places.map((place) => ({
            label: place.name,
            value: place,
        }));
    }

    $: {
        updatePlaces(placeFilterValue, countryValue).then((places) => {
            placeOptions = places;
        });
    }
    onMount(() => {
        placeFilterValue = placeValue?.name ?? '';
    });
</script>

<AutocompleteInput
    {id}
    inputClassName="{inputClassName} --first"
    name="place"
    placeholder="Kerkweg, Den Osse"
    getKey={(option) => option.place_id}
    bind:value={placeValue}
    bind:filterValue={placeFilterValue}
    options={placeOptions}
    on:selectValue={(placeEvent) => {
        if (placeEvent.detail && placeEvent.detail.country_code && placeEvent.detail.country_code !== countryValue) {
            countryValue = placeEvent.detail.country_code;
        }
    }}
/>
<AutocompleteInput
    id="{id}-country"
    inputClassName="{inputClassName} --last"
    name="country"
    placeholder="The Netherlands"
    bind:value={countryValue}
    options={countryOptions}
    clientFilter={true}
    on:selectValue={(countryEvent) => {
        if (countryEvent.detail && placeValue && countryEvent.detail !== placeValue.country_code) {
            placeValue = undefined;
            placeFilterValue = '';
        }
    }}
/>

interface ISelectedSlugProps {
    id: number;
}

export function getSelectedIdsArray(selected: number[] | string[]) {
    let selectedSlugs: ISelectedSlugProps[] = [];

    selected.map(function(selectedId: number | string, index: number) {
        let currentSelection = parseInt(`${selectedId}`); 
        selectedSlugs.push({ id: currentSelection });
    });

    return selectedSlugs;
}
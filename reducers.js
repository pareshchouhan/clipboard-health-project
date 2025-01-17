import produce from 'immer';

const projectReducer = produce((draft, action) => {
    switch(action.type) {
        case 'filters/set':
            draft.filters = action.filters;
            break;
        case 'jobs/set':
            draft.jobs = action.jobs;
            break;
        case 'jobs/loading':
            draft.ui.jobsLoading = action.isLoading;
            break;
        case 'queryModifiers/setQueryModifier':
            draft.ui.queryModifiers[action.modifierKey] = action.modifierValue;
            break;
        case 'filters/setActiveFilter':
            if (draft.ui.activeFilters[action.filterKey]) {
                if (draft.ui.activeFilters[action.filterKey].includes(action.filterValue)) {
                    draft.ui.activeFilters[action.filterKey] = draft.ui.activeFilters[action.filterKey].filter(filter => filter != action.filterValue);
                    if (draft.ui.activeFilters[action.filterKey].length == 0) {
                        delete draft.ui.activeFilters[action.filterKey];
                    }
                } else {
                    draft.ui.activeFilters[action.filterKey].push(action.filterValue);
                }
            } else {
                draft.ui.activeFilters[action.filterKey] = [action.filterValue];
            }
            break;
        case 'search/setSearchText':
            draft.ui.searchText = action.searchText;
            break;
    }
}, {
    filters: {},
    jobs: [],
    ui: {
        searchText: '',
        activeFilters: {

        },
        queryModifiers: {
          location: '',
          role: '',
          department: '',
          education: '',
          experience: ''
        }
      }
});

export default projectReducer;
import { server } from './config';

export const setFilters = filters => ({
    type: 'filters/set',
    filters
});

export const setActiveFilter = (filterKey, filterValue) => {
    return async (dispatch) => {
        dispatch({
            type: 'filters/setActiveFilter',
            filterKey,
            filterValue
        });
        dispatch(searchForJobsUsingSagas());
    }
}

export const fetchFilters = () => {
    return async (dispatch) => {
        let filters = {};
        try {
          const result = await fetch(`${server}/api/filters`);
          filters = await result.json();
          console.log(filters);
          dispatch(setFilters(filters));
        } catch (exc) {
          console.log(exc);
        }
    };
};

export const setQueryModifiers = (modifierKey, modifierValue) => {
    return async(dispatch) => {
        dispatch({
            type: 'queryModifiers/setQueryModifier',
            modifierKey,
            modifierValue
        });
        dispatch(searchForJobsUsingSagas());
    };
}

export const setSearchText = searchText => ({
    type: 'search/setSearchText',
    searchText
});

export const clearSearch = () => setSearchText('');

export const setJobs = jobs => ({
    type: 'jobs/set',
    jobs
});

export const setJobsLoading = isLoading => ({
    type: 'jobs/loading',
    isLoading
});

export const searchForJobsUsingSagas = () => ({
    type: 'jobs/search'
});

export const searchJobsWithFilter = () => {
    return async (dispatch, getState) => {
        dispatch(setJobsLoading(true));
        const activeFilters = getState().ui.activeFilters;
        const sortingModifiers = getState().ui.queryModifiers;
        let result = await fetch(`${server}/api/jobs`);
        result = await result.json();
        console.log(result);
        dispatch(setJobsLoading(result));
        // do network call to fetch all 
        dispatch(setJobsLoading(false));
    };
};
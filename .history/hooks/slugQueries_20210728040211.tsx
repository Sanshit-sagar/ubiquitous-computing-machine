import useSWR from 'swr'

export const useNewSlugInfo = () => {
    const { data, error } = useSWR('/api/slugs/new')

    return {
        data: data,
        dataLoading: !data && !error,
        dataError: error,
    }; 
}

export const useSlugDetails = (slug) => {
    const { data, error } = useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);

    return {
        details: data ? data.details : undefined,
        loading: !data && !error,
        error,
    }; 
}
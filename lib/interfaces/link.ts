
interface Link {
    id: string, 
    slug: string,
    destination: string,
    lastSeenAt: string,
    createdAt: string,
    ttl: string,
    encrypt: boolean,
    seo: string[],
    utm: string[],
    ipBlacklist: string[],
};

export interface A_B_Testing {
    url_A: string,
    url_B: string,
    ratio_A: number,
    ratio_B: number, 
    visits_A: number, 
    visits_B: number, 
};


export default Link

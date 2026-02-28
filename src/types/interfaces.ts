export interface ListingAttribute {
    key: string;
    value: string;
}

export interface ListingResponse {
    id: string;
    birdId: string;
    sellerId: number;
    priceAmount: number;
    priceCurrency: string;
    status: 'ACTIVE' | 'RESERVED' | 'SOLD' | 'PAUSED' | 'CANCELLED' | 'DRAFT';
    attributes: ListingAttribute[];
    createdAt: string;
    updatedAt: string;
}

export interface BirdResponse {
    id: string;
    ownerId: number;
    species: string;
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    birthDate: string;
    ringCode: string;
    status: string;
}

export interface Listing {
    id: string;
    sellerId: number;
    birdId: string;
    breed: string;
    mutations: string[];
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    birthDate: string;
    status: string;
    price: string;
    currency: string;
    createdAt: string;
}

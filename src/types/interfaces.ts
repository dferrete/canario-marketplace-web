export interface Listing {
    id: string;
    sellerId: number;
    birdId: string;
    breed: string;
    mutations: string[];
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    birthDate: string;
    status: 'ACTIVE' | 'RESERVED' | 'SOLD' | 'PAUSED' | 'CANCELLED';
    price: string;
    currency: string;
    createdAt: string;
}

import api from "@/lib/api";
import { Listing } from '@/types/interfaces';

export interface OrderItem {
    listingId: string;
    priceAmount: number;
    priceCurrency: string;
    quantity: number;
}

export interface UserOrder {
    id: string;
    buyerId: number;
    status: string;
    totalAmount: number;
    currency: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface UserListing {
    id: string;
    birdId: string;
    sellerId: number;
    price: {
        amount: number;
        currency: string;
    };
    status: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export const userService = {
    async getUserOrders(userId: number): Promise<UserOrder[]> {
        const response = await api.get(`/api/v1/orders/user/${userId}`);
        return response.data;
    },

    async getUserListings(userId: number): Promise<UserListing[]> {
        const response = await api.get(`/api/v1/listings/user/${userId}`);
        return response.data.map((item: any) => ({
            ...item,
            price: {
                amount: item.priceAmount || 0,
                currency: item.priceCurrency || 'BRL'
            }
        }));
    },

    async createBird(payload: { ownerId: number; species: string; gender: string; birthDate: string; ringCode: string }): Promise<any> {
        const response = await api.post('/api/v1/birds', payload);
        return response.data;
    },

    async createListing(payload: { birdId: string; sellerId: number; priceAmount: number; priceCurrency: string; attributes: { key: string; value: string }[] }): Promise<any> {
        const response = await api.post('/api/v1/listings', payload);
        return response.data;
    },

    async activateListing(listingId: string): Promise<void> {
        await api.post(`/api/v1/listings/${listingId}/activate`);
    },

    async pauseListing(listingId: string): Promise<void> {
        await api.post(`/api/v1/listings/${listingId}/pause`);
    },

    async cancelListing(listingId: string): Promise<void> {
        await api.post(`/api/v1/listings/${listingId}/cancel`);
    },

    async updateListing(listingId: string, payload: { priceAmount: number; priceCurrency: string; attributes: { key: string; value: string }[] }): Promise<any> {
        const response = await api.put(`/api/v1/listings/${listingId}`, payload);
        return response.data;
    },
    async getFavoriteListingIds(userId: number): Promise<string[]> {
        const response = await api.get(`/api/v1/listings/favorites/ids/user/${userId}`);
        return response.data;
    },

    async getUserFavoriteListings(userId: number): Promise<Listing[]> {
        const response = await api.get(`/api/v1/listings/favorites/user/${userId}`);
        return response.data.map((item: any) => ({
            id: item.id,
            sellerId: item.sellerId,
            birdId: item.birdId,
            breed: item.birdBreed || 'Ave',
            mutations: item.attributes?.map((a: any) => a.value) || [],
            gender: item.birdGender || 'UNKNOWN',
            birthDate: item.birdBirthDate || new Date().toISOString(),
            status: item.status,
            price: item.priceAmount?.toString() || '0',
            currency: item.priceCurrency || 'BRL',
            createdAt: item.createdAt
        }));
    },

    async favoriteListing(listingId: string, userId: number): Promise<void> {
        await api.post(`/api/v1/listings/${listingId}/favorite`, null, { params: { userId } });
    },

    async unfavoriteListing(listingId: string, userId: number): Promise<void> {
        await api.delete(`/api/v1/listings/${listingId}/favorite`, { params: { userId } });
    }
};

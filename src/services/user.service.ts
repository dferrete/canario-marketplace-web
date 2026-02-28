import api from "@/lib/api";

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
        return response.data;
    },

    async createBird(payload: { ownerId: number; species: string; gender: string; birthDate: string; ringCode: string }): Promise<any> {
        const response = await api.post('/api/v1/birds', payload);
        return response.data;
    },

    async createListing(payload: { birdId: string; sellerId: number; priceAmount: number; priceCurrency: string; attributes: { key: string; value: string }[] }): Promise<any> {
        const response = await api.post('/api/v1/listings', payload);
        return response.data;
    }
};

import api from "@/lib/api";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    avatarUrl?: string;
    role: "ROLE_USER" | "ROLE_ADMIN" | "ROLE_LOGISTICS" | "ROLE_VET";
    status: "ACTIVE" | "PENDING_APPROVAL" | "SUSPENDED" | "BLOCKED";
    rating: number;
    partnerDocumentType?: string;
    partnerDocumentNumber?: string;
}

export const adminService = {
    async getAllUsers(page: number = 0, size: number = 10, search?: string, role?: string, status?: string): Promise<{ content: UserResponse[], totalElements: number, totalPages: number }> {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString()
        });
        if (search) params.append('search', search);
        if (role && role !== 'ALL') params.append('role', role);
        if (status && status !== 'ALL') params.append('status', status);

        const response = await api.get(`/api/v1/users?${params.toString()}`);
        return response.data;
    },

    async approveUser(userId: number): Promise<UserResponse> {
        const response = await api.put(`/api/v1/users/${userId}/approve`);
        return response.data;
    },

    async suspendUser(userId: number): Promise<UserResponse> {
        const response = await api.put(`/api/v1/users/${userId}/suspend`);
        return response.data;
    },

    async blockUser(userId: number): Promise<UserResponse> {
        const response = await api.put(`/api/v1/users/${userId}/block`);
        return response.data;
    }
};

import api from "@/lib/api";

export interface LoginRequest {
    email: string;
    senha?: string;
    password?: string;
}

export interface RegisterRequest {
    nome: string;
    email: string;
    senha?: string;
    password?: string;
    telefone?: string;
    cpf?: string;
}

export interface UpdateUserRequest {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        telefone: string;
        cpf: string;
        avatarUrl?: string;
    };
}

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const payload = {
            email: data.email,
            password: data.senha || data.password,
        };
        const response = await api.post("/api/v1/auth/login", payload);
        return response.data;
    },

    // Registration now only returns User metadata without a token
    async register(data: RegisterRequest): Promise<any> {
        const payload = {
            name: data.nome,
            email: data.email,
            password: data.senha || data.password,
            cpf: data.cpf,
            phone: data.telefone
        };
        const response = await api.post("/api/v1/users", payload);
        return response.data;
    },

    async updateProfile(data: UpdateUserRequest): Promise<any> {
        const payload = {
            name: data.nome,
            email: data.email,
            cpf: data.cpf,
            phone: data.telefone
        };
        const response = await api.put(`/api/v1/users/${data.id}`, payload);
        return response.data;
    },

    async uploadAvatar(userId: number, file: File): Promise<any> {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post(`/api/v1/users/${userId}/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },
};

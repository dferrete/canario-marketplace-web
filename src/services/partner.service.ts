import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export interface PartnerApplicationData {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    role: "ROLE_VET" | "ROLE_LOGISTICS";
    documentType: "CRMV" | "ANTT" | "CNH" | "OUTRO";
    documentNumber: string;
    specialty?: string;
    vehicleDetails?: string;
    coverageArea?: string;
}

export const partnerService = {
    applyForPartnership: async (data: PartnerApplicationData) => {
        const response = await axios.post(`${API_URL}/partners/apply`, data);
        return response.data;
    },

    setupPassword: async (token: string, password: string) => {
        const response = await axios.post(`${API_URL}/partners/setup-password`, { token, password });
        return response.data;
    }
};

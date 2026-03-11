import api from "../lib/api";

export interface PartnerApplicationData {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    role: "ROLE_VET" | "ROLE_LOGISTICS";
    documentType: "CRMV" | "ANTT" | "CNH" | "OUTRO";
    documentNumber: string;
    servicesOffered?: string;
    vehicleDetails?: string;
    coverageArea?: string;
}

export const partnerService = {
    applyForPartnership: async (data: PartnerApplicationData) => {
        const response = await api.post("/api/v1/partners/apply", data);
        return response.data;
    },

    setupPassword: async (token: string, password: string) => {
        const response = await api.post("/api/v1/partners/setup-password", { token, password });
        return response.data;
    }
};

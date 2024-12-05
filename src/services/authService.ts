import api from "@/utils/api";

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });


    document.cookie = `token=${response.data.accessToken}; path=/;`;


    return response.data;
};
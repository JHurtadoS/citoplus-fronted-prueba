import api from "@/utils/api";


export interface UserResponse {
    id: string;
    name: string;
    roles: string[];
    is_active: boolean
}

interface userGetResponse {
    page: number
    total: number
    totalPages: number
    users: UserResponse[]
}

export interface CreateUserPayload {
    email: string;
    password: string;
    name: string;
    roles: string[];
}

export interface EditUserPayload {
    name: string;
    roles: string[];
}


export const availableRoles = ['Admin', 'Editor', 'Viewer'];


export const fetchUsers = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await api.get<userGetResponse>('/users', {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios');
    }
};

export const createUser = async (payload: CreateUserPayload) => {
    try {
        const response = await api.post('/users/create', payload);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('No se pudo crear el usuario');
    }
};


export const fetchUserById = async (id: string) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        throw new Error('No se pudo obtener el usuario');
    }
};


export const editUser = async (id: string, payload: EditUserPayload) => {
    try {
        const response = await api.patch(`/users/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error al editar usuario:', error);
        throw new Error('No se pudo editar el usuario');
    }
};

export const disableUser = async (id: string) => {
    try {
        const response = await api.patch(`/users/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error('Error al deshabilitar usuario:', error);
        throw new Error('No se pudo deshabilitar el usuario');
    }
};
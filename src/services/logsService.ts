/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/utils/api";

export interface LogEntry {
    id: string;
    user_id: string;
    target_id: string;
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details: any;
    created_at: string;
}

interface LogsGetResponse {
    page: number;
    total: number;
    totalPages: number;
    logs: LogEntry[];
}


export interface FetchLogsParams {
    page?: number;
    limit?: number;
}


export const fetchLogs = async (params: FetchLogsParams = { page: 1, limit: 10 }) => {
    try {
        const response = await api.get<LogsGetResponse>('/logs', {
            params,
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error al obtener logs:', error);
        throw new Error('No se pudieron obtener los logs');
    }
};


export interface LogActionPayload {
    user_id: string;
    target_id: string;
    action: string;
    details: any;
}

export const logAction = async (payload: LogActionPayload) => {
    try {
        const response = await api.post('/logs', payload);
        return response.data;
    } catch (error) {
        console.error('Error al registrar log:', error);
        throw new Error('No se pudo registrar el log');
    }
};

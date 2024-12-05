'use client';

import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { LogEntry, fetchLogs } from '@/services/logsService';
import LogDetails from './LogDetails';

const LogTable = () => {
    const [logs, setLogs] = React.useState<LogEntry[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const items = 10;
    const { toast } = useToast();

    const fetchLogData = async (currentPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchLogs({ page: currentPage, limit: items });
            console.log(data)
            setLogs(data.logs);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError('Error al cargar los logs.');
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los logs.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogData(1);
    }, []);

    if (loading) return <p>Cargando logs...</p>;
    if (error) return <p>{error}</p>;

    console.log(logs)

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Acción</TableHead>
                        <TableHead>Detalles</TableHead>
                        <TableHead>Fecha</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.id}</TableCell>
                            <TableCell>{log.user_id}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>
                                {/* <pre className="text-sm">{JSON.stringify(log.details, null, 2)}</pre> */}
                                <LogDetails json={log.details} />
                            </TableCell>
                            <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => page > 1 && fetchLogData(page - 1)}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => fetchLogData(i + 1)}
                                    className={page === i + 1 ? 'bg-blue-500 text-white' : ''}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => page < totalPages && fetchLogData(page + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default LogTable;

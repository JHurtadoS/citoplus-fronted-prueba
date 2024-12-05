'use client';

import React, { useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { disableUser, editUser, UserResponse } from '@/services/userService';
import RoleBadge from '@/components/RoleBadge';

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
    PaginationEllipsis,
} from '@/components/ui/pagination';
import EditUserDialog from './forms/EditUserForm';
import { useToast } from '@/hooks/use-toast';

const UserTable = () => {
    const { users, loading, error, page, totalPages, fetchUserPage } = useDashboard();
    const { toast } = useToast();
    const items = 10;

    const handleDisable = async (id: string) => {
        if (confirm('¿Estás seguro de que deseas deshabilitar este usuario?')) {
            try {
                await disableUser(id);
                toast({
                    title: 'Usuario deshabilitado',
                    description: 'El usuario fue deshabilitado exitosamente.',
                });
                fetchUserPage(page, items);
            } catch (err) {
                console.error(err)

                toast({
                    title: 'Error',
                    description: 'No se pudo deshabilitar el usuario.',
                    variant: 'destructive',
                });
            }
        }
    };

    const handleSave = async (updatedUser: UserResponse) => {
        try {
            await editUser(updatedUser.id, {
                name: updatedUser.name,
                roles: updatedUser.roles,
            });
            toast({
                title: 'Usuario actualizado',
                description: 'Los cambios se guardaron correctamente.',
            });
            fetchUserPage(page, items);
        } catch (err) {
            console.error(err)
            toast({
                title: 'Error',
                description: 'No se pudo actualizar el usuario.',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchUserPage(1, items);
    }, [fetchUserPage]);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.is_active ? 'Activo' : 'Desactivado'}</TableCell>
                            <TableCell>
                                <RoleBadge roles={user.roles} />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <EditUserDialog user={user} onSave={handleSave} />
                                    <button
                                        onClick={() => handleDisable(user.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Deshabilitar
                                    </button>
                                </div>
                            </TableCell>
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
                                onClick={() => page > 1 && fetchUserPage(page - 1, items)}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => fetchUserPage(i + 1, items)}
                                    className={page === i + 1 ? 'bg-blue-500 text-white' : ''}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {page < totalPages && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => page < totalPages && fetchUserPage(page + 1, items)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default UserTable;

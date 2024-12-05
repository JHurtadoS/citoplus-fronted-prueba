'use client';

import React from 'react';
import { availableRoles, UserResponse } from '@/services/userService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

interface EditUserDialogProps {
    user: UserResponse;
    onSave: (updatedUser: UserResponse) => void;
}


const editUserSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    roles: z.array(z.string()).min(1, 'Debe seleccionar al menos un rol'),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, onSave }) => {


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: user.name,
            roles: user.roles,
        },
    });

    const onSubmit = (data: EditUserFormValues) => {
        const updatedUser = {
            ...user,
            name: data.name,
            roles: data.roles,
        };
        onSave(updatedUser);
    };



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-blue-500 hover:underline">Editar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Usuario</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Campo de Nombre */}
                    <div>
                        <Input
                            placeholder="Nombre"
                            {...register('name')}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    {/* Select para Roles */}
                    <div>
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        const currentRoles = field.value || [];
                                        if (currentRoles.includes(value)) {

                                            field.onChange(currentRoles.filter((role) => role !== value));
                                        } else {

                                            field.onChange([...currentRoles, value]);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <Button className="w-full bg-gray-100 text-black">
                                            {field.value?.length
                                                ? field.value.join(', ')
                                                : 'Seleccionar Roles'}
                                        </Button>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableRoles.map((role) => (
                                            <SelectItem
                                                key={role}
                                                value={role}
                                                className={field.value?.includes(role) ? 'bg-blue-500 text-white' : ''}
                                            >
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
                            Guardar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;

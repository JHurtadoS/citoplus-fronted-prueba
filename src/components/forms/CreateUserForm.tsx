'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { availableRoles, createUser } from '@/services/userService';
import { useDashboard } from '@/context/DashboardContext';
import { useToast } from '@/hooks/use-toast';

const createUserSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Correo inválido'),
    roles: z.array(z.string()).min(1, 'Debe seleccionar al menos un rol'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;


const CreateUserDialog = () => {
    const { fetchUserPage } = useDashboard();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
    });

    const onSubmit = async (data: CreateUserFormValues) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            await createUser({
                name: data.name,
                email: data.email,
                roles: data.roles,
                password: data.password,
            });


            toast({
                title: "Usuario creado con éxito",
                description: "success",
            })

            reset();
            fetchUserPage(1, 10);
        } catch (error) {

            toast({
                title: "Error al crear el usuario",
                description: "Error",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Usuario</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input placeholder="Nombre" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Input type="email" placeholder="Correo Electrónico" {...register('email')} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        const currentRoles = field.value || [];
                                        if (currentRoles.includes(value)) {

                                            field.onChange(currentRoles.filter((role: string) => role !== value));
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
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            {...register('password')}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    <div className="flex justify-end gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-500 text-white hover:bg-green-600"
                        >
                            {isSubmitting ? 'Creando...' : 'Crear'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Introduce un correo válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();


    const router = useRouter();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await login(data.email, data.password);
            console.log('Inicio de sesión exitoso:', response);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="example@correo.com"
                    {...register('email')}
                    className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register('password')}
                    className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
        </form>
    );
};

export default LoginForm;

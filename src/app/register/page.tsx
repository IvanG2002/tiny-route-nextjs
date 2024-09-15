"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const [usernameError, setUsernameError] = useState(true);

    const router = useRouter();

    useEffect(() => {
        // Validar si el email es no vacío y si es un email válido
        if (email.length === 0 || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (password.length === 0) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        // Validar el username: entre 5 y 8 caracteres, una mayúscula, una minúscula y un dígito
        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,8}$/;
        if (!usernameRegex.test(username)) {
            setUsernameError(true); // Asegúrate de tener este estado en el componente
        } else {
            setUsernameError(false);
        }

        // Validar el password: entre 5 y 10 caracteres, al menos una mayúscula y un símbolo
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [email, password, username]);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Enviar una solicitud de inicio de sesión a tu API
            const response = await fetch('https://tiny-route-app.vercel.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful');
                toast.info("Register successful");
                setEmail("")
                setPassword("")
                setUsername("")
                setTimeout(() => {
                    router.push('/auth');
                }, 1500);
            } else {
                // Manejar errores de autenticación
                console.error(data.error);
                toast.error("An unexpected error has occurred. Please try again later.", {
                    description: data.error || 'An unexpected error occurred',
                });
            }
        } catch (error: unknown) {
            console.error('Error during login:', error);
            toast.error("An unexpected error has occurred. Please try again later.", {
                description: 'An unexpected error occurred',
            });
        }
    };

    return (
        <main className="login__main flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="flex flex-col text-center">
                    <CardTitle className="text-4xl">🔗SignUp</CardTitle>
                    <CardDescription className="text-xl">Start and Manage your links.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex gap-4 flex-col" onSubmit={handleRegister}>
                        <div className='flex flex-col'>
                            <Input
                                required
                                type='text'
                                placeholder='Type your username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && <p className='text-red-600 text-sm pl-2'>Invalid username</p>}
                            <ul className='pl-4 ml-4 pt-2 mt-1 border-l-2 border-[#cecece]'>
                                <li className='text-[10px]'>Minimo una mayuscula</li>
                                <li className='text-[10px]'>Minimo una minuscula</li>
                                <li className='text-[10px]'>Minimo un digito</li>
                                <li className='text-[10px]'>Sin ningun simbolo</li>
                                <li className='text-[10px]'>Longitud minima de 5 y maxima de 8</li>
                            </ul>
                        </div>
                        <div className='flex flex-col'>
                            <Input
                                required
                                type='email'
                                placeholder='Type your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className='text-red-600 text-sm pl-2'>Invalid email address</p>}
                        </div>
                        <div className='flex flex-col'>
                            <Input
                                required
                                type='password'
                                placeholder='Type your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className='text-red-600 text-sm pl-2'>Invalid password</p>}
                            <ul className='pl-4 ml-4 pt-2 mt-1 border-l-2 border-[#cecece]'>
                                <li className='text-[10px]'>Minimo una mayuscula</li>
                                <li className='text-[10px]'>Minimo una minuscula</li>
                                <li className='text-[10px]'>Minimo un digito</li>
                                <li className='text-[10px]'>Longitud minima de 5 y maxima de 8</li>
                            </ul>
                        </div>
                        <Button variant={"outline"} className="flex items-center p-5 gap-3">
                            <span>Sign Up</span>
                        </Button>
                        <Link href="/auth"><u>Go back to login</u></Link>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
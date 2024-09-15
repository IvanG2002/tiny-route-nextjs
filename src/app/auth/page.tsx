"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "sonner"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {

  const { login } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const router = useRouter()

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
  }, [email, password]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Enviar una solicitud de inicio de sesión a tu API
      const response = await fetch('https://tiny-route-app.vercel.app/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el usuario en el estado y en localStorage
        login({ id: data.__id, name: '', email: data.email }); // Ajusta los datos del usuario según tu respuesta
        localStorage.setItem('user', JSON.stringify({ id: data.__id, email: data.__email, name: data.__name }));
        // Redirigir o hacer algo después de un inicio de sesión exitoso
        console.log('Login successful');
        setEmail("")
        setPassword("")
        router.push("/dashboard")

      } else {
        // Manejar errores de autenticación
        console.error(data.error);
        setEmail("")
        setPassword("")
        toast.error("An unexpected error has occurred. Please try again later.", {
          description: data.error || 'An unexpected error occurred',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setEmail("")
      setPassword("")
      toast.error("An unexpected error has occurred. Please try again later.", {
        description: 'An unexpected error occurred',
      });
    }
  };

  return (
    <main className="login__main flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col text-center">
          <CardTitle className="text-4xl">🔗Login</CardTitle>
          <CardDescription className="text-xl">Start and Manage your links.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-4 flex-col" onSubmit={handleLogin}>
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
              {passwordError && <p className='text-red-600 text-sm pl-2'>Please enter your password</p>}
            </div>
            <Button type="submit" className="flex items-center p-5 gap-3">
              <span>Login</span>
            </Button>
            <Link href="/register">
              <Button variant={"outline"} className="flex items-center p-5 gap-3">
                <span>Sign Up</span>
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;

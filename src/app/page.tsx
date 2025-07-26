'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-forest-green font-semibold">Redirigiendo...</div>
    </div>
  );
}

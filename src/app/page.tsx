'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useAuth';

const NEXT_REDIRECT = '/dashboard';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const loginMutation = useLogin();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          const token = data?.data?.token;
          if (!token) {
            setError('Token tidak ditemukan');
            return;
          }
          localStorage.setItem('hublang_token', token);
          localStorage.setItem('hublang_user', JSON.stringify(data.data.user));
          try {
            const isHttps =
              typeof window !== 'undefined' &&
              window.location?.protocol === 'https:';
            document.cookie = `hublang_token=${token}; Path=/; Max-Age=${
              30 * 24 * 60 * 60
            }; SameSite=Lax${isHttps ? '; Secure' : ''}`;
          } catch {}
          router.push(NEXT_REDIRECT);
        },
        onError: (err) => {
          setError(err.message || 'Login gagal');
        },
      },
    );
  }

  return (
    <main className='min-h-dvh w-full grid place-items-center px-4'>
      <div className='w-full max-w-sm'>
        <Card className='shadow-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>Login Hublang</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='admin1'
                  autoComplete='username'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••'
                  autoComplete='current-password'
                  required
                />
              </div>
              {error && (
                <p className='text-sm text-red-600' role='alert'>
                  {error}
                </p>
              )}
              <Button
                type='submit'
                className='w-full'
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Memproses…' : 'Masuk'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

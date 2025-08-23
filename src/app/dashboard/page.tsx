import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function DashboardPage() {
  const cards = [
    {
      key: 'keuangan',
      title: 'KEUANGAN',
      href: undefined,
      desc: 'Modul keuangan (coming soon)',
    },
    {
      key: 'hub-pelanggan',
      title: 'HUBUNGAN PELANGGAN',
      href: '/penerimaan',
      desc: 'Masuk ke dashboard hubungan pelanggan',
    },
    {
      key: 'test',
      title: 'TEST',
      href: undefined,
      desc: 'Area percobaan (coming soon)',
    },
  ];

  return (
    <main className='min-h-dvh w-full px-4 py-10 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <ModeToggle />
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {cards.map((c) => {
            const CardInner = (
              <Card
                className={`group relative h-full cursor-${
                  c.href ? 'pointer' : 'default'
                } overflow-hidden transition hover:shadow-md ${
                  c.href ? 'hover:border-primary' : 'opacity-70'
                }`}
              >
                <CardHeader>
                  <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                    {c.title}
                    {!c.href && (
                      <span className='rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'>
                        Soon
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {c.desc}
                  </p>
                  {c.href && (
                    <span className='pointer-events-none absolute inset-0 block border-2 border-transparent group-hover:border-primary/40 rounded-lg' />
                  )}
                </CardContent>
              </Card>
            );

            return c.href ? (
              <Link
                key={c.key}
                href={c.href}
                className='block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg'
              >
                {CardInner}
              </Link>
            ) : (
              <div key={c.key}>{CardInner}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

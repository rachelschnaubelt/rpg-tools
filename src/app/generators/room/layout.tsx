import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Room Generator | RPG Tools',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

    return (
        <>
            {children}
        </>
    )
}
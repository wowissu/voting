import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import ThemeRegistry from './ThemeRegistry'
import '@fontsource/public-sans';
import cx from 'classnames';

// const inter = Inter({ subsets: ['latin'] })
const inter = { className: "" }

export const metadata: Metadata = {
  title: 'TJA',
  description: 'The Juqilin Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx("max-w-screen overflow-x-hidden", inter.className)}>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}

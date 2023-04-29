import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat'
})

const bebas = localFont({
  src: [
    {
      path: './bebasneue-book-webfont.woff'
    },
    {
      path: './bebasneue-book-webfont.woff2'
    }
  ],
  weight: '400',
  variable: '--font-bebas'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
          --font-bebas: ${bebas.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import type { AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default api.withTRPC(MyApp)

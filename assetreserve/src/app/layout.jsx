import "./globals.css";

import { Header } from '@/componentes/header/header'
import { Footer } from '@/componentes/footer/footer'


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        <Header/>

        {children}

        <Footer/>
        
      </body>
    </html>
  );
}

import "./globals.css";

import { Header } from '../componentes/header'
import { Footer } from '../componentes/footer'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
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

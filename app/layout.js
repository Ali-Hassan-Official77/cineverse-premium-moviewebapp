import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppProviders from "@/components/AppProviders";
export const metadata={title:"Cineverse — The Movie Universe",description:"Discover movies, series and stories worth watching.",icons:{icon:"/cineverse-icon.png"}};
export default function RootLayout({children}){return <html lang="en" data-theme="dark"><body className="min-h-screen"><AppProviders><Navbar/><main>{children}</main><Footer/></AppProviders></body></html>}

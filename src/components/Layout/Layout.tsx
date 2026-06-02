import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode; // konten halaman yang dibungkus
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      {/* pt-16 = padding top untuk kompensasi navbar fixed */}
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}

import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Worddee.ai',
  description: 'Learn English with AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-64px)] p-6 bg-[#f8f9fc]">
            {children}
        </main>
      </body>
    </html>
  );
}
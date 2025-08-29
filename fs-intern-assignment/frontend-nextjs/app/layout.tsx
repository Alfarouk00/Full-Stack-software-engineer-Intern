import './globals.css';
import AuthButton from '../components/AuthButton';

export const metadata = {
  title: 'Items App',
  description: 'Simple Next.js client for Spring Boot API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="max-w-3xl mx-auto p-6">
          <nav className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-semibold">
              ItemsApp
            </a>
            <div className="space-x-4">
              <AuthButton />
              <a className="underline" href="/items">
                Items
              </a>
            </div>
          </nav>
          <main className="mt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

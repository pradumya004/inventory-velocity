// client/src/app/layout.js

import "./globals.css";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export const metadata = {
  title: "Inventory Velocity | Enterprise v1.0",
  description: "High-fidelity logistics and stock aging management system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <Sidebar />
        <main className="flex-1 ml-72 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          <Header />
          <div className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
       <main>
        <Outlet />
       </main>
      <Footer />
    </div>
  );
};

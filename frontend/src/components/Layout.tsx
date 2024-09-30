import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

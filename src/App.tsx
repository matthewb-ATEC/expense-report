import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <Nav/>
      <Home />
      <Footer />
    </div>
  );
}

export default App;

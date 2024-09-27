import Header from "./components/Header";
import ExpenseReport from "./components/ExpenseReport";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ExpenseReport />
      <Footer />
    </div>
  );
}

export default App;

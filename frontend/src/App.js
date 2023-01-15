import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Context
import { ContextProvider } from "./context/AppContext";

// Pages
import Search from "./pages/search/Search";
import Watch from "./pages/watch/Watch";
import Fav from "./pages/fav/Fav";
import Login from "./pages/login/Login";

// Components
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/searchbar/SearchBar";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <SearchBar />
        <main className="py-16">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/fav" element={<Fav />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Navbar />
      </Router>
    </ContextProvider>
  );
};

export default App;

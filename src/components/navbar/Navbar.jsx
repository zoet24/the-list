import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiFillEye, AiFillHeart } from "react-icons/ai";

function Navbar() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <nav className="navbar">
      <Link
        className={`icon ${activeLink === "/" ? "icon--active" : ""}`}
        to={"/"}
      >
        <AiOutlineSearch />
      </Link>
      <Link
        className={`icon ${activeLink === "/watch" ? "icon--active" : ""}`}
        to={"/watch"}
      >
        <AiFillEye />
      </Link>
      <Link
        className={`icon ${activeLink === "/fav" ? "icon--active" : ""}`}
        to={"/fav"}
      >
        <AiFillHeart />
      </Link>
    </nav>
  );
}
export default Navbar;

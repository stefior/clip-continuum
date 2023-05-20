import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar" className="flex items-center">
      <a href="/" className="flex items-center">
        <img src="./logo.png" alt="Code Continuum logo" className="h-12 select-none" />
        <h1 className="text-2xl font-title select-none">Code Continuum</h1>
      </a>
      <div className="ml-auto p-4 font-title text-sm">
        <Link to="/tutorial" className="ml-4 hover:underline">
          Tutorial
        </Link>
        <Link to="/advanced-settings" className="ml-4 hover:underline">
          Advanced Settings
        </Link>
        <Link to="/about" className="ml-4 hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

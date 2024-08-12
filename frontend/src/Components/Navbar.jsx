import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-red-600 text-2xl font-bold font-serif">
          <Link to="/">TUF+</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300 border-2 border-white border-transparent hover:border-red-600 px-4 py-2 rounded-md">
            Quiz
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300 border-2 border-white border-transparent hover:border-red-600 px-4 py-2 rounded-md">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#f1e7d4] text-black rounded-b-2xl shadow-md">
      <div className="flex space-x-6 font-semibold text-sm">
        <a href="#">Home</a>
        <a href="#">College Predictor</a>
        <a href="#">Contact us</a>
        <a href="#">About us</a>
      </div>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-full transition duration-300">
        Login/Register
      </button>
    </nav>
  );
}

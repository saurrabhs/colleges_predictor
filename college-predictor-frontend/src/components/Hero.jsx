// src/components/Hero.jsx
import heroImg from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-10 bg-[#f1e7d4] min-h-[80vh]">
      {/* Left Text */}
      <div className="max-w-lg text-center lg:text-left space-y-6">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-black">
          Explore!
          <br />
          Dream.
          <br />
          Achieve.
        </h1>
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full transition duration-300">
          Predict My College
        </button>
      </div>

      {/* Right Image */}
      <img
        src={heroImg}
        alt="Hero"
        className="w-[80%] lg:w-[50%] mb-10 lg:mb-0"
      />
    </section>
  );
}

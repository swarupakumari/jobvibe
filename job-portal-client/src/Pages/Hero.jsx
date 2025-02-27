// src/components/Hero.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <section
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-center text-white"
      style={{ backgroundImage: 'url("https://via.placeholder.com/1500x800")' }} // Add your background image here
    >
      {/* Auth0 Login Button in the top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Login
          </button>
        ) : (
          <span className="text-white">Welcome back!</span>
        )}
      </div>

      {/* Hero Section Content */}
      <div className="max-w-xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job Today</h1>
        <h4 className="text-xl mb-6">
          Connecting Talent with Opportunities Across the Nation for Every Skill
          Level
        </h4>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <p className="text-lg">
            Explore a vast array of job listings in diverse industries. Whether
            you're a seasoned professional or just starting out, find the perfect
            role to advance your career. Our platform makes job searching easy and
            efficient, bringing you closer to your next big opportunity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

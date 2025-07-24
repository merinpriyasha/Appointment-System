import React, { useRef }from "react";
import Layout from "./../components/Layout";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePage = () => {

   const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-blue-100 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-[#204C41] mb-4">
          Find the Right Freelancer for Your Project
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          SkillSync helps you discover top-rated professionals ready to work on your ideas.
        </p>
        <Link
          to="/freelancers"
          className="bg-[#204C41] text-white px-6 py-3 rounded-md hover:bg-green-900 transition"
        >
          Browse Freelancers
        </Link>
      </section>

      {/* Top 10 Freelancers Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 py-12 relative">
        <h3 className="text-2xl font-semibold text-[#204C41] mb-6">Top Freelancers</h3>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronLeft className="text-[#204C41]" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronRight className="text-[#204C41]" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scroll-smooth scrollbar-hide"
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="min-w-[250px] flex-shrink-0 bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="h-24 w-24 rounded-full mx-auto bg-gray-200 mb-4"></div>
              <h4 className="text-lg font-semibold text-center text-[#204C41]">
                Freelancer {i + 1}
              </h4>
              <p className="text-center text-gray-600">Speciality Here</p>
              <div className="text-center mt-3">
                <button className="text-sm text-white bg-[#204C41] px-4 py-2 rounded hover:bg-green-900">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>  );
};

export default HomePage;

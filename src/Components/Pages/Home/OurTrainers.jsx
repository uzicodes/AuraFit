import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Trainer from "./Trainer";
import Link from "next/link";
import { FaArrowRight, FaDumbbell, FaStar } from "react-icons/fa";

const OurTrainers = () => {
  const axiosPublic = useAxiosPublic();

  // fetched the trainers data using tenstack
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#16A34A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#22C55E] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaDumbbell className="text-sm" />
            Expert Team
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              Trainers
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet our certified fitness professionals who are dedicated to
            helping you achieve your health and wellness goals.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {trainers.slice(0, 3).map((trainer) => (
            <div key={trainer._id}>
              <Trainer trainer={trainer} />
              
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/allTrainers">
            <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803D] hover:to-[#16A34A] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#16A34A]/25">
              View All Trainers
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurTrainers;


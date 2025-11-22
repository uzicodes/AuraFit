import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/testimonials`);
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#16A34A]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#16A34A]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              Clients
            </span>{" "}
            Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our amazing community has to say about their transformation journey.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 h-full">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-[#16A34A] text-lg" />
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonial.testimonial}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#16A34A]/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#16A34A] rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-button-prev-custom w-12 h-12 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg">
              ←
            </button>
            <button className="swiper-button-next-custom w-12 h-12 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg">
              →
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background: #16A34A;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
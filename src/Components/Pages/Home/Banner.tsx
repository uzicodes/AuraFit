import Link from "next/link";
import bannerPic from "../../../assets/Contact.png";
import { FaPlay, FaStar } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerPic})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent dark:from-black/80 dark:via-black/60"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#16A34A]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#16A34A]/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#16A34A]/30 rounded-full animate-ping"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#16A34A]/20 backdrop-blur-sm border border-[#16A34A]/30 rounded-full px-4 py-2 mb-6">
            <FaStar className="text-[#16A34A] text-sm" />
            <span className="text-white text-sm font-medium">
              Trusted by 10,000+ Fitness Enthusiasts
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Only Limit is {" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              You !
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your fitness journey with our cutting-edge tracker. Stay
            motivated, monitor progress, and achieve greatness every single day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/allClasses">
              <button className="group relative bg-[#16A34A] hover:bg-[#15803D] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#16A34A]/25">
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="https://youtu.be/Sm8O9Lcnr7o?si=-xBc7pWkuUAgAnU1" target="_blank">
              <button className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-[#16A34A] transition-colors duration-300">
                  <FaPlay className="text-sm ml-1" />
                </div>
                Watch Demo
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                10K+
              </div>
              <div className="text-gray-300 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                50+
              </div>
              <div className="text-gray-300 text-sm">Workout Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                24/7
              </div>
              <div className="text-gray-300 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;


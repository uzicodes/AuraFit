import Link from "next/link";
import useAllClasses from "../../hooks/useAllClasses";
import ClassCard from "../AllClasses/ClassCard";
import { FaArrowRight, FaFire, FaClock, FaUsers } from "react-icons/fa";

const AllClassesHome = () => {
  const [classes, isLoading] = useAllClasses();

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 md:h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#16A34A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#22C55E] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <FaFire className="text-xs md:text-sm" />
            Popular Classes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 px-2">
            All{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              Classes
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Discover our comprehensive range of fitness classes designed to challenge, inspire, and transform your body and mind.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* <div className="bg-gradient-to-br from-[#16A34A] to-[#22C55E] rounded-2xl p-4 md:p-6 text-white text-center">
            <FaUsers className="text-2xl md:text-3xl mx-auto mb-2" />
            <div className="text-xl md:text-2xl font-bold">50+</div>
            <div className="text-xs md:text-sm opacity-90">Classes</div>
          </div> */}
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-4 md:p-6 text-center shadow-lg text-white hover:shadow-xl hover:shadow-blue-200 transition-all duration-300">
            <FaClock className="text-2xl md:text-3xl mx-auto mb-2" />
            <div className="text-xl md:text-2xl font-bold">24/7</div>
            <div className="text-xs md:text-sm opacity-90">Access</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 md:p-6 text-center shadow-lg text-white hover:shadow-xl hover:shadow-purple-200 transition-all duration-300">
            <FaFire className="text-2xl md:text-3xl mx-auto mb-2" />
            <div className="text-xl md:text-2xl font-bold">1000+</div>
            <div className="text-xs md:text-sm opacity-90">Members</div>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 md:p-6 text-white text-center shadow-lg hover:shadow-xl hover:shadow-orange-200 transition-all duration-300">
            <div className="text-xl md:text-2xl font-bold">⭐</div>
            <div className="text-xl md:text-2xl font-bold">4.9</div>
            <div className="text-xs md:text-sm opacity-90">Rating</div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {classes.slice(0, 6).map((singleClass) => (
            <div key={singleClass._id} className="group transform hover:scale-105 transition-all duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#16A34A]/10 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                <ClassCard singleClass={singleClass} />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/allClasses">
            <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803D] hover:to-[#16A34A] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#16A34A]/25">
              View All Classes
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllClassesHome;

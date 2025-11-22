import { useEffect, useState } from "react";
import dashImg from "../../../assets/undraw_dashboard_re_3b76.svg";
import { FaDumbbell, FaChartLine, FaCalendarAlt, FaUserFriends, FaHome, FaUtensils, FaAddressBook, FaRegUser, FaCalendar, FaDAndD, FaBolt, FaFire } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import useRole from "../../hooks/useRole";
import useAuthContext from "../../hooks/useAuthContext";
import { trainerLinks, memberLinks, adminLinks } from './Links';
const MainDash = () => {
  const [greeting, setGreeting] = useState("");
  const [role, isRoleLoading] = useRole();
  const { user } = useAuthContext();



  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);


  // Determine which links to show based on user role
  const getNavLinks = () => {
    if (role === "Admin") return adminLinks;
    if (role === "member") return memberLinks;
    if (role === "Trainer") return trainerLinks;
    return [];
  };

  return (
    <div className="w-full px-3 py-6 md:px-6 md:py-12 transition-all duration-300 bg-gradient-to-b from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header Section - Vibrant design with primary color */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 rounded-2xl shadow-xl overflow-hidden mb-8 border border-green-400 dark:border-green-500 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-3 animate-pulse">
                <span className="inline-block w-2 h-2 rounded-full bg-green-300 mr-2 animate-ping"></span>
                {greeting}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Welcome, <span className="text-green-200">{user?.displayName || 'Fitness Enthusiast'}</span>
              </h1>
              <p className="mt-2 text-green-100 max-w-lg text-sm md:text-base">
                Track your fitness journey, monitor progress, and achieve your goals with our comprehensive dashboard.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="px-4 py-2 bg-white text-green-600 rounded-full font-medium hover:bg-green-50 transition-all duration-300 text-sm flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <FaBolt className="text-yellow-500" /> Quick Start
                </button>
                <button className="px-4 py-2 bg-green-700 text-white rounded-full font-medium hover:bg-green-800 transition-all duration-300 text-sm flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <FaFire className="text-orange-400" /> Today's Challenge
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                className="w-48 md:w-full max-w-xs object-contain transition-all duration-500 hover:scale-110 drop-shadow-2xl animate-float"
                src={dashImg}
                alt="Dashboard Illustration"
              />
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500"></div>
        </div>

        {/* Role-based Navigation Cards - Colorful design */}
        {!isRoleLoading && role && (
          <div className="my-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 border-green-500 dark:border-green-400 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded-full mr-2 inline-block"></span>
              {role === "Admin" ? "Admin Controls" : role === "member" ? "Member Options" : "Trainer Tools"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {getNavLinks().map((link, index) => (
                <Link
                  key={index}
                  href={link.to}
                  className="flex items-center p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-700 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-gray-600 dark:hover:to-gray-600 transition-all duration-300 group shadow-sm hover:shadow-md border-l-2 border-transparent hover:border-green-500"
                >
                  <div className="p-2 md:p-3 rounded-full bg-green-500 text-white group-hover:bg-green-600 transition-all duration-300 transform group-hover:rotate-6">
                    {link.icon}
                  </div>
                  <span className="ml-3 font-medium text-gray-700 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-white transition-all duration-300 text-sm md:text-base">
                    {link.text}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions - Colorful buttons with animations */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg overflow-hidden border border-green-200 dark:border-green-900 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
            <div className="w-1.5 h-6 bg-green-500 rounded-full mr-2"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: 'Start Workout', icon: <FaDumbbell className="text-blue-500" />, color: 'from-green-400 to-green-600' },
              { name: 'View Progress', icon: <FaChartLine className="text-red-500" />, color: 'from-blue-400 to-blue-600' },
              { name: 'Nutrition Plan', icon: <FaUtensils className="text-green-500" />, color: 'from-orange-400 to-orange-600' },
              { name: 'Join Challenge', icon: <FaFire className="text-orange-500" />, color: 'from-red-400 to-red-600' }
            ].map((action, i) => (
              <button
                key={i}
                className={`py-4 px-3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 hover:bg-gradient-to-r ${action.color} hover:text-white rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 text-sm shadow-md hover:shadow-lg group transform hover:-translate-y-1`}
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-all duration-300 ">{action.icon}</div>
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDash;

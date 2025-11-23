import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Star, ArrowRight, Play, Clock, BookOpen } from "lucide-react";

/* eslint-disable react/prop-types */
const ClassCard = ({ singleClass }) => {
  const [teachers, setTeachers] = useState([]);

  // destructuring the class
  const { picLink, category, description, classname } = singleClass;

  const axiosPublic = useAxiosPublic();
  
  const { data: classTrainer = [] } = useQuery({
    queryKey: ["classTrainer", category],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classTrainer/${category}`);
      return res.data;
    },
  });

  // set the fetched data in useState
  useEffect(() => {
    setTeachers(classTrainer);
  }, [classTrainer]);

  // Category color mapping with added green color (#16A34A)
  const getCategoryStyles = (category) => {
    const categoryColors = {
      "yoga": "from-purple-500 to-pink-500",
      "fitness": "from-blue-500 to-cyan-500", 
      "cardio": "from-red-500 to-orange-500",
      "strength": "from-green-600 to-green-500", // Updated to use more green tones
      "dance": "from-pink-500 to-rose-500",
      "pilates": "from-indigo-500 to-purple-500",
      "default": "from-green-600 to-emerald-500" // Changed default to green theme
    };
    return categoryColors[category?.toLowerCase()] || categoryColors.default;
  };

  return (
    <div className="group relative w-full" style={{ height: '680px' }}> {/* Fixed height for consistent sizing */}
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full transform hover:-translate-y-2 hover:scale-[1.02]">
        
        {/* Animated Background Gradient with enhanced opacity */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryStyles(category)} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
        
        {/* Image Container with Enhanced Overlay - Fixed height */}
        <div className="relative overflow-hidden rounded-t-3xl flex-shrink-0" style={{ height: '240px' }}>
          <div className="h-full overflow-hidden relative">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              src={picLink} 
              alt={classname}
            />
            
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryStyles(category)} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`}></div>
            
            {/* Play Button Overlay with enhanced green glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(22,163,74,0.5)]">
                <Play size={24} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Enhanced Category Badge with green accent */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`relative px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryStyles(category)} shadow-lg backdrop-blur-sm border border-white/10`}>
              <span className="text-sm font-bold text-white tracking-wide uppercase">
                {category}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Stats Badge with green accent */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-green-500/20">
              <Clock size={14} className="text-green-400" />
              <span className="text-xs text-white font-medium">45 min</span>
            </div>
          </div>
        </div>

        {/* Content Container - Fixed height for consistent sizing */}
        <div className="p-6 sm:p-6 space-y-4 flex-1 flex flex-col relative z-10" style={{ height: '410px' }}>
          {/* Title Section with fixed height */}
          <div className="flex-shrink-0 space-y-2" style={{ height: '80px' }}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 leading-tight">
              {classname}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <BookOpen size={16} className="text-green-600" />
              <span>Professional Training</span>
            </div>
          </div>

          {/* Teachers Section with fixed height */}
          <div className="space-y-4 flex-1 flex flex-col" style={{ height: '120px' }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">
              <div className={`p-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500`}>
                <Users size={16} className="text-white" />
              </div>
              <span>Expert Instructors</span>
            </div>
            
            {/* Enhanced Teacher Avatars */}
            <div className="flex items-center justify-between flex-1">
              <div className="flex -space-x-3">
                {teachers.slice(0, 4).map((teacher) => (
                  <Link key={teacher._id} href={`/trainerDetails/${teacher._id}`}>
                    <div className="relative group/avatar">
                      <div className={`w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-green-600 to-emerald-500 group-hover/avatar:scale-110 transition-transform duration-300`}>
                        <img
                          className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-lg"
                          src={teacher.pic}
                          alt={teacher.name}
                        />
                      </div>
                      {/* Enhanced Tooltip with green theme */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-xl border border-green-500/30">
                        <div className="font-medium text-white bg-green-600 px-2 py-0.5 rounded -mx-2 -mt-1 mb-1">{teacher.name}</div>
                        <div className="text-green-400 text-[10px]">Expert Trainer</div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-green-500/30"></div>
                      </div>
                    </div>
                  </Link>
                ))}
                {teachers.length > 4 && (
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800`}>
                    <span className="text-sm font-bold text-white">
                      +{teachers.length - 4}
                    </span>
                  </div>
                )}
              </div>

              {/* Enhanced Rating with green accent */}
              <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-full border border-green-200 dark:border-green-800/30">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < 4 ? 'text-green-500 fill-current' : 'text-gray-300'} transition-colors duration-200`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">4.9</span>
              </div>
            </div>
          </div>

          {/* Enhanced Action Section with fixed height */}
          <div className="pt-4 flex-shrink-0 mt-auto space-y-3" style={{ height: '100px' }}>
            {/* Price/Duration Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available Now</span>
              </div>
              <div className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Free Trial
              </div>
            </div>
            
            {/* Enhanced CTA Button with green theme */}
            <a
              href=""
              className={`relative w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-2xl text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group/btn overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              
              <span className="relative z-10 text-lg">Join Class Now</span>
              <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
              
              {/* Enhanced Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 blur-xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500 -z-10"></div>
            </a>
          </div>
        </div>

        {/* Enhanced Hover Border Effect with green theme */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-500/30 transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"></div>
        
        {/* Enhanced Inner Glow with green accent */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ClassCard;

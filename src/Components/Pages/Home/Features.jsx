import pic1 from "../../../assets/bicep-53.png";
import pic2 from "../../../assets/dumbbells-50.png";
import pic3 from "../../../assets/exercise-50.png";
import pic4 from "../../../assets/stretching-50.png";
import pic5 from "../../../assets/weightlifter-48.png";
import pic6 from "../../../assets/yoga-50.png";
import { FaArrowRight } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: pic1,
      title: "Muscle Building",
      description: "Strengthen and build muscle with tailored workouts and detailed progress tracking. Receive personalized plans, monitor your gains, and achieve your bodybuilding goals.",
      gradient: "from-[#16A34A] to-[#22C55E]"
    },
    {
      icon: pic2,
      title: "Body Building",
      description: "Achieve your muscle-building goals with our Body Building feature. Access tailored workout plans, track your progress, and get expert tips to maximize your strength.",
      gradient: "from-[#0EA5E9] to-[#06B6D4]"
    },
    {
      icon: pic3,
      title: "Running",
      description: "Track your running sessions with precision. Monitor your distance, pace, and calories burned, set personal goals, and analyze your progress.",
      gradient: "from-[#F59E0B] to-[#F97316]"
    },
    {
      icon: pic4,
      title: "Stretching",
      description: "Enhance your flexibility and prevent injuries with our Stretching feature. Access guided routines, track your stretching sessions seamlessly.",
      gradient: "from-[#8B5CF6] to-[#A855F7]"
    },
    {
      icon: pic5,
      title: "Weight Lifting",
      description: "Track your weight lifting routines with detailed logs and progress charts. Customize workouts, set personal records, and monitor your strength gains.",
      gradient: "from-[#EF4444] to-[#F87171]"
    },
    {
      icon: pic6,
      title: "Yoga",
      description: "Discover the benefits of Yoga with our guided sessions. Enhance flexibility, reduce stress, and improve overall well-being with personalized routines.",
      gradient: "from-[#EC4899] to-[#F472B6]"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our Amazing{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover powerful tools designed to transform your fitness journey and help you achieve your goals faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#16A34A] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {feature.description}
              </p>
              
              {/* Learn More Link */}
              <div className="flex items-center text-[#16A34A] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Learn More</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
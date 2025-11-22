import { useState } from "react";
import Certificateslot from "./Certificateslot";
import DaySlots from "./DaySlots";
import CategorySlot from "./CategorySlot";
import TimePicker from "./TimePicker";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
'use client';

import { useRouter } from "next/navigation";
import useAuthContext from "../../hooks/useAuthContext";
const BeATrainer = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleBeaTrainer = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value;
    const availableDay = selectedOption;
    const availableTime = value;
    const expert = form.category.value;
    const email = form.email.value;
    const experience = form.experience.value;
    const certification = selectedCert;
    const bio = form.description.value;
    const status = "Pending";
    const role = "Member";
    const photo = form.image.files[0];
    const formData = new FormData();
    const ctgory = selectedCategory[0].value;
    formData.append("image", photo);
    let pic = "";

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          process.env.NEXT_PUBLIC_IMGBB_API_KEY
        }`,
        formData
      );
      console.log(data.data.display_url);
      pic = data.data.display_url; // Assign pic here
    } catch (error) {
      console.log(error);
    }

    const userInfo = {
      name,
      availableDay,
      availableTime,
      expertise: expert,
      email,
      experience,
      category: ctgory,
      bio,
      certification,
      pic,
      status,
      role,
    };
    console.log(userInfo);

    // post the data to db
    const response = await axiosPublic.post("/trainers", userInfo);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You Applied Sucessfully!",
      text: "Wait For Admin Acceptance",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Become a FitFlow Trainer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Join our community of fitness experts and help others achieve their goals</p>
        </div>
        
        <form onSubmit={handleBeaTrainer} className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  defaultValue={user?.displayName}
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  name="category"
                >
                  <option>Strength Training, Bodybuilding</option>
                  <option>Yoga, Holistic Wellness</option>
                  <option>HIIT, Athletic Training</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Availability Days</label>
                  <DaySlots
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Availability Time</label>
                  <TimePicker value={value} setValue={setValue} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Expertise Category</label>
                <CategorySlot
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  defaultValue={user?.email}
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Profile Image</label>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500">
                  <div className="flex flex-col items-center justify-center text-center">
                    <label className="w-full cursor-pointer">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        required
                      />
                      <div className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                        Upload Image
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Experience (Years)</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  name="experience"
                  type="number"
                  placeholder="Years of experience"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Certification</label>
                <Certificateslot
                  selectedCert={selectedCert}
                  setSelectedCert={setSelectedCert}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              name="description"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200 h-32"
              placeholder="Tell us about your fitness journey and expertise..."
              required
            ></textarea>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
);
};

export default BeATrainer;


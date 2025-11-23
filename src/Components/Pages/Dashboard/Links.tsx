// links.jsx
import { FaHome, FaUtensils, FaCalendar, FaDAndD, FaAddressBook, FaRegUser } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';

export const trainerLinks = [
    { to: "/dashboard/manage-slots", icon: <FaHome />, text: "Manage Slots" },
    { to: "/dashboard/add-slots", icon: <FaUtensils />, text: "Add Slots" },
    { to: "/dashboard/add-post", icon: <HiOutlineMenu />, text: "Add Forum" },
];

export const memberLinks = [
    { to: "/dashboard/myProfile", icon: <FaHome />, text: "Profile" },
    { to: "/dashboard/apliedTrainers", icon: <FaCalendar />, text: "Activity Log" },
    { to: "/dashboard/reco-classes", icon: <FaDAndD />, text: "Recommended Classes" },
];

export const adminLinks = [
    { to: "/dashboard/newsletter-subsc", icon: <FaUtensils />, text: "Newsletter subscribers" },
    { to: "/dashboard/all-trainers", icon: <HiOutlineMenu />, text: "All Trainers" },
    { to: "/dashboard/applied-trainers", icon: <FaAddressBook />, text: "Applied Trainers" },
    { to: "/dashboard/ballance", icon: <FaRegUser />, text: "Balance" },
    { to: "/dashboard/add-classes", icon: <FaRegUser />, text: "Add new Class" },
];

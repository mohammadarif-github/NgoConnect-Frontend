import ServiceCard from "./ServiceCard";
import {
  FaHandHoldingHeart,
  FaUtensils,
  FaTint,
  FaBroom,
  FaUserShield,
  FaBookReader,
  FaHandsHelping,
  FaLeaf,
  FaPeopleCarry,
} from "react-icons/fa";

const servicesData = [
  {
    icon: FaUtensils,
    title: "Food Support",
    description: "Providing meals and essential groceries to families in need.",
    extraDetails:
      "We partner with local food banks and volunteers to distribute meals, groceries, and essential nutrition packs to families who need them most.",
  },
  {
    icon: FaTint,
    title: "Blood Donation",
    description: "Connecting donors with patients to ensure timely blood support.",
    extraDetails:
      "NGOConnect organizes regular blood donation drives and connects emergency donors with hospitals in critical situations.",
  },
  {
    icon: FaBroom,
    title: "Cleanliness Drives",
    description: "Organizing community cleaning campaigns to create healthier spaces.",
    extraDetails:
      "We arrange city and community cleaning programs to promote public hygiene, waste management, and environmental awareness.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Medical Aid",
    description: "Supporting people with basic medicines, checkups, and emergency help.",
    extraDetails:
      "NGOConnect provides free medical camps, basic medicine supplies, and arranges emergency treatment for people in need.",
  },
  {
    icon: FaUserShield,
    title: "Safety & Protection",
    description: "Helping vulnerable communities stay protected in tough situations.",
    extraDetails:
      "We support and protect homeless individuals, disaster victims, and those facing unsafe living conditions.",
  },
  {
    icon: FaBookReader,
    title: "Education Support",
    description: "Providing learning resources for underprivileged students.",
    extraDetails:
      "Educational kits, tutoring support, books, and digital learning resources are provided to underprivileged children.",
  },
  {
    icon: FaHandsHelping,
    title: "Volunteer Support",
    description: "Connecting volunteers with social causes that match their interests.",
    extraDetails:
      "We manage a volunteer network that helps match people with NGOs based on their skills, time, and passion.",
  },
  {
    icon: FaLeaf,
    title: "Environment Care",
    description: "Tree planting, waste management, and green awareness campaigns.",
    extraDetails:
      "NGOConnect conducts tree plantation drives, eco-awareness events, and campaigns promoting a green future.",
  },
  {
    icon: FaPeopleCarry,
    title: "Community Assistance",
    description: "Helping people during disasters and supporting local communities.",
    extraDetails:
      "We offer emergency relief, shelter setup, and community rebuilding programs during natural disasters.",
  },
];


const Services = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto opacity-80">
          NGOConnect is a community-driven platform dedicated to helping people in
          meaningful ways — from providing food, blood, cleanliness support, and
          medical assistance to empowering volunteers and strengthening local
          communities. Together, we create hope, relief, and positive change.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;

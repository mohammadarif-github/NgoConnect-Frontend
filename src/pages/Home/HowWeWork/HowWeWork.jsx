import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, HandHeart, Clock, Leaf, Utensils, FlaskConical } from "lucide-react";

const HowWeWork = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-green-100">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE IMAGE */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img
            src="/src/assets/brands/group.jpg"
            alt="How We Work"
            className="w-80 md:w-96 drop-shadow-lg rounded-xl"
          />
        </motion.div>

        {/* RIGHT SIDE TEXT */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-green-700">How We Work</h2>

          <p className="text-lg mb-6 opacity-80">
            At <span className="font-bold">NGOConnect</span>, we connect donors, volunteers,
            and people in need — ensuring every contribution reaches the right place.
          </p>

          <ul className="space-y-5">

            <li className="flex items-start gap-4">
              <Heart className="text-red-500 h-7 w-7" />
              <p className="text-lg">Donors can track exactly where their money goes.</p>
            </li>

            <li className="flex items-start gap-4">
              <Users className="text-blue-500 h-7 w-7" />
              <p className="text-lg">Volunteers earn rewards, certificates, and skill-building opportunities.</p>
            </li>

            <li className="flex items-start gap-4">
              <HandHeart className="text-green-600 h-7 w-7" />
              <p className="text-lg">People needing help receive verified support quickly and safely.</p>
            </li>

            <li className="flex items-start gap-4">
              <Clock className="text-purple-500 h-7 w-7" />
              <p className="text-lg">We operate 24/7 to respond to emergencies instantly.</p>
            </li>

            <li className="flex items-start gap-4">
              <FlaskConical className="text-red-400 h-7 w-7" />
              <p className="text-lg">Blood donation requests & camps handled with live updates.</p>
            </li>

            <li className="flex items-start gap-4">
              <Utensils className="text-orange-500 h-7 w-7" />
              <p className="text-lg">Food donation programs for disaster-hit & underprivileged families.</p>
            </li>

            <li className="flex items-start gap-4">
              <Leaf className="text-green-500 h-7 w-7" />
              <p className="text-lg">Environment-focused projects such as tree planting & clean-up drives.</p>
            </li>

          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;

import React, { useState } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description, extraDetails } = service;

  const [active, setActive] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => setActive(true)}
        className={`cursor-pointer p-6 rounded-xl text-center shadow-md transition-all
          ${
            active
              ? "bg-gradient-to-br from-green-300 to-emerald-400 text-white shadow-xl ring-2 ring-emerald-300"
              : "bg-green-50 hover:bg-green-100 text-base-content"
          }
        `}
      >
        <div
          className={`text-4xl flex justify-center mb-4 transition-all
            ${
              active
                ? "text-white drop-shadow-md"
                : "text-green-600"
            }
          `}
        >
          <Icon />
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className={`text-sm opacity-80 ${active ? "text-white opacity-90" : ""}`}>
          {description}
        </p>
      </motion.div>

      {/* Modal */}
      {active && (
        <dialog open className="modal modal-open">
          <div className="modal-box relative animate-[fadeIn_0.3s_ease-out]">
            <h3 className="font-bold text-2xl mb-4">{title}</h3>

            <div className="mb-4">
              <p className="text-lg font-medium">More Information:</p>
              <p className="py-2 opacity-80">{extraDetails}</p>
            </div>

            <div className="mb-4">
              <img
                src="https://via.placeholder.com/200"
                alt={title}
                className="w-32 h-32 rounded-lg mx-auto"
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-secondary" onClick={() => setActive(false)}>
                Close
              </button>
            </div>

            <button
              className="btn btn-ghost absolute top-2 right-2"
              onClick={() => setActive(false)}
            >
              ✖
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ServiceCard;

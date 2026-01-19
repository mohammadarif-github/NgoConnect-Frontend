import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBullseye, FaFlag } from 'react-icons/fa';

const CampaignCard = ({ campaign }) => {
  const { 
    title, 
    description, 
    goal_amount, 
    status, 
    end_date,
    slug 
  } = campaign;

  return (
    <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className={`badge ${
            status === 'ACTIVE' ? 'badge-success text-white' : 
            status === 'COMPLETED' ? 'badge-neutral' : 
            'badge-warning'
          } badge-sm font-semibold`}>
            {status}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FaCalendarAlt className="text-green-500" />
            {new Date(end_date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2" title={title}>
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaBullseye className="text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Goal:</span>
            </div>
            <span className="text-lg font-bold text-green-700">
              ৳{Number(goal_amount).toLocaleString()}
            </span>
          </div>

          <Link 
            to={`/campaign/${slug}`} 
            className="btn bg-green-600 hover:bg-green-700 text-white w-full border-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

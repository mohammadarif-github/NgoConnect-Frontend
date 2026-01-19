import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { API_ENDPOINTS } from '../../../config/api.config';

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['my-donations'],
    enabled: !!user?.email, // Keep this check but query doesn't need email param
    queryFn: async () => {
      const res = await axiosSecure.get(API_ENDPOINTS.MY_DONATIONS);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">
        My Donations ({donations.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-green-50">
              <th>#</th>
              <th>Campaign Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No donations found
                </td>
              </tr>
            ) : (
              donations.map((donation, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{donation.campaign_title || 'General Donation'}</td>
                  <td>৳{donation.amount}</td>
                  <td>
                    <span className={`badge ${
                      donation.status === 'completed' || donation.status === 'Paid' 
                        ? 'badge-success text-white' 
                        : 'badge-ghost'
                    }`}>
                      {donation.status || 'Completed'}
                    </span>
                  </td>
                  <td>
                    {donation.timestamp 
                      ? new Date(donation.timestamp).toLocaleDateString() 
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonations;

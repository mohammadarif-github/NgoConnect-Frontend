import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { API_ENDPOINTS } from '../../../config/api.config';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ManageCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(''); // Empty means all
    const axiosSecure = useAxiosSecure();

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            // Fetch all campaigns or filter if needed. 
            // The API supports filtering by status, but for management we likely want to see all.
            // If the API doesn't support "all", we might need multiple requests or a specific param.
            // Assuming empty status returns all or we default to a list.
            // Let's try fetching ACTIVE|PLANNED|COMPLETED|ON_HOLD one by one or hoping for a "all" list.
            // Given the doc: Query: ?status=ACTIVE|PLANNED|COMPLETED|ON_HOLD
            // We can fetch each type and combine, or just pick one default.
            // For a management view, it's best if the backend supports listing all.
            
            // Let's try fetching without status to see if it returns all, otherwise defaults to ACTIVE.
            // If it defaults, we might need UI filters.
            
            let url = API_ENDPOINTS.CAMPAIGNS;
            if (filter) url += `?status=${filter}`;
            
            const res = await axiosSecure.get(url);
            setCampaigns(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [filter]);

    const handleDelete = (slug) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`${API_ENDPOINTS.CAMPAIGNS}${slug}/`);
                    Swal.fire('Deleted!', 'Campaign has been deleted.', 'success');
                    fetchCampaigns();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete campaign.', 'error');
                }
            }
        });
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage Campaigns</h2>
                <Link to="/dashboard/campaigns/create" className="btn bg-green-600 hover:bg-green-700 text-white gap-2">
                    <FaPlus /> Create Campaign
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['', 'ACTIVE', 'PLANNED', 'ON_HOLD', 'COMPLETED'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`btn btn-sm ${filter === status ? 'btn-active btn-neutral' : 'btn-outline'}`}
                    >
                        {status || 'All'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <span className="loading loading-spinner loading-lg text-green-600"></span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                    <table className="table">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Goal</th>
                                <th>Budget</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No campaigns found.
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((campaign) => (
                                    <tr key={campaign.id || campaign.slug}>
                                        <td>
                                            <div className="font-bold">{campaign.title}</div>
                                            <div className="text-xs opacity-50 truncate max-w-[200px]">{campaign.description}</div>
                                        </td>
                                        <td>
                                            <div className={`badge ${
                                                campaign.status === 'ACTIVE' ? 'badge-success text-white' :
                                                campaign.status === 'COMPLETED' ? 'badge-neutral' :
                                                campaign.status === 'PLANNED' ? 'badge-info text-white' : 'badge-warning'
                                            } gap-2`}>
                                                {campaign.status}
                                            </div>
                                        </td>
                                        <td>৳{Number(campaign.goal_amount).toLocaleString()}</td>
                                        <td>৳{Number(campaign.budget_allocated).toLocaleString()}</td>
                                        <td className="text-sm">
                                            <div>{new Date(campaign.start_date).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-400">to {new Date(campaign.end_date).toLocaleDateString()}</div>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link 
                                                    to={`/campaign/${campaign.slug}`} 
                                                    className="btn btn-square btn-sm btn-ghost text-blue-600 tooltip"
                                                    data-tip="View"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <Link 
                                                    to={`/dashboard/campaigns/edit/${campaign.slug}`} 
                                                    className="btn btn-square btn-sm btn-ghost text-orange-500 tooltip"
                                                    data-tip="Edit"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(campaign.slug)}
                                                    className="btn btn-square btn-sm btn-ghost text-red-500 tooltip"
                                                    data-tip="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCampaigns;

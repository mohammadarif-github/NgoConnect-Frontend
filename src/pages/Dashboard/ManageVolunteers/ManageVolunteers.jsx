import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const ManageVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('PENDING'); // PENDING, APPROVED, REJECTED
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchVolunteers();
    }, [filterStatus]);

    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/api/volunteer/admin/list/?status=${filterStatus}`);
            if (Array.isArray(res.data)) {
                setVolunteers(res.data);
            } else if (res.data.results) {
                setVolunteers(res.data.results);
            } else {
                setVolunteers([]);
            }
        } catch (error) {
            console.error("Error fetching volunteers:", error);
            Swal.fire('Error', 'Failed to fetch volunteers', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (volunteerId, newStatus) => {
        try {
            await axiosSecure.patch(`/api/volunteer/admin/${volunteerId}/`, {
                application_status: newStatus
            });
            Swal.fire('Success', `Volunteer ${newStatus.toLowerCase()} successfully`, 'success');
            fetchVolunteers();
        } catch (error) {
            console.error("Error updating status:", error);
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Volunteer Management</h2>
            
            {/* Tabs */}
            <div className="tabs tabs-boxed mb-6 bg-gray-100 p-2 rounded-lg">
                {['PENDING', 'APPROVED', 'REJECTED'].map((status) => (
                    <a 
                        key={status}
                        className={`tab flex-1 ${filterStatus === status ? 'tab-active bg-green-600 text-white' : ''}`}
                        onClick={() => setFilterStatus(status)}
                    >
                        {status}
                    </a>
                ))}
            </div>

            {loading ? (
                <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-green-600"></span></div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Skills</th>
                                <th>Availability</th>
                                <th>Status</th>
                                {filterStatus === 'PENDING' && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.length > 0 ? (
                                volunteers.map((vol, index) => (
                                    <tr key={vol.user_id || index} className="hover:bg-gray-50">
                                        <th>{index + 1}</th>
                                        <td>{vol.first_name} {vol.last_name}</td>
                                        <td>{vol.email}</td>
                                        <td><div className="max-w-xs truncate" title={vol.skills}>{vol.skills}</div></td>
                                        <td><div className="max-w-xs truncate" title={vol.availability}>{vol.availability}</div></td>
                                        <td>
                                            <span className={`badge ${
                                                vol.application_status === 'APPROVED' ? 'badge-success text-white' : 
                                                vol.application_status === 'REJECTED' ? 'badge-error text-white' : 
                                                'badge-warning'
                                            }`}>
                                                {vol.application_status}
                                            </span>
                                        </td>
                                        {filterStatus === 'PENDING' && (
                                            <td className="flex gap-2">
                                                <button 
                                                    className="btn btn-sm btn-success text-white"
                                                    onClick={() => handleStatusUpdate(vol.user_id, 'APPROVED')}
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-error text-white"
                                                    onClick={() => handleStatusUpdate(vol.user_id, 'REJECTED')}
                                                    title="Reject"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 py-10">No {filterStatus.toLowerCase()} volunteers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageVolunteers;

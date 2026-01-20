import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaTrash, FaKey, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user: currentUser, fetchUserProfile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosSecure.get('/api/user/admin/users/');
            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else if (res.data.results && Array.isArray(res.data.results)) {
                setUsers(res.data.results);
            } else {
                setUsers([]);
                console.error("Unexpected response format:", res.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            Swal.fire('Error', 'Failed to fetch users', 'error');
            setLoading(false);
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${user.first_name} ${user.last_name || ''} (${user.email})`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/api/user/admin/users/${user.id}/`);
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    fetchUsers();
                } catch (error) {
                    const errorMessage = error.response?.data?.is_active?.[0] || 
                                         error.response?.data?.detail || 
                                         'Failed to delete user.';
                    Swal.fire('Error!', errorMessage, 'error');
                }
            }
        });
    };

    const handleUpdateUser = async (user, updates) => {
        // Warning if updating own role
        if (currentUser && user.id === currentUser.id && updates.role) {
            const result = await Swal.fire({
                title: 'Warning: Changing Own Role',
                text: "You are about to change your own role. If you proceed, you may lose administrative access to this dashboard immediately.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, change my role'
            });

            if (!result.isConfirmed) {
                return;
            }
        }

        try {
            await axiosSecure.patch(`/api/user/admin/users/${user.id}/`, updates);
            
            // If the user updated their own role, refresh the profile immediately
            if (currentUser && user.id === currentUser.id && updates.role) {
                 await fetchUserProfile();
                 Swal.fire({
                    title: 'Role Changed',
                    text: 'Your role has been updated. Redirecting...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                 });
                 // If no longer admin, redirect to dashboard home or somewhere safe 
                 // (Though UI will update because of fetchUserProfile -> context update -> layout re-render)
                 navigate('/dashboard'); 
            } else {
                fetchUsers();
            }
        } catch (error) {
            // Check for specific backend validation errors
            const errorData = error.response?.data;
            let errorMessage = 'Failed to update user';
            
            if (errorData) {
                if (errorData.role) errorMessage = Array.isArray(errorData.role) ? errorData.role[0] : errorData.role;
                else if (errorData.is_active) errorMessage = Array.isArray(errorData.is_active) ? errorData.is_active[0] : errorData.is_active;
                else if (errorData.error) errorMessage = errorData.error;
                else if (errorData.detail) errorMessage = errorData.detail;
            }
            
            Swal.fire('Error', errorMessage, 'error');
            // Revert the change locally implicitly by re-fetching or just by the error alert
            fetchUsers(); 
        }
    };

    const handleResetPassword = (user) => {
        Swal.fire({
            title: 'Reset Password',
            html: `
                <input type="password" id="new_password" class="swal2-input" placeholder="New Password">
                <input type="password" id="confirm_password" class="swal2-input" placeholder="Confirm Password">
            `,
            confirmButtonText: 'Reset Password',
            showCancelButton: true,
            preConfirm: () => {
                const new_password = Swal.getPopup().querySelector('#new_password').value;
                const confirm_password = Swal.getPopup().querySelector('#confirm_password').value;
                if (!new_password || !confirm_password) {
                    Swal.showValidationMessage('Please enter both fields');
                }
                if (new_password !== confirm_password) {
                    Swal.showValidationMessage('Passwords do not match');
                }
                return { new_password, confirm_password };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.post(`/api/user/admin/users/${user.id}/reset-password/`, result.value);
                    Swal.fire('Success', 'Password has been reset.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Failed to reset password.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">User Management</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th>{index + 1}</th>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select 
                                        className="select select-bordered select-sm w-full max-w-xs"
                                        value={user.role}
                                        onChange={(e) => handleUpdateUser(user, { role: e.target.value })}
                                    >
                                        <option value="general_user">General User</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="donor">Donor</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button 
                                        className={`btn btn-xs ${user.is_active ? 'btn-success text-white' : 'btn-error text-white'}`}
                                        onClick={() => handleUpdateUser(user, { is_active: !user.is_active })}
                                    >
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                        className="btn btn-warning btn-sm text-white" 
                                        title="Reset Password"
                                        onClick={() => handleResetPassword(user)}
                                    >
                                        <FaKey />
                                    </button>
                                    <button 
                                        className="btn btn-error btn-sm text-white" 
                                        title="Delete User"
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && <p className="text-center mt-4 text-gray-500">No users found.</p>}
        </div>
    );
};

export default ManageUsers;

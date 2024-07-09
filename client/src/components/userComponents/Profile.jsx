import React, { useEffect, useState } from 'react';
import api from '../../api';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get('/auth/currentUser'); // Adjust URL as per your backend route
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <h2>Welcome, {user.username}</h2>
                    {user.profilePicture && (
                        <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt="Profile" />
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;

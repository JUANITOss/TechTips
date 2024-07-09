import React, { useState, useEffect } from 'react';
import api from '../../api';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [subscription, setSubscription] = useState(false);

    useEffect(() => {
        // Fetch current user data
        api.get('/user/currentUser')
            .then(response => {
                setUser(response.data.user);
                setSubscription(response.data.user.subscription);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubscriptionChange = () => {
        setSubscription(prevState => !prevState);
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        api.put('/user/updateProfile', user)
            .then(response => {
                alert('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    const handleProfilePictureSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        api.put('/user/updateProfilePicture', formData)
            .then(response => {
                alert('Profile picture updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile picture:', error);
            });
    };

    const handleSubscriptionSubmit = (e) => {
        e.preventDefault();
        api.put('/user/updateSubscription', { subscription })
            .then(response => {
                alert('Subscription status updated successfully');
            })
            .catch(error => {
                console.error('Error updating subscription status:', error);
            });
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleProfileSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" name="surname" value={user.surname || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={user.phoneNumber || ''} onChange={handleInputChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>

            <form onSubmit={handleProfilePictureSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input type="file" onChange={handleProfilePictureChange} />
                </div>
                <button type="submit">Update Profile Picture</button>
            </form>

            <form onSubmit={handleSubscriptionSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Subscription</label>
                    <input type="checkbox" checked={subscription} onChange={handleSubscriptionChange} />
                </div>
                <button type="submit">Update Subscription</button>
            </form>
        </div>
    );
};

export default Profile;

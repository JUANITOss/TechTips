import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import '../pageStyles/NavbarComponents.css';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [subscription, setSubscription] = useState(false);
    const fileInputRef = useRef(null);

    const fetchCurrentUser = () => {
        api.get('/user/currentUser')
            .then(response => {
                setUser(response.data.user);
                setSubscription(response.data.user.subscription);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    useEffect(() => {
        // Fetch current user data
        fetchCurrentUser();
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
        const formData = new FormData();
        formData.append('profilePicture', e.target.files[0]);

        api.put('/user/updateProfilePicture', formData)
            .then(response => {
                alert('Profile picture updated successfully');
                fetchCurrentUser();
            })
            .catch(error => {
                console.error('Error updating profile picture:', error);
            });
    };

    const handleSubscriptionChange = () => {
        setSubscription(prevState => !prevState);
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        api.put('/user/updateProfile', user)
            .then(response => {
                alert('Profile updated successfully');
                fetchCurrentUser();
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    const handleSubscriptionSubmit = (e) => {
        e.preventDefault();
        api.put('/user/updateSubscription', { subscription })
            .then(response => {
                alert('Subscription status updated successfully');
                fetchCurrentUser();
            })
            .catch(error => {
                console.error('Error updating subscription status:', error);
            });
    };

    const handleLogout = () => {
        api.post('/user/logout')
            .then(() => {
                Navigate('/register');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <header className="px-4 md:px-6 border-b">
          <div className="mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/left_arrow.png" alt="Back" className='h-[20px]'/>
            </Link>
            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-12 h-12'/>
            {/* <button
              onClick={handleLogout}
              class="group flex items-center justify-start w-8 h-8 bg-transparent hover:bg-violet-700 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div
                class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
              >
                <svg class="w-4 h-4" viewBox="0 0 512 512" fill="black">
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                  ></path>
                </svg>
              </div>
              <div
              
                class="absolute right-5 transform translate-x-full opacity-0 text-black text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                Logout
              </div>
            </button> */}

          </div>
        </header>
            <main>
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-primary py-6 px-6">
                            <div className="flex items-center container max-w-6xl mx-auto flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary-foreground">{`${user.name} ${user.surname}`}</h2>
                                    <p className="text-sm text-primary-foreground">{`@${user.username}`}</p>
                                </div>

                                <div
                                    className="transform transition-all duration-250 ease-in-out hover:-translate-y-1/20"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <a className="group relative" href="#">

                                            <img 
                                            src={`http://localhost:5000/uploads/${user.profilePicture}`} 
                                            alt="Profile" 
                                            className="w-20 h-20 rounded-full"
                                          />                      
                                    </a>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleProfilePictureChange}
                                />
                            </div>
                        </div>
                        <form className="p-6 space-y-4" onSubmit={handleProfileSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nombre</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    name="name"
                                    value={user.name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Apellido</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    name="surname"
                                    value={user.surname || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Usuario</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    name="username"
                                    value={user.username || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Telefono</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    name="phoneNumber"
                                    value={user.phoneNumber || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <form onSubmit={handleSubscriptionSubmit} className="">
                                  <div className="form-group">
                                      <label>Subscripción</label>
                                      <input type="checkbox" checked={subscription} onChange={handleSubscriptionChange} />
                                  </div>
                                  <button type="submit">Actualizar Subscripción</button>
                              </form> */}
                            <div className="space-y-2">
                                <button type="submit" className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full'>Actualizar Perfil</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;

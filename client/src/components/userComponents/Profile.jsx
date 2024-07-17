import React, { useState, useEffect } from 'react';
import api from '../../api';
import './Profile.css';
import '../pageStyles/NavbarComponents.css';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [subscription, setSubscription] = useState(false);

    useEffect(() => {
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
    const handleLogout = () => {
        api.post('/user/logout')
            .then(() => {
                Navigate('/');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
        <header className="px-4 md:px-6 border-b">
          <div className="container max-w-6xl mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/wally.png" alt="Logo Wally" className='w-20 h-20'/>
              <span className="font-semibold text-lg">TechTips</span>
            </Link>
          </div>
        </header>
        <main>
            
            <div class="w-full max-w-md mx-auto">
        <div class="bg-background rounded-lg shadow-lg overflow-hidden">
            <div class="bg-primary py-6 px-6">
            <div class="flex items-center container max-w-6xl mx-auto flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-primary-foreground">{`${user.name} ${user.surname}`}</h2>
                    <p class="text-sm text-primary-foreground">{`@${user.username}`}</p>
                </div>


                <img 
                    src={`http://localhost:5000/uploads/${user.profilePicture}`} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-4 border-purple-600"
                    
                />
                <div
    class="transform transition-all duration-250 ease-in-out hover:-translate-y-1/20"
  >
    <main class="relative flex justify-center items-center">
      <a class="group relative" href="#">
        <svg class="w-20 h-20 rounded-full border-4 border-purple-600"></svg>
        <div
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-600/60 to-transparent flex justify-center items-center text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pb-4"
        >
          Change
        </div>
      </a>
    </main>
  </div>

  <div class="info mt-4"></div>
  <input class="card-input" type="hidden" />

            <form onSubmit={handleProfilePictureSubmit} className="">
                 <div className="">
                     
                    <input type="file" onChange={handleProfilePictureChange} 

                    />
                 </div>
                 <button type="submit">Actualizar Foto de Perfil</button>
             </form>
            </div>
            </div>
            <form class="p-6 space-y-4" onSubmit={handleProfileSubmit}>
            <div class="space-y-2">
                <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Nombre
                </label>
                <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" name="name" value={user.name || ''} onChange={handleInputChange}
                />
            </div>
            <div class="space-y-2">
                <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Apellido
                </label>
                <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                input type="text" name="surname" value={user.surname || ''} onChange={handleInputChange}
                />
            </div>
            <div class="space-y-2">
                <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Usuario
                </label>
                <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" name="username" value={user.username || ''} onChange={handleInputChange}
                />
            </div>
            <div class="space-y-2">
                <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Telefono
                </label>
                <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" name="phoneNumber" value={user.phoneNumber || ''} onChange={handleInputChange}
                />
            </div>
            </form>

            <div class="space-y-2">
            <button type="submit" className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full'>Actualizar Perfil</button>
            </div>

        </div>
        </div>
        </main>
        </div>
        // <div className="edit-profile-container">
        //     <nav className="navbarComponent">
        //         <div className="navbar-left">
        //             <a href="/homePage">←</a>
        //         </div>
        //         <div className="navbar-center">
        //             <span>TechTips</span> 
        //         </div>
        //     </nav>
        //     <div className='edit-profile-forms'>
        //     <h2>Editar Perfil</h2>
        //     <form onSubmit={handleProfileSubmit} className="edit-profile-form">
        //         <div className="form-group">
        //             <label>Usuario</label>
        //             <input type="text" name="username" value={user.username || ''} onChange={handleInputChange} />
        //         </div>
        //         <div className="form-group">
        //             <label>Nombre</label>
        //             <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
        //         </div>
        //         <div className="form-group">
        //             <label>Apellido</label>
        //             <input type="text" name="surname" value={user.surname || ''} onChange={handleInputChange} />
        //         </div>
        //         <div className="form-group">
        //             <label>Numero Telefono</label>
        //             <input type="text" name="phoneNumber" value={user.phoneNumber || ''} onChange={handleInputChange} />
        //         </div>
        //         <button type="submit">Actualizar Perfil</button>
        //     </form>

        //     <form onSubmit={handleProfilePictureSubmit} className="edit-profile-form">
        //         <div className="form-group">
        //             <label>Foto de Perfil</label>
        //             <input type="file" onChange={handleProfilePictureChange} />
        //         </div>
        //         <button type="submit">Actualizar Foto de Perfil</button>
        //     </form>

        //     <form onSubmit={handleSubscriptionSubmit} className="edit-profile-form">
        //         <div className="form-group">
        //             <label>Subscripción</label>
        //             <input type="checkbox" checked={subscription} onChange={handleSubscriptionChange} />
        //         </div>
        //         <button type="submit">Actualizar Subscripción</button>
        //     </form>
        //     <button className="logout-button" onClick={handleLogout}>Logout</button>
        //     </div>
        // </div>

    );
};

export default Profile;

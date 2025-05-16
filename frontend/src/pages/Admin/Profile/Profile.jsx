import React, { useState, useEffect } from 'react';
import ProfileComponent from '../../../components/Profile/Profile';
import EditPassword from '../../../components/Profile/EditPassword';
import { getCurrentUser } from '../../../services/user.service';

// Komponen halaman profil admin
const AdminProfile = () => {
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserData(currentUser);
    }
  }, []);

  if (!userData) return <div>Loading...</div>;

  const handleEditPassword = () => {
    setIsEditPasswordOpen(true);
  };

  const handleCloseEditPassword = () => {
    setIsEditPasswordOpen(false);
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-6">Profil Admin</h1>
      <ProfileComponent 
        userData={userData}
        onEditPassword={handleEditPassword}
      />
      <EditPassword
        isOpen={isEditPasswordOpen}
        onClose={handleCloseEditPassword}
        userData={userData}
      />
    </div>
  );
};

export default AdminProfile;
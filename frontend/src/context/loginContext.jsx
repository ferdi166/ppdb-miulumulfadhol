import { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/login.service';

// Membuat context untuk login
const LoginContext = createContext();

// Custom hook untuk menggunakan login context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin harus digunakan di dalam LoginProvider');
  }
  return context;
};

// Provider component untuk login
export const LoginProvider = ({ children }) => {
  // State untuk form input dan error
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Reset error saat user mengetik
    setError('');
  };

  // Handler untuk toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData);
    
    if (result.success) {
      // Simpan token ke localStorage
      localStorage.setItem('token', result.token);
      
      // Reset form setelah berhasil login
      setFormData({ username: '', password: '' });
      setError('');
      
      // Cek jika ada intended URL
      const intendedPath = location.state?.from?.pathname;
      
      // Redirect berdasarkan grup user atau intended URL
      if (intendedPath) {
        navigate(intendedPath);
      } else {
        switch(result.grupUser) {
          case 1: // Admin
            navigate('/admin/dashboard');
            break;
          case 2: // Kepala Sekolah  
            navigate('/kepala-sekolah/dashboard');
            break;
          case 3: // Pendaftar
            navigate('/pendaftar/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } else {
      setError('Username atau password salah');
    }
  };

  // Nilai yang akan di-share melalui context
  const value = {
    formData,
    showPassword,
    error,
    handleChange,
    handleSubmit,
    togglePasswordVisibility
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};
const validateFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Format file harus JPEG/JPG');
  }

  if (file.size > maxSize) {
    throw new Error('Ukuran file maksimal 5MB');
  }
}

const handleUpload = async (file) => {
  try {
    validateFile(file);
    const formData = new FormData();
    formData.append('dokumen', file);
    
    const response = await axios.post('/api/upload-dokumen', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
}
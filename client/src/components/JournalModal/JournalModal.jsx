import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Alert
} from '@mui/material';
import './JournalModal.css'

const JournalModal = ({ 
  open, 
  handleClose, 
  initialData, 
  handleSubmit,
  course
}) => {
  const [formData, setFormData] = useState({
    id_user: '',
    id_classes: '',
    grades: '',
    academic_performance: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_user: initialData.id_user || '',
        id_classes: initialData.id_classes || '',
        grades: initialData.grades || '',
        academic_performance: initialData.academic_performance || '',
      });
    } else {
      setFormData({
        id_user: '',
        id_classes: '',
        grades: '',
        academic_performance: '',
      });
    }
    setError(null);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.id_user || !formData.id_classes) {
      throw new Error('ID студента и ID занятия обязательны');
    }
    if (isNaN(formData.id_user) || isNaN(formData.id_classes)) {
      throw new Error('ID должны быть числами');
    }
  };

  const handleFormSubmit = async () => {
    try {
      validateForm();
      await handleSubmit({ ...formData, course });
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        sx={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {initialData ? 'Редактировать запись' : 'Добавить запись'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="ID студента *"
          name="id_user"
          value={formData.id_user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="ID занятия *"
          name="id_classes"
          value={formData.id_classes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Оценка"
          name="grades"
          value={formData.grades}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Успеваемость"
          name="academic_performance"
          value={formData.academic_performance}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined">
            Отмена
          </Button>
          <Button 
            onClick={handleFormSubmit} 
            variant="contained" 
            color="primary"
          >
            {initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JournalModal;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchJournal, 
  deleteGrade, 
  updateGrade, 
  addGrade,
  clearError
} from '../../store/slice/journalSlice';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  CircularProgress,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import JournalModal from '../JournalModal/JournalModal';
import './JournalPage.css';

const JournalPage = () => {
  const dispatch = useDispatch();
  const { 
    entries, 
    loading, 
    error,
    currentPage,
    totalPages
  } = useSelector((state) => state.journal);
  
  // Получаем сохраненный курс из localStorage или используем первый доступный
  const [course, setCourse] = useState(() => {
    const savedCourse = localStorage.getItem('selectedCourse');
    return savedCourse; // значение по умолчанию
  });
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  
  // Состояния для модального окна
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchJournal({ course, page, limit }));
  }, [dispatch, course, page, limit]);

  const handleCourseChange = (newCourse) => {
    setCourse(newCourse);
    localStorage.setItem('selectedCourse', newCourse); // Сохраняем выбор в localStorage
    setPage(1); // Сбрасываем страницу при смене курса
  };

  const handleUpdate = async (id_journal, updatedData) => {
    if (!id_journal || !updatedData) {
      console.error('Не указан ID или данные для обновления');
      return;
    }
    setIsUpdating(true);
    try {
      await dispatch(updateGrade({ course, id_journal, data: updatedData })).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id_journal) => {
    if (!id_journal) {
      console.error('Не указан ID записи');
      return;
    }
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteGrade({ course, id_journal })).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    try {
      if (editingEntry) {
        await handleUpdate(editingEntry.id_journal, data);
      } else {
        await dispatch(addGrade({ 
          course,
          id_user: data.id_user,
          id_classes: data.id_classes,
          grades: data.grades,
          academic_performance: data.academic_performance
        })).unwrap();
      }
      setModalOpen(false);
      setEditingEntry(null);
      dispatch(fetchJournal({ course, page, limit }));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h2>Журнал успеваемости</h2>

      <FormControl fullWidth margin="normal">
        <InputLabel>Курс</InputLabel>
        <Select
          value={course}
          onChange={(e) => handleCourseChange(e.target.value)}
          label="Курс"
        >
          <MenuItem value="electric">Electric</MenuItem>
          <MenuItem value="informatics">Informatics</MenuItem>
          <MenuItem value="iot">IoT</MenuItem>
        </Select>
      </FormControl>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID студента</TableCell>
              <TableCell>ID занятия</TableCell>
              <TableCell>Оценка</TableCell>
              <TableCell>Успеваемость</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : entries.length > 0 ? (
              entries.map(entry => (
                <TableRow key={entry.id_journal}>
                  <TableCell>{entry.id_user}</TableCell>
                  <TableCell>{entry.id_classes}</TableCell>
                  <TableCell>
                    <TextField 
                      size="small"
                      value={entry.grades} 
                      onChange={(e) => handleUpdate(entry.id_journal, { grades: e.target.value })} 
                    />
                  </TableCell>
                  <TableCell>
                    <TextField 
                      size="small"
                      value={entry.academic_performance} 
                      onChange={(e) => handleUpdate(entry.id_journal, { academic_performance: e.target.value })} 
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => openEditModal(entry)}
                      variant="outlined"
                      size="small"
                      style={{ marginRight: 8 }}
                      disabled={isUpdating}
                    >
                      {isUpdating ? <CircularProgress size={24} /> : 'Редактировать'}
                    </Button>
                    <Button 
                      onClick={() => handleDelete(entry.id_journal)} 
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={isDeleting}
                    >
                      {isDeleting ? <CircularProgress size={24} /> : 'Удалить'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          onClick={() => setModalOpen(true)} 
          variant="contained" 
          color="primary"
        >
          Добавить запись
        </Button>
        
        <div style={{ display: 'flex', gap: 10 }}>
          <Button 
            onClick={() => handlePageChange(page - 1)} 
            variant="contained"
            disabled={page <= 1}
          >
            Предыдущая
          </Button>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Страница {page} из {totalPages}
          </span>
          <Button 
            onClick={() => handlePageChange(page + 1)} 
            variant="contained"
            disabled={page >= totalPages}
          >
            Следующая
          </Button>
        </div>
      </div>

      <JournalModal 
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          setEditingEntry(null);
        }}
        initialData={editingEntry}
        handleSubmit={handleModalSubmit}
        course={course}
      />
    </Paper>
  );
};

export default JournalPage;
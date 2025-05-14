import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCompetitions,
  fetchCompetitionDetails,
  createNewCompetition,
  updateCompetition,
  deleteCompetition,
  fetchCompetitionResults,
  addCompetitionResult,
  clearCompetitionDetails,
  clearCompetitionError
} from '../../store/slice/competitionSlice';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Pagination,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const CompetitionPage = () => {
  const dispatch = useDispatch();
  const { hackathon, olympiad } = useSelector(state => state.competitions);
  const [activeTab, setActiveTab] = useState('hackathon');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'create', 'edit'
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [upcomingFilter, setUpcomingFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    date: dayjs(),
    organizers: '',
    description: ''
  });
  const [resultFormData, setResultFormData] = useState({
    team_name: '',
    project_name: '',
    score: 0,
    position: 1,
    participants: []
  });

  // Fetch competitions when tab or filters change
  useEffect(() => {
    const params = {
      page,
      limit,
      search: searchTerm,
      upcoming: upcomingFilter === 'all' ? undefined : upcomingFilter === 'upcoming'
    };
    
    dispatch(fetchCompetitions({ type: activeTab, params }));
  }, [dispatch, activeTab, page, limit, searchTerm, upcomingFilter]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCurrentView('list');
    setPage(1);
    dispatch(clearCompetitionDetails({ type: activeTab }));
  };

  // Handle view change
  const changeView = (view, competition = null) => {
    setCurrentView(view);
    setCurrentCompetition(competition);
    
    if (view === 'edit' && competition) {
      setFormData({
        name: competition.name,
        topic: competition.topic,
        date: dayjs(competition.date),
        organizers: competition.organizers || '',
        description: competition.description || ''
      });
    } else if (view === 'create') {
      setFormData({
        name: '',
        topic: '',
        date: dayjs(),
        organizers: '',
        description: ''
      });
    } else if (view === 'details' && competition) {
      // Load competition details and results
      dispatch(fetchCompetitionDetails({ type: activeTab, id: competition.id }));
      dispatch(fetchCompetitionResults({ type: activeTab, competitionId: competition.id }));
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  // Handle result form input changes
  const handleResultInputChange = (e) => {
    const { name, value } = e.target;
    setResultFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const competitionData = {
        ...formData,
        date: formData.date.toISOString()
      };

      if (currentView === 'create') {
        await dispatch(createNewCompetition({ type: activeTab, competitionData })).unwrap();
        setSnackbar({ open: true, message: 'Соревнование успешно создано', severity: 'success' });
      } else if (currentView === 'edit' && currentCompetition) {
        await dispatch(updateCompetition({ 
          type: activeTab, 
          id: currentCompetition.id, 
          competitionData 
        })).unwrap();
        setSnackbar({ open: true, message: 'Соревнование успешно обновлено', severity: 'success' });
      }

      setOpenDialog(false);
      changeView('list');
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Произошла ошибка', severity: 'error' });
    }
  };

  // Handle result form submission
  const handleResultSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultData = {
        id_competition: currentCompetition.id,
        ...resultFormData,
        participants: resultFormData.participants.map(p => p.id_user)
      };

      await dispatch(addCompetitionResult({ type: activeTab, resultData })).unwrap();
      setSnackbar({ open: true, message: 'Результат успешно добавлен', severity: 'success' });
      setOpenResultDialog(false);
      
      // Refresh results
      dispatch(fetchCompetitionResults({ type: activeTab, competitionId: currentCompetition.id }));
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Произошла ошибка', severity: 'error' });
    }
  };

  // Handle competition deletion
  const handleDelete = async () => {
    try {
      await dispatch(deleteCompetition({ type: activeTab, id: currentCompetition.id })).unwrap();
      setSnackbar({ open: true, message: 'Соревнование успешно удалено', severity: 'success' });
      changeView('list');
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Произошла ошибка', severity: 'error' });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
    dispatch(clearCompetitionError({ type: activeTab }));
  };

  // Get current state based on active tab
  const currentState = activeTab === 'hackathon' ? hackathon : olympiad;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Управление соревнованиями
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Хакатоны" value="hackathon" />
        <Tab label="Олимпиады" value="olympiad" />
      </Tabs>

      {currentView === 'list' && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Поиск по названию или теме"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={upcomingFilter}
                  onChange={(e) => setUpcomingFilter(e.target.value)}
                  label="Статус"
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="upcoming">Предстоящие</MenuItem>
                  <MenuItem value="past">Прошедшие</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setCurrentCompetition(null);
                setOpenDialog(true);
                changeView('create');
              }}
            >
              Создать
            </Button>
          </Box>

          {currentState.loading ? (
            <Typography>Загрузка...</Typography>
          ) : currentState.error ? (
            <Alert severity="error">{currentState.error}</Alert>
          ) : currentState.list.length === 0 ? (
            <Typography>Нет доступных соревнований</Typography>
          ) : (
            <>
              <Paper sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Название</TableCell>
                      <TableCell>Тема</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell>Участники</TableCell>
                      <TableCell>Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentState.list.map((competition) => (
                      <TableRow key={competition.id}>
                        <TableCell>{competition.name}</TableCell>
                        <TableCell>{competition.topic}</TableCell>
                        <TableCell>
                          {new Date(competition.date).toLocaleDateString()}
                          {new Date(competition.date) > new Date() ? (
                            <Chip label="Предстоящее" color="primary" size="small" sx={{ ml: 1 }} />
                          ) : (
                            <Chip label="Прошедшее" color="secondary" size="small" sx={{ ml: 1 }} />
                          )}
                        </TableCell>
                        <TableCell>{competition.participantsCount || 0}</TableCell>
                        <TableCell>
                          <Tooltip title="Просмотр">
                            <IconButton onClick={() => changeView('details', competition)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Редактировать">
                            <IconButton onClick={() => {
                              setCurrentCompetition(competition);
                              setOpenDialog(true);
                              changeView('edit', competition);
                            }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton onClick={() => {
                              setCurrentCompetition(competition);
                              changeView('delete', competition);
                            }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={currentState.pagination.totalPages}
                  page={currentState.pagination.page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </>
      )}

      {currentView === 'details' && currentCompetition && currentState.details && (
        <Box>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => changeView('list')}
            sx={{ mb: 2 }}
          >
            Назад к списку
          </Button>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {currentState.details.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Тема: {currentState.details.topic}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Дата: {new Date(currentState.details.date).toLocaleDateString()}
            </Typography>
            {currentState.details.organizers && (
              <Typography color="text.secondary" gutterBottom>
                Организаторы: {currentState.details.organizers}
              </Typography>
            )}
            {currentState.details.description && (
              <Typography paragraph sx={{ mt: 2 }}>
                {currentState.details.description}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => {
                  setOpenDialog(true);
                  changeView('edit', currentCompetition);
                }}
              >
                Редактировать
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => changeView('delete', currentCompetition)}
              >
                Удалить
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<EmojiEventsIcon />}
                onClick={() => {
                  setResultFormData({
                    team_name: '',
                    project_name: '',
                    score: 0,
                    position: 1,
                    participants: []
                  });
                  setOpenResultDialog(true);
                }}
                sx={{ ml: 'auto' }}
              >
                Добавить результат
              </Button>
            </Box>
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            Результаты
          </Typography>
          
          {currentState.results[currentCompetition.id]?.loading ? (
            <Typography>Загрузка результатов...</Typography>
          ) : currentState.results[currentCompetition.id]?.error ? (
            <Alert severity="error">{currentState.results[currentCompetition.id].error}</Alert>
          ) : currentState.results[currentCompetition.id]?.data?.length === 0 ? (
            <Typography>Нет результатов</Typography>
          ) : (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Позиция</TableCell>
                    <TableCell>Команда</TableCell>
                    <TableCell>Проект</TableCell>
                    <TableCell>Баллы</TableCell>
                    <TableCell>Участники</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentState.results[currentCompetition.id]?.data?.map((result) => (
                    <TableRow key={result.id_result}>
                      <TableCell>{result.position}</TableCell>
                      <TableCell>{result.team_name}</TableCell>
                      <TableCell>{result.project_name || '-'}</TableCell>
                      <TableCell>{result.score}</TableCell>
                      <TableCell>
                        {result.participants?.length > 0 ? (
                          <Tooltip title={
                            <List dense>
                              {result.participants.map(participant => (
                                <ListItem key={participant.id_user}>
                                  <ListItemAvatar>
                                    <Avatar src={participant.avatar} />
                                  </ListItemAvatar>
                                  <ListItemText primary={participant.username} />
                                </ListItem>
                              ))}
                            </List>
                          }>
                            <Chip 
                              icon={<PeopleIcon />} 
                              label={`${result.participants.length} участников`} 
                            />
                          </Tooltip>
                        ) : (
                          <Typography color="text.secondary">Нет участников</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Box>
      )}

      {currentView === 'delete' && currentCompetition && (
        <Box>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => changeView('details', currentCompetition)}
            sx={{ mb: 2 }}
          >
            Назад
          </Button>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Вы уверены, что хотите удалить соревнование "{currentCompetition.name}"?
            </Typography>
            <Typography color="text.secondary" paragraph>
              Это действие нельзя отменить. Все связанные результаты также будут удалены.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Удалить
              </Button>
              <Button
                variant="outlined"
                onClick={() => changeView('details', currentCompetition)}
              >
                Отмена
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Create/Edit Competition Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentView === 'create' ? 'Создать новое соревнование' : 'Редактировать соревнование'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Название"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Тема"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Дата"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                />
              )}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Организаторы"
              name="organizers"
              value={formData.organizers}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={4}
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.topic || !formData.date}
          >
            {currentView === 'create' ? 'Создать' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Result Dialog */}
      <Dialog open={openResultDialog} onClose={() => setOpenResultDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить результат</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleResultSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Название команды"
              name="team_name"
              value={resultFormData.team_name}
              onChange={handleResultInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Название проекта"
              name="project_name"
              value={resultFormData.project_name}
              onChange={handleResultInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              label="Баллы"
              name="score"
              value={resultFormData.score}
              onChange={handleResultInputChange}
              inputProps={{ min: 0 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              label="Позиция"
              name="position"
              value={resultFormData.position}
              onChange={handleResultInputChange}
              inputProps={{ min: 1 }}
            />
            {/* Здесь можно добавить выбор участников через Select с multiple */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResultDialog(false)}>Отмена</Button>
          <Button 
            type="submit" 
            onClick={handleResultSubmit} 
            variant="contained"
            disabled={!resultFormData.team_name || !resultFormData.score || !resultFormData.position}
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </LocalizationProvider>
  );
};

export default CompetitionPage;
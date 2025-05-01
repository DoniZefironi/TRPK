import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchGroupDetails, 
  fetchSpecificGroupMembers, 
  resetGroupState
} from '../../store/slice/groupSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
         CircularProgress, Button, Alert, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './GroupDetailsPage.css';

const GroupDetailsPage = () => {
    const { course, groupId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { 
        currentGroup, 
        members, 
        loading, 
        error 
    } = useSelector(state => state.groups);
    
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    // Загрузка данных конкретной группы
    useEffect(() => {
        const loadGroupData = async () => {
          setIsLoading(true);
          setErrorMessage(null);
          
          try {
            // Загружаем данные группы
            await dispatch(fetchGroupDetails({ course, id: groupId })).unwrap();
            
            // Загружаем участников конкретной группы
            await dispatch(fetchSpecificGroupMembers({ course, groupId })).unwrap();
      
          } catch (err) {
            console.error('Ошибка загрузки:', err);
            setErrorMessage(err.message || 'Ошибка загрузки данных группы');
          } finally {
            setIsLoading(false);
          }
        };
      
        loadGroupData();
        
        return () => {
          dispatch(resetGroupState());
        };
      }, [course, groupId, dispatch]);

    const handleBack = () => {
        navigate(`/groups`);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
                <Typography variant="h6" ml={2}>
                    Загрузка данных группы...
                </Typography>
            </Box>
        );
    }

    if (error || errorMessage) {
        return (
            <Box p={3}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || errorMessage}
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                >
                    Назад к списку групп
                </Button>
            </Box>
        );
    }

    if (!currentGroup || currentGroup.id_group !== Number(groupId)) {
        return (
            <Box p={3}>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Группа не найдена
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                >
                    Назад к списку групп
                </Button>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Box display="flex" alignItems="center" mb={3}>
                <IconButton onClick={handleBack} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">
                    Группа: {currentGroup.name}
                </Typography>
            </Box>

            {/* Информация о группе */}
            <Box mb={4} p={2} bgcolor="background.paper" borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                    Информация о группе
                </Typography>
                <Typography>Описание: {currentGroup.description || 'Нет описания'}</Typography>
                <Typography>Статус: {currentGroup.status}</Typography>
                <Typography>Дата создания: {new Date(currentGroup.created_at).toLocaleDateString()}</Typography>
            </Box>

            {/* Список участников */}
            <Typography variant="h5" gutterBottom>
                Участники группы
            </Typography>
            
            {members && members.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Роль</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {members.map((member) => {
    // Проверяем разные возможные пути к данным пользователя
    const userData = member.user || member.User || member;
    const username = userData.username || userData.user_name || 'Не указано';
    const email = userData.email || 'Не указано';

    return (
        <TableRow key={member.id_user}>
            <TableCell>{member.id_user}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{member.role}</TableCell>
        </TableRow>
    );
})}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    В группе пока нет участников
                </Typography>
            )}
        </Box>
    );
};

export default GroupDetailsPage;
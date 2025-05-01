import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchGroupDetails, 
  fetchGroupMembers, 
  resetGroupState,
  addMember,
  removeMember
} from '../../store/slice/groupSlice';
import MemberTable from '../../components/MemberTable/MemberTable';
import GroupInfo from '../../components/GroupInfo/GroupInfo';
import { CircularProgress, Button, Alert, Typography } from '@mui/material';
import './GroupDetailsPage.css';

const GroupDetailsPage = () => {
    const { course, groupId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { 
        currentGroup, 
        members, 
        loading, 
        error,
        memberOperationLoading
    } = useSelector(state => state.groups);
    
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [operationError, setOperationError] = useState(null);

    // Загрузка данных группы
    useEffect(() => {
        const loadGroupData = async () => {
            setIsInitialLoading(true);
            try {
                await dispatch(fetchGroupDetails({ course, id: groupId })).unwrap();
                const membersResponse = await dispatch(fetchGroupMembers({ course, id: groupId })).unwrap();
                console.log('Loaded members:', membersResponse); // Логирование загруженных участников
            } catch (err) {
                console.error('Group data loading error:', err);
            } finally {
                setIsInitialLoading(false);
            }
        };

        loadGroupData();
        
        return () => {
            dispatch(resetGroupState());
        };
    }, [course, groupId, dispatch]);

    // Обработка операций с участниками
    const handleMemberOperation = async (operation, userId) => {
        setOperationError(null);
        try {
            if (operation === 'add') {
                await dispatch(addMember({
                    course,
                    id: groupId,
                    memberData: { id_user: userId }
                })).unwrap();
            } else {
                await dispatch(removeMember({
                    course,
                    id: groupId,
                    userId
                })).unwrap();
            }
            // Обновляем список участников после операции
            await dispatch(fetchGroupMembers({ course, id: groupId }));
        } catch (err) {
            console.error(`${operation === 'add' ? 'Add' : 'Remove'} member error:`, err);
            setOperationError(err.message || `Ошибка ${operation === 'add' ? 'добавления' : 'удаления'} участника`);
        }
    };

    // Обработка навигации назад
    const handleBackClick = () => {
        navigate(`/groups/${course}`);
    };

    // Состояния загрузки
    if (isInitialLoading) {
        return (
            <div className="loading-container">
                <CircularProgress size={60} />
                <Typography variant="body1" mt={2}>
                    Загрузка данных группы...
                </Typography>
            </div>
        );
    }

    // Обработка ошибок
    if (error) {
        return (
            <div className="error-container">
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={handleBackClick}
                >
                    Вернуться к списку групп
                </Button>
            </div>
        );
    }

    // Группа не найдена
    if (!currentGroup) {
        return (
            <div className="not-found-container">
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Группа не найдена или была удалена
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={handleBackClick}
                >
                    Вернуться к списку групп
                </Button>
            </div>
        );
    }

    return (
        <div className="group-details-container">
            {/* Заголовок и кнопка назад */}
            <div className="group-header">
                <Button 
                    variant="outlined" 
                    onClick={handleBackClick}
                    startIcon={<span>←</span>}
                    sx={{ mr: 2 }}
                >
                    К списку групп
                </Button>
                <Typography variant="h4" component="h1">
                    {currentGroup.name}
                </Typography>
            </div>

            {/* Отображение ошибок операций */}
            {operationError && (
                <Alert 
                    severity="error" 
                    onClose={() => setOperationError(null)}
                    sx={{ mb: 3 }}
                >
                    {operationError}
                </Alert>
            )}

            {/* Основная информация о группе */}
            <GroupInfo 
                group={currentGroup} 
                course={course} 
                sx={{ mb: 4 }}
            />

            {/* Список участников */}
            <div className="members-section">
                <Typography variant="h5" component="h2" gutterBottom>
                    Участники группы
                    {memberOperationLoading && (
                        <CircularProgress size={24} sx={{ ml: 2 }} />
                    )}
                </Typography>

                {members && members.length > 0 ? (
                    <MemberTable 
                        members={members} 
                        onAddMember={(userId) => handleMemberOperation('add', userId)}
                        onRemoveMember={(userId) => handleMemberOperation('remove', userId)}
                        isLoading={memberOperationLoading}
                    />
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        В группе пока нет участников
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default GroupDetailsPage;
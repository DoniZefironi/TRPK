import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllUsers, 
  changeUserRoleAction,
  updateUserByIdAction
} from '../../store/slice/userSlice';
import { 
  fetchGroups, 
  addMember, 
  removeMember,
  fetchGroupMembers
} from '../../store/slice/groupSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem,
  FormControl,
  TableSortLabel,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';

const UserManagementPage = () => {
    const dispatch = useDispatch();
    const { 
      users: reduxUsers, 
      loading: usersLoading, 
      error: usersError 
    } = useSelector(state => state.user);
    
    const { 
      groups, 
      loading: groupsLoading,
      members: groupMembers,
      error: groupsError
    } = useSelector(state => state.groups);
    
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [localUsers, setLocalUsers] = useState([]);
    const [isProcessing, setIsProcessing] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('electric');

    // Получаем группы только для выбранного курса
    const groupsForSelectedCourse = groups?.filter(
        group => group.course?.toLowerCase() === selectedCourse.toLowerCase()
    ) || [];

    // Загрузка данных
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(fetchGroups({ course: selectedCourse }));
        dispatch(fetchGroupMembers({ course: selectedCourse })); // Исправленный вызов
      }, [dispatch, selectedCourse]);

    // Фильтрация пользователей по permissions (курсу) и добавление информации о группе
    useEffect(() => {
        if (reduxUsers.length > 0 && groupMembers) {
            const filteredUsers = reduxUsers
                .filter(user => user.permissions?.toLowerCase() === selectedCourse.toLowerCase())
                .map(user => {
                    // Находим запись о членстве в группе для этого пользователя
                    const membership = groupMembers.find(m => m.id_user === user.id_user);
                    const groupId = membership?.id_group || null;
                    
                    return {
                        ...user,
                        id_group: groupId ? Number(groupId) : null
                    };
                });
            
            setLocalUsers(filteredUsers);
        }
    }, [reduxUsers, selectedCourse, groupMembers]);

    const handleRoleChange = async (userId, newRole) => {
        setIsProcessing(prev => ({ ...prev, [userId]: 'role' }));
        
        try {
            // Оптимистичное обновление
            setLocalUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id_user === userId ? { ...user, role: newRole } : user
                )
            );
            
await dispatch(changeUserRoleAction({ userId, role: newRole })).unwrap();
window.location.reload(); // 👈 Добавляем перезагрузку

            
        } catch (error) {
            console.error('Ошибка изменения роли:', error);
            // Откат изменений
            setLocalUsers(reduxUsers.filter(
                user => user.permissions?.toLowerCase() === selectedCourse.toLowerCase()
            ));
        } finally {
            setIsProcessing(prev => ({ ...prev, [userId]: null }));
        }
    };

    const handleGroupChange = async (userId, newGroupId) => {
        setIsProcessing(prev => ({ ...prev, [userId]: 'group' }));
        
        try {
            const user = localUsers.find(u => u.id_user === userId);
            const currentGroupId = user.id_group;
            
            // Оптимистичное обновление
            setLocalUsers(prev => prev.map(u => 
                u.id_user === userId ? { ...u, id_group: newGroupId ? Number(newGroupId) : null } : u
            ));
            
            // Удаляем из старой группы (если была)
            if (currentGroupId) {
                await dispatch(removeMember({
                    course: selectedCourse,
                    id: currentGroupId,
                    userId
                })).unwrap();
            }
            
            // Добавляем в новую группу (если выбрана)
            if (newGroupId) {
                await dispatch(addMember({
                    course: selectedCourse,
                    id: newGroupId,
                    memberData: { id_user: userId }
                })).unwrap();
            }
            
            // Обновляем список членов групп
            await dispatch(fetchGroupMembers({ course: selectedCourse }));
window.location.reload(); // 👈 Добавляем перезагрузку

            
        } catch (error) {
            console.error('Ошибка изменения группы:', error);
            // Восстанавливаем предыдущее состояние из redux
            setLocalUsers(reduxUsers.filter(
                user => user.permissions?.toLowerCase() === selectedCourse.toLowerCase()
            ));
        } finally {
            setIsProcessing(prev => ({ ...prev, [userId]: null }));
        }
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const sortedUsers = React.useMemo(() => {
        const usersToSort = [...localUsers];
        if (!sortConfig.key) return usersToSort;
        
        return usersToSort.sort((a, b) => {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';
            
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [localUsers, sortConfig]);

    if (usersLoading || groupsLoading) {
        return (
            <Paper style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (usersError || groupsError) {
        return (
            <Paper style={{ padding: 20 }}>
                <Typography color="error">
                    Ошибка загрузки данных: {usersError || groupsError}
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className="user-management">
            <Box className="user-management-header">
                <Typography variant="h4">Управление пользователями</Typography>
                <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                    <Select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <MenuItem value="electric">Electric</MenuItem>
                        <MenuItem value="iot">IoT</MenuItem>
                        <MenuItem value="informatics">Informatics</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <TableContainer component={Paper} className="user-management-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'id_user'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('id_user')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'username'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('username')}
                                >
                                    Имя
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'role'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('role')}
                                >
                                    Роль
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Группа</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map(user => {
                            // Находим текущую группу пользователя
                            const userGroup = groupsForSelectedCourse.find(
                                g => g.id_group === user.id_group
                            );
                            
                            return (
                                <TableRow key={user.id_user}>
                                    <TableCell>{user.id_user}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth size="small">
                                            {isProcessing[user.id_user] === 'role' ? (
                                                <div className="processing-spinner"><CircularProgress size={24} /></div>
                                            ) : (
                                                <Select
                                                    value={user.role || 'USER'}
                                                    onChange={(e) => handleRoleChange(user.id_user, e.target.value)}
                                                >
                                                    <MenuItem value="USER">USER</MenuItem>
                                                    <MenuItem value="TEACHER">TEACHER</MenuItem>
                                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                                </Select>
                                            )}
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth size="small">
                                            {isProcessing[user.id_user] === 'group' ? (
                                                <CircularProgress size={24} />
                                            ) : (
                                                <Select
                                                    value={user.id_group ?? ''}
                                                    onChange={(e) => handleGroupChange(user.id_user, e.target.value)}
                                                    displayEmpty
                                                    renderValue={(selected) => {
                                                        if (!selected) return <em>Без группы</em>;
                                                        
                                                        const currentGroup = groupsForSelectedCourse.find(
                                                            g => g.id_group == selected
                                                        );
                                                        
                                                        return currentGroup 
                                                            ? currentGroup.name 
                                                            : `Группа ${selected}`;
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Без группы</em>
                                                    </MenuItem>
                                                    {groupsForSelectedCourse.map(group => (
                                                        <MenuItem 
                                                            key={group.id_group} 
                                                            value={group.id_group}
                                                        >
                                                            {group.name || `Группа ${group.id_group}`}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UserManagementPage;
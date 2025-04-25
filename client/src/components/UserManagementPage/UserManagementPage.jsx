import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, changeUserRoleAction } from '../../store/slice/userSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

const UserManagementPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, newRole) => {
        dispatch(changeUserRoleAction({ userId, role: newRole }));
    };

    return (
        <Paper style={{ padding: 20 }}>
            <h2>Управление пользователями</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? <p>Загрузка...</p> : (
                <TableContainer>
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
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.permissions}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        >
                                            <MenuItem value="USER">USER</MenuItem>
                                            <MenuItem value="TEACHER">TEACHER</MenuItem>
                                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
};

export default UserManagementPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchElectives, 
    createElective, 
    updateElective, 
    deleteElective,
    clearCurrentElective,
    setPagination,
    fetchUsers
} from '../../store/slice/electiveInformaticsSlice';
import { Button, Table, Modal, Form, Input, message, Pagination, Space, Card, Select, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const ElectivesPage = () => {
    const dispatch = useDispatch();
    const { 
        electives, 
        currentElective, 
        loading, 
        error,
        pagination,
        users,
        usersLoading
    } = useSelector(state => state.electives);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Фильтруем пользователей с ролью преподавателя
    const teachers = users.filter(user => user.role === 'TEACHER');
    
    useEffect(() => {
        dispatch(fetchElectives({ 
            page: pagination.page, 
            limit: pagination.limit,
            search: searchTerm
        }));
        dispatch(fetchUsers()); // Загружаем всех пользователей
    }, [dispatch, pagination.page, pagination.limit, searchTerm]);
    
    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);
    
    useEffect(() => {
        if (currentElective) {
            form.setFieldsValue({
                name: currentElective.name,
                topic_elective: currentElective.topic_elective,
                id_user: currentElective.id_user
            });
        }
    }, [currentElective, form]);
    
    const handleCreate = () => {
        form.resetFields();
        dispatch(clearCurrentElective());
        setIsModalVisible(true);
    };
    
    const handleEdit = (elective) => {
        form.setFieldsValue({
            name: elective.name,
            topic_elective: elective.topic_elective,
            id_user: elective.id_user
        });
        setIsModalVisible(true);
    };
    
    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Удалить факультатив?',
            content: 'Вы уверены, что хотите удалить этот факультатив?',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: async () => {
                try {
                    await dispatch(deleteElective(id)).unwrap();
                    message.success('Факультатив успешно удален');
                    dispatch(fetchElectives({ 
                        page: pagination.page, 
                        limit: pagination.limit,
                        search: searchTerm
                    }));
                } catch (err) {
                    message.error('Ошибка при удалении факультатива');
                }
            }
        });
    };
    
    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                const action = currentElective 
                    ? dispatch(updateElective({
                        id: currentElective.id,
                        ...values
                    }))
                    : dispatch(createElective(values));
                
                action.unwrap()
                    .then(() => {
                        message.success(
                            currentElective 
                                ? 'Факультатив успешно обновлен' 
                                : 'Факультатив успешно создан'
                        );
                        setIsModalVisible(false);
                        dispatch(fetchElectives({ 
                            page: pagination.page, 
                            limit: pagination.limit,
                            search: searchTerm
                        }));
                    })
                    .catch(err => {
                        message.error('Произошла ошибка');
                    });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };
    
    const handlePageChange = (page, pageSize) => {
        dispatch(setPagination({ page, limit: pageSize }));
    };
    
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Тематика',
            dataIndex: 'topic_elective',
            key: 'topic_elective',
        },
        {
            title: 'Преподаватель',
            key: 'teacher',
            render: (_, record) => record.user?.username || 'Не указан',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                    />
                    <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record.id)}
                        loading={loading}
                    />
                </Space>
            ),
        },
    ];
    
    return (
        <Card 
            title="Факультативы по информатике"
            extra={
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                >
                    Добавить факультатив
                </Button>
            }
        >
            <div style={{ marginBottom: 16 }}>
                <Input.Search 
                    placeholder="Поиск по названию или тематике"
                    allowClear
                    enterButton
                    onSearch={value => setSearchTerm(value)}
                    style={{ width: 300 }}
                />
            </div>
            
            <Table 
                columns={columns}
                dataSource={electives}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
            
            <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Pagination
                    current={pagination.page}
                    pageSize={pagination.limit}
                    total={pagination.total}
                    onChange={handlePageChange}
                    showSizeChanger
                    showTotal={(total) => `Всего ${total} факультативов`}
                />
            </div>
            
            <Modal
                title={currentElective ? 'Редактировать факультатив' : 'Создать факультатив'}
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="topic_elective"
                        label="Тематика"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    
                    <Form.Item
                        name="id_user"
                        label="Преподаватель"
                        rules={[{ required: true, message: 'Пожалуйста, выберите преподавателя' }]}
                    >
                        <Select
                            placeholder="Выберите преподавателя"
                            loading={usersLoading}
                            notFoundContent={usersLoading ? <Spin size="small" /> : 'Нет преподавателей'}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {teachers.map(teacher => (
                                <Option key={teacher.id_user} value={teacher.id_user}>
                                    {teacher.username} ({teacher.email})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default ElectivesPage;
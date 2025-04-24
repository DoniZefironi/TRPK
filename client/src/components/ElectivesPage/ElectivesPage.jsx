import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchElectives, 
    createElective, 
    updateElective, 
    deleteElective,
    clearCurrentElective,
    setPagination
} from '../store/slices/electiveInformaticsSlice';
import { Button, Table, Modal, Form, Input, message, Pagination, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ElectivesPage = () => {
    const dispatch = useDispatch();
    const { 
        electives, 
        currentElective, 
        loading, 
        error,
        pagination 
    } = useSelector(state => state.electives);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        dispatch(fetchElectives({ 
            page: pagination.page, 
            limit: pagination.limit,
            search: searchTerm
        }));
    }, [dispatch, pagination.page, pagination.limit, searchTerm]);
    
    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);
    
    const handleCreate = () => {
        form.resetFields();
        dispatch(clearCurrentElective());
        setIsModalVisible(true);
    };
    
    const handleEdit = (elective) => {
        form.setFieldsValue({
            name: elective.name,
            topic_elective: elective.topic_elective
        });
        setIsModalVisible(true);
    };
    
    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Удалить факультатив?',
            content: 'Вы уверены, что хотите удалить этот факультатив?',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => dispatch(deleteElective(id))
        });
    };
    
    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                if (currentElective) {
                    dispatch(updateElective({
                        id: currentElective.id,
                        ...values
                    }));
                } else {
                    dispatch(createElective({
                        ...values,
                        id_user: 1 // Здесь должен быть ID текущего пользователя
                    }));
                }
                setIsModalVisible(false);
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
                </Form>
            </Modal>
        </Card>
    );
};

export default ElectivesPage;
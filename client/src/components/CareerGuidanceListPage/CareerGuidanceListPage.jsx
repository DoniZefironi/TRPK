import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCareerGuidances,
  deleteCareerGuidance,
  clearCurrentItem,
} from '../../store/slice/careerGuidanceSlice';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Space,
  DatePicker,
  Card,
  Row,
  Col,
  Pagination,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

const CareerGuidanceListPage = () => {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    error,
    pagination,
  } = useSelector((state) => state.careerGuidance);

  const userRole = useSelector((state) => state.auth.user?.role); // Получение роли пользователя

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    dateFrom: null,
    dateTo: null,
    search: '',
  });

  useEffect(() => {
    dispatch(fetchCareerGuidances(searchParams));
    dispatch(clearCurrentItem());
  }, [dispatch, searchParams]);

  const handleDelete = async (id_guidance) => {
    try {
      await dispatch(deleteCareerGuidance(id_guidance)).unwrap();
      message.success('Запись успешно удалена');
      if (items.length === 1 && pagination.page > 1) {
        setSearchParams(prev => ({ ...prev, page: prev.page - 1 }));
      } else {
        dispatch(fetchCareerGuidances(searchParams));
      }
    } catch (error) {
      message.error('Ошибка при удалении записи: ' + error);
    }
  };

  const handleDateChange = (dates) => {
    setSearchParams(prev => ({
      ...prev,
      dateFrom: dates ? dates[0].format('YYYY-MM-DD') : null,
      dateTo: dates ? dates[1].format('YYYY-MM-DD') : null,
      page: 1,
    }));
  };

  const handlePageChange = (page, pageSize) => {
    setSearchParams(prev => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date_career_guidance',
      key: 'date',
      render: (date) => moment(date).format('DD.MM.YYYY'),
      sorter: (a, b) => new Date(a.date_career_guidance) - new Date(b.date_career_guidance),
    },
    {
      title: 'Тема',
      dataIndex: 'topic_career_guidance',
      key: 'topic',
    },
    {
      title: 'URL на консультацию',
      dataIndex: 'consultants',
      key: 'consultants',
      render: (text) => text || '-',
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) =>
        userRole === 'TEACHER' && (
          <Space size="middle">
            <Link to={`/career-guidance/edit/${record.id_guidance}`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Вы уверены, что хотите удалить эту запись?"
              onConfirm={() => handleDelete(record.id_guidance)}
              okText="Да"
              cancelText="Нет"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <div className="career-guidance-list">
      <Card
        title="Карьерное ориентирование"
        extra={
          userRole === 'TEACHER' && (
            <Link to="/career-guidance/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Добавить запись
              </Button>
            </Link>
          )
        }
      >
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id_guidance"
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
            showTotal={(total) => `Всего записей: ${total}`}
          />
        </div>
      </Card>
    </div>
  );
};

export default CareerGuidanceListPage;

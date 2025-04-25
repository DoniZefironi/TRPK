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
  Input,
  Card,
  Row,
  Col,
  Pagination,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Search } = Input;

const CareerGuidanceListPage = () => {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    error,
    pagination,
  } = useSelector((state) => state.careerGuidance);
  
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

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCareerGuidance(id)).unwrap();
      message.success('Запись успешно удалена');
      // Refresh the list if we're on the last page and it's the only item
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
      page: 1, // Reset to first page when changing filters
    }));
  };

  const handleSearch = (value) => {
    setSearchParams(prev => ({
      ...prev,
      search: value,
      page: 1, // Reset to first page when changing search
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
      title: 'Консультанты',
      dataIndex: 'consultants',
      key: 'consultants',
      render: (text) => text || '-',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/career-guidance/edit/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Вы уверены, что хотите удалить эту запись?"
            onConfirm={() => handleDelete(record.id)}
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
          <Link to="/career-guidance/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Добавить запись
            </Button>
          </Link>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={handleDateChange}
              format="DD.MM.YYYY"
            />
          </Col>
          <Col span={12}>
            <Search
              placeholder="Поиск по теме или консультантам"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={items}
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
            showTotal={(total) => `Всего записей: ${total}`}
          />
        </div>
      </Card>
    </div>
  );
};

export default CareerGuidanceListPage;
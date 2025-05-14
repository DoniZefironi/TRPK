import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchGroups,
  fetchLectures,
  createScheduleItem,
  fetchGroupSchedule
} from '../../store/slice/scheduleSlice';
import { Button, Select, DatePicker, TimePicker, Form, Table, Modal, message, Card, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const GroupScheduleManager = () => {
  const dispatch = useDispatch();
  const {
    groups = [],
    lectures = [],
    items: scheduleItems = [],
    loading,
    error
  } = useSelector(state => state.schedule);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          dispatch(fetchGroups()),
          dispatch(fetchLectures())
        ]);
      } catch (err) {
        message.error('Ошибка загрузки данных');
      }
    };
    
    loadInitialData();
  }, [dispatch]);

  // Загрузка расписания при выборе группы
  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchGroupSchedule(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  // Обработчик создания нового занятия
  const handleAddScheduleItem = async () => {
    try {
      const values = await form.validateFields();
      const newItem = {
        groupId: selectedGroup,
        lectureId: values.lectureId,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm:ss')
      };
      
      await dispatch(createScheduleItem(newItem));
      message.success('Занятие успешно добавлено');
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      message.error('Ошибка при добавлении занятия');
    }
  };

  // Колонки таблицы расписания
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date).format('DD.MM.YYYY')
    },
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Лекция',
      dataIndex: ['lecture', 'lecture_title'],
      key: 'lecture'
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" danger icon={<DeleteOutlined />} />
        </>
      )
    }
  ];

  return (
    <Card
      title="Управление расписанием группы"
      bordered={false}
      style={{ margin: 20 }}
    >
      <div style={{ marginBottom: 20 }}>
        <Select
          placeholder="Выберите группу"
          style={{ width: 300 }}
          onChange={setSelectedGroup}
          value={selectedGroup}
          loading={loading}
        >
          {groups.map(group => (
            <Option key={group.id} value={group.id}>
              {group.name}
            </Option>
          ))}
        </Select>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: 10 }}
          onClick={() => setIsModalVisible(true)}
          disabled={!selectedGroup || loading}
        >
          Добавить занятие
        </Button>
      </div>

      {selectedGroup ? (
        <Table
          columns={columns}
          dataSource={scheduleItems}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: 20 }}>
          Выберите группу для просмотра расписания
        </div>
      )}

      <Modal
        title="Добавить новое занятие"
        visible={isModalVisible}
        onOk={handleAddScheduleItem}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="lectureId"
            label="Лекция"
            rules={[{ required: true, message: 'Выберите лекцию' }]}
          >
            <Select placeholder="Выберите лекцию" loading={loading}>
              {lectures.map(lecture => (
                <Option key={lecture.id} value={lecture.id}>
                  {lecture.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Дата"
            rules={[{ required: true, message: 'Укажите дату' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="time"
            label="Время"
            rules={[{ required: true, message: 'Укажите время' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default GroupScheduleManager;
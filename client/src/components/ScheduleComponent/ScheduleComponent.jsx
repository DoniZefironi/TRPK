import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createScheduleItem,
  fetchSchedule,
  fetchGroupSchedule,
  fetchScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
  fetchScheduleByDate,
  fetchLectures,
  fetchGroups,
  clearCurrentItem,
  setPagination
} from '../../store/slice/scheduleSlice';
import { Table, Button, Modal, Form, DatePicker, TimePicker, Select, message, Card, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const SchedulePage = () => {
  const dispatch = useDispatch();
  const { 
    items = [], 
    currentItem = null, 
    lectures = [], 
    groups = [], 
    loading = false, 
    error = null,
    pagination = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1
    }
  } = useSelector(state => state.schedule || {});
  
  const [course, setCourse] = useState('electric');
  const [groupId, setGroupId] = useState(null);
  const [date, setDate] = useState(moment());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [dataLoaded, setDataLoaded] = useState({
    lectures: false,
    groups: false
  });

  // Загрузка данных при изменении курса
useEffect(() => {
  const loadInitialData = async () => {
    try {
      setDataLoaded({ lectures: false, groups: false });
      
      const [lecturesResult, groupsResult] = await Promise.allSettled([
        dispatch(fetchLectures(course)),
        dispatch(fetchGroups(course))
      ]);
      
      setDataLoaded({
        lectures: lecturesResult.status === 'fulfilled',
        groups: groupsResult.status === 'fulfilled'
      });
      
      loadSchedule();
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      message.error('Произошла ошибка при загрузке данных');
    }
  };
  
  loadInitialData();
}, [course, dispatch]);

  // Загрузка расписания при изменении группы
  useEffect(() => {
    if (course) {
      loadSchedule();
    }
  }, [groupId, course]);

  const loadSchedule = () => {
    const params = { 
      page: pagination.page,
      limit: pagination.limit
    };
    
    if (groupId) {
      dispatch(fetchGroupSchedule({ course, groupId, params }));
    } else {
      dispatch(fetchSchedule({ course, params }));
    }
  };

  const handleTableChange = (pagination) => {
    dispatch(setPagination({
      page: pagination.current,
      limit: pagination.pageSize
    }));
    loadSchedule();
  };

  const handleDateChange = (date) => {
    setDate(date);
    dispatch(fetchScheduleByDate({ 
      course, 
      date: date.format('YYYY-MM-DD'),
      groupId
    }));
  };

  const showModal = (item = null) => {
    if (item) {
      form.setFieldsValue({
        id_group: item.id_group,
        id_classes: item.id_classes,
        date: moment(item.date),
        time: item.time ? moment(item.time, 'HH:mm:ss') : null
      });
      dispatch(fetchScheduleItem({ course, id: item.id_schedule }));
    } else {
      form.resetFields();
      dispatch(clearCurrentItem());
    }
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time ? values.time.format('HH:mm:ss') : null
      };

      if (currentItem) {
        await dispatch(updateScheduleItem({ 
          course, 
          id: currentItem.id_schedule, 
          data 
        })).unwrap();
        message.success('Занятие успешно обновлено');
      } else {
        await dispatch(createScheduleItem({ course, data })).unwrap();
        message.success('Занятие успешно создано');
      }

      setIsModalVisible(false);
      loadSchedule();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      message.error(error.message || 'Произошла ошибка при сохранении');
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteScheduleItem({ course, id })).unwrap();
      message.success('Занятие успешно удалено');
      loadSchedule();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      message.error(error.message || 'Не удалось удалить занятие');
    }
  };

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD.MM.YYYY')
    },
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
      render: (time) => time || '-'
    },
    {
      title: 'Группа',
      dataIndex: ['group', 'name'],
      key: 'group'
    },
    {
      title: 'Занятие',
      dataIndex: ['lecture', 'lecture_title'],
      key: 'lecture'
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id_schedule)}
          />
        </>
      )
    }
  ];

  return (
    <div className="schedule-page">
      <Card
        title="Управление расписанием"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            disabled={!dataLoaded.groups || !dataLoaded.lectures}
          >
            Добавить занятие
          </Button>
        }
      >
        <div className="filters" style={{ marginBottom: 16 }}>
          <Select
            value={course}
            onChange={setCourse}
            style={{ width: 150, marginRight: 8 }}
            loading={loading}
          >
            <Option value="electric">Электрика</Option>
            <Option value="iot">IoT</Option>
            <Option value="informatics">Информатика</Option>
          </Select>

<Select
  value={groupId}
  onChange={setGroupId}
  placeholder="Выберите группу"
  style={{ width: 200, marginRight: 8 }}
  allowClear
  loading={!dataLoaded.groups}
  disabled={!dataLoaded.groups || loading}
>
  {groups.map(group => (
    <Option key={group.id_group} value={group.id_group}>
      {group.name}
    </Option>
  ))}
</Select>

          <DatePicker
            value={date}
            onChange={handleDateChange}
            suffixIcon={<CalendarOutlined />}
            style={{ width: 200 }}
            disabled={loading}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={items}
              rowKey="id_schedule"
              loading={loading}
              pagination={{
                current: pagination.page,
                pageSize: pagination.limit,
                total: pagination.total,
                showSizeChanger: true
              }}
              onChange={handleTableChange}
            />

            <Modal
              title={currentItem ? "Редактировать занятие" : "Добавить занятие"}
              open={isModalVisible}
              onOk={handleSubmit}
              onCancel={() => {
                setIsModalVisible(false);
                dispatch(clearCurrentItem());
              }}
              confirmLoading={loading}
            >
              <Form form={form} layout="vertical">
                <Form.Item
                  name="id_group"
                  label="Группа"
                  rules={[{ required: true, message: 'Выберите группу' }]}
                >
                  <Select 
                    placeholder="Выберите группу"
                    loading={!dataLoaded.groups}
                    disabled={!dataLoaded.groups}
                  >
                    {groups.map(group => (
                      <Option key={group.id_group} value={group.id_group}>
                        {group.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="id_classes"
                  label="Занятие"
                  rules={[{ required: true, message: 'Выберите занятие' }]}
                >
<Select 
  placeholder="Выберите занятие"
  loading={!dataLoaded.lectures}
  disabled={!dataLoaded.lectures}
>
  {lectures.map(lecture => (
    <Option key={lecture.id_classes} value={lecture.id_classes}>
      {lecture.lecture_title}
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
                >
                  <TimePicker format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </Card>
    </div>
  );
};

export default SchedulePage;
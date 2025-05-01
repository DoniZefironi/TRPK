import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCareerGuidanceById } from '../../store/slice/careerGuidanceSlice';
import { Button, Card, Descriptions, Spin, message, Space } from 'antd';
import moment from 'moment';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const CareerGuidanceViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { currentItem, loading, error } = useSelector(
    (state) => state.careerGuidance
  );

  useEffect(() => {
    dispatch(fetchCareerGuidanceById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div className="career-guidance-view">
      <Card
        title="Просмотр записи о карьерном ориентировании"
        extra={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/career-guidance')}
            >
              Назад
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/career-guidance/edit/${id}`)}
            >
              Редактировать
            </Button>
          </Space>
        }
      >
        <Spin spinning={loading}>
          {currentItem && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Дата">
                {moment(currentItem.date_career_guidance).format('DD.MM.YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Тема">
                {currentItem.topic_career_guidance}
              </Descriptions.Item>
              <Descriptions.Item label="Консультанты">
                {currentItem.consultants || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Дата создания">
                {moment(currentItem.createdAt).format('DD.MM.YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Дата обновления">
                {moment(currentItem.updatedAt).format('DD.MM.YYYY HH:mm')}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default CareerGuidanceViewPage;
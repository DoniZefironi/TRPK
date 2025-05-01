import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchCareerGuidanceById,
  createCareerGuidance,
  updateCareerGuidance,
  resetError,
} from '../../store/slice/careerGuidanceSlice';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  Spin,
  message,
  Row,
  Col,
} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CareerGuidanceFormPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id_guidance } = useParams();
  
  const { currentItem, loading, error } = useSelector(
    (state) => state.careerGuidance
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id_guidance) {
      dispatch(fetchCareerGuidanceById(id_guidance));
    } else {
      form.resetFields();
    }
  }, [id_guidance, dispatch, form]);

  useEffect(() => {
    if (currentItem && id_guidance) {
      form.setFieldsValue({
        date_career_guidance: moment(currentItem.date_career_guidance),
        topic_career_guidance: currentItem.topic_career_guidance,
        consultants: currentItem.consultants || '',
      });
    }
  }, [currentItem, id_guidance, form]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const data = {
        date_career_guidance: values.date_career_guidance.format('YYYY-MM-DD'),
        topic_career_guidance: values.topic_career_guidance,
        consultants: values.consultants || null,
      };

      if (id_guidance) {
        await dispatch(updateCareerGuidance({ id_guidance, data })).unwrap();
        message.success('Запись успешно обновлена');
      } else {
        await dispatch(createCareerGuidance(data)).unwrap();
        message.success('Запись успешно создана');
      }
      navigate('/career-guidance');
    } catch (error) {
      message.error('Ошибка: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="career-guidance-form">
      <Card
        title={id_guidance ? 'Редактирование записи' : 'Создание новой записи'}
        extra={
          <Button onClick={() => navigate('/career-guidance')}>
            Назад к списку
          </Button>
        }
      >
        <Spin spinning={loading && !isSubmitting}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              date_career_guidance: moment(),
              topic_career_guidance: '',
              consultants: '',
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="date_career_guidance"
                  label="Дата"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, укажите дату',
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD.MM.YYYY"
                    disabledDate={(current) =>
                      current && current > moment().endOf('day')
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="topic_career_guidance"
              label="Тема"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, укажите тему',
                },
                {
                  max: 255,
                  message: 'Максимальная длина 255 символов',
                },
              ]}
            >
              <Input placeholder="Введите тему карьерного ориентирования" />
            </Form.Item>

            <Form.Item
              name="consultants"
              label="Консультанты"
              rules={[
                {
                  max: 255,
                  message: 'Максимальная длина 255 символов',
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Введите имена консультантов (если есть)"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                {id_guidance ? 'Обновить' : 'Создать'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default CareerGuidanceFormPage;
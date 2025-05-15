import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLectureGrades,
  addNewGrade,
  updateExistingGrade,
  clearLectureGrades
} from '../../store/slice/journalSlice';
import { fetchLessons } from '../../store/slice/lectureSlice';
import { getAllUsers } from '../../store/slice/userSlice';
import { Select, Button, Table, message, Spin, Card, Row, Col } from 'antd';

const { Option } = Select;

const GradeManagementPage = () => {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [gradesData, setGradesData] = useState({});
  const [performanceData, setPerformanceData] = useState({});

  // Получаем данные из Redux store
  const {
    byCourse: lessonsByCourse,
    loading: lessonsLoading,
    error: lessonsError
  } = useSelector((state) => state.lessons);

  const {
    users,
    loading: usersLoading,
    error: usersError
  } = useSelector((state) => state.user);

  const {
    lectureGrades,
    loading: gradesLoading,
    error: gradesError
  } = useSelector((state) => state.journal);

  // Доступные курсы
  const availableCourses = [
    { value: 'electric', label: 'Электроника' },
    { value: 'iot', label: 'IoT' },
    { value: 'informatics', label: 'Информатика' }
  ];

  // Варианты успеваемости
  const performanceOptions = [
    { value: 'excellent', label: 'Отлично' },
    { value: 'good', label: 'Хорошо' },
    { value: 'satisfactory', label: 'Удовлетворительно' },
    { value: 'unsatisfactory', label: 'Неудовлетворительно' }
  ];

  // Обработчик выбора курса
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLecture(null);
    dispatch(clearLectureGrades());
    dispatch(fetchLessons(course));
    dispatch(getAllUsers());
  };

  // Обработчик выбора лекции с обработкой ошибок
  const handleLectureSelect = async (lectureId) => {
    try {
      setSelectedLecture(lectureId);
      if (selectedCourse) {
        await dispatch(fetchLectureGrades({ 
          course: selectedCourse, 
          lectureId 
        })).unwrap();
      }
    } catch (error) {
      console.error('Ошибка загрузки оценок:', error);
      message.error(`Не удалось загрузить оценки: ${error.message}`);
    }
  };

  // Обновляем локальное состояние оценок
  useEffect(() => {
    if (lectureGrades) {
      const newGrades = {};
      const newPerformance = {};
      
      lectureGrades.grades?.forEach(grade => {
        newGrades[grade.id_user] = grade.grades;
        newPerformance[grade.id_user] = grade.academic_performance;
      });
      
      setGradesData(newGrades);
      setPerformanceData(newPerformance);
    }
  }, [lectureGrades]);
useEffect(() => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);

    if (user) {
      setUserRole(user.role); // если роль хранится в user.role
    }

    if (user && user.permissions) {
      const perm = typeof user.permissions === 'string' 
        ? user.permissions.toLowerCase()
        : Array.isArray(user.permissions) && user.permissions.length === 1
          ? user.permissions[0].toLowerCase()
          : null;

      if (perm) {
        setSelectedCourse(perm);
        dispatch(fetchLessons(perm));
        dispatch(getAllUsers());
      }
    }
  } catch (error) {
    console.error('Ошибка чтения пользователя из localStorage:', error);
  }
}, [dispatch]);

  // Фильтрация пользователей по курсу с учетом разных форматов permissions
  const courseUsers = useMemo(() => {
    if (!selectedCourse || !users?.length) return [];
    
    return users.filter(user => {
      try {
        if (!user.permissions) return false;
        
        const courseLower = selectedCourse.toLowerCase();
        const permissions = user.permissions;

        // Если permissions - массив
        if (Array.isArray(permissions)) {
          return permissions.some(p => 
            String(p).toLowerCase() === courseLower
          );
        }
        
        // Если permissions - строка
        if (typeof permissions === 'string') {
          return permissions.toLowerCase()
            .split(',')
            .map(p => p.trim())
            .includes(courseLower);
        }
        
        return false;
      } catch (error) {
        console.error('Ошибка фильтрации пользователя:', user.id_user, error);
        return false;
      }
    });
  }, [users, selectedCourse]);

  // Обработчик изменения оценки
  const handleGradeChange = (userId, value) => {
    setGradesData(prev => ({
      ...prev,
      [userId]: value
    }));
  };

  // Обработчик изменения успеваемости
  const handlePerformanceChange = (userId, value) => {
    setPerformanceData(prev => ({
      ...prev,
      [userId]: value
    }));
  };

  // Сохранение оценок с улучшенной обработкой ошибок
  const handleSaveGrades = async () => {
    if (!selectedCourse || !selectedLecture) {
      message.warning('Пожалуйста, выберите курс и лекцию');
      return;
    }

    try {
      const updates = [];
      let savedCount = 0;
      
      for (const user of courseUsers) {
        const grade = gradesData[user.id_user];
        const performance = performanceData[user.id_user];
        
        if (grade == null && performance == null) continue;
        
        const gradeData = {
          id_user: user.id_user,
          id_classes: selectedLecture,
          grades: grade,
          academic_performance: performance
        };

        const existingGrade = lectureGrades?.grades?.find(
          g => g.id_user === user.id_user
        );

        try {
          if (existingGrade) {
            await dispatch(updateExistingGrade({
              course: selectedCourse,
              id: existingGrade.id,
              data: gradeData
            })).unwrap();
          } else {
            await dispatch(addNewGrade({
              course: selectedCourse,
              data: gradeData
            })).unwrap();
          }
          savedCount++;
        } catch (error) {
          console.error(`Ошибка сохранения оценки для пользователя ${user.id_user}:`, error);
        }
      }
      
      if (savedCount > 0) {
        message.success(`Сохранено ${savedCount} оценок`);
        dispatch(fetchLectureGrades({ 
          course: selectedCourse, 
          lectureId: selectedLecture 
        }));
      } else {
        message.info('Нет изменений для сохранения');
      }
    } catch (error) {
      console.error('Ошибка сохранения оценок:', error);
      message.error('Ошибка при сохранении оценок');
    }
  };

  // Получаем лекции для выбранного курса
  const currentCourseLessons = selectedCourse 
    ? lessonsByCourse[selectedCourse] || []
    : [];

  // Колонки таблицы
  const columns = [
    {
      title: 'Студент',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '0.8em', color: '#666' }}>
            {record.email}
          </div>
        </div>
      )
    },
    {
      title: 'Оценка',
      dataIndex: 'grade',
      key: 'grade',
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          value={gradesData[record.id_user] ?? undefined}
          onChange={(value) => handleGradeChange(record.id_user, value)}
          placeholder="Выберите оценку"
          allowClear
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Option key={num} value={num}>
              {num}
            </Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Успеваемость',
      dataIndex: 'performance',
      key: 'performance',
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          value={performanceData[record.id_user] ?? undefined}
          onChange={(value) => handlePerformanceChange(record.id_user, value)}
          placeholder="Успеваемость"
          allowClear
        >
          {performanceOptions.map(opt => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      )
    }
  ];
  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);

      if (user && user.permissions) {
        // permissions может быть строкой (например, "Informatics")
        // Приведем к нижнему регистру, чтобы совпадало с availableCourses
        const perm = typeof user.permissions === 'string' 
          ? user.permissions.toLowerCase()
          : Array.isArray(user.permissions) && user.permissions.length === 1
            ? user.permissions[0].toLowerCase()
            : null;

        if (perm) {
          setSelectedCourse(perm);
          // Можно сразу вызвать fetchLessons и getAllUsers, чтобы загрузить данные по курсу
          dispatch(fetchLessons(perm));
          dispatch(getAllUsers());
        }
      }
    } catch (error) {
      console.error('Ошибка чтения пользователя из localStorage:', error);
    }
  }, [dispatch]);
  // Логирование для отладки
  useEffect(() => {
    if (selectedCourse) {
      console.log('Отладочная информация:');
      console.log('Выбранный курс:', selectedCourse);
      console.log('Пользователи курса:', courseUsers);
      console.log('Текущие оценки:', gradesData);
    }
  }, [selectedCourse, courseUsers, gradesData]);

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Управление оценками" style={{ marginBottom: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ marginBottom: '16px' }}>
              <label>Курс:</label>
{/* Селектор курса виден и доступен ТОЛЬКО если роль НЕ USER и НЕ TEACHER */}
{userRole !== 'USER' && userRole !== 'TEACHER' ? (
  <Select
    style={{ width: '100%' }}
    value={selectedCourse}
    onChange={handleCourseSelect}
    placeholder="Выберите курс"
    loading={lessonsLoading}
  >
    {availableCourses.map(course => (
      <Option key={course.value} value={course.value}>
        {course.label}
      </Option>
    ))}
  </Select>
) : (
  <Select
    style={{ width: '100%' }}
    value={selectedCourse}
    disabled
  >
    {availableCourses
      .filter(course => course.value === selectedCourse)
      .map(course => (
        <Option key={course.value} value={course.value}>
          {course.label}
        </Option>
      ))}
  </Select>
)}

            </div>
          </Col>
          
          <Col span={16}>
            <div style={{ marginBottom: '16px' }}>
              <label>Лекция:</label>
              <Select
                style={{ width: '100%' }}
                value={selectedLecture}
                onChange={handleLectureSelect}
                placeholder="Выберите лекцию"
                disabled={!selectedCourse || lessonsLoading}
                loading={lessonsLoading || gradesLoading}
              >
                {currentCourseLessons.map(lecture => (
                  <Option 
                    key={lecture.id_classes} 
                    value={lecture.id_classes}
                  >
                    {lecture.lecture_title} ({new Date(lecture.date).toLocaleDateString()})
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
        </Row>
      </Card>

      {usersLoading || lessonsLoading ? (
        <Spin tip="Загрузка данных..." size="large" />
      ) : (
        <>
          {selectedCourse && selectedLecture && (
            <>
              {courseUsers.length > 0 ? (
                <>
                  <Table
                    columns={columns}
                    dataSource={courseUsers}
                    rowKey="id_user"
                    pagination={false}
                    style={{ marginBottom: '20px' }}
                    loading={gradesLoading}
                  />
                  
                  <Button 
                    type="primary" 
                    onClick={handleSaveGrades}
                    disabled={!selectedLecture || !selectedCourse || gradesLoading}
                    loading={gradesLoading}
                  >
                    Сохранить оценки
                  </Button>
                </>
              ) : (
                <Card>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h4>Нет студентов с доступом к курсу "{selectedCourse}"</h4>
                    <p>Проверьте:</p>
                    <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '10px auto' }}>
                      <li>Назначены ли пользователям права на этот курс</li>
                      <li>Соответствие формата данных (проверьте консоль)</li>
                    </ul>
                  </div>
                </Card>
              )}
            </>
          )}
        </>
      )}

      {(lessonsError || usersError || gradesError) && (
        <div style={{ 
          color: 'red', 
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#fff2f0',
          border: '1px solid #ffccc7'
        }}>
          {lessonsError || usersError || gradesError}
        </div>
      )}
    </div>
  );
};

export default GradeManagementPage;
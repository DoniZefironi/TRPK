import React, { useState } from 'react';
import './ContactForm.css';
import illustration from '../../img/illustrationContact.png'; 
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    alert('Ваше сообщение отправлено!');
  };

  return (
    <section className="contact-form-section">
              <div className="contact-illustration">
        <img src={illustration} alt="Иллюстрация поддержки" />
      </div>
      <div className="contact-form-container">
        <h2>Есть вопросы?</h2>
        <h3>Напишите нам</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Имя*
            <input
              type="text"
              name="firstName"
              placeholder="Ваше имя"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Фамилия*
            <input
              type="text"
              name="lastName"
              placeholder="Ваша фамилия"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Электронная почта*
            <input
              type="email"
              name="email"
              placeholder="Ваш рабочий адрес электронной почты"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Телефон
            <input
              type="tel"
              name="phone"
              placeholder="Ваш номер телефона"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Сообщение*
            <textarea
              name="message"
              placeholder="Ваше сообщение"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            Я согласен получать сообщения от Createx Online School
          </label>
          <button type="submit" className="submit-button">
            Отправить сообщение
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;

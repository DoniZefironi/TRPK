import React from 'react';
import { Link } from 'react-router-dom';
import './ForumList.css'

const ForumSectionCard = ({ section }) => {
  return (
    <div className="card">
      <h3>{section.name}</h3>
      <p>{section.description}</p>
      <Link 
        to={`/forum/sections/${section.id}`} 
        className="btn-forum"
      >
        Перейти
      </Link>
    </div>
  );
};

export default ForumSectionCard;
import React from 'react';
import { Link } from 'react-router-dom';

const ForumSectionCard = ({ section }) => {
  return (
    <div className="card">
      <h3>{section.name}</h3>
      <p>{section.description}</p>
      <Link 
        to={`/forum/sections/${section.id}`} 
        className="btn btn-primary"
      >
        Перейти
      </Link>
    </div>
  );
};

export default ForumSectionCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.css';

const GroupCard = ({ group, course }) => {
  return (
    <Link 
      to={`/groups/${course}/${group.id_group}`}
      className="group-card-link"
    >
      <div className="group-card">
        <h3>{group.name}</h3>
        <p className="description">{group.description}</p>
        <div className="meta-info">
          <span>Участников: {group.member_count || 0}</span>
          <span>Статус: {group.status}</span>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
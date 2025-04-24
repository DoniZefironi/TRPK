import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGroupDetails, fetchGroupMembers } from '../../store/slice/groupSlice';
import GroupDetails from '../GroupDetails/GroupDetails';
import './GroupCard.css';

const GroupCard = ({ group, course }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    if (!isExpanded) {
      dispatch(fetchGroupDetails({ 
        course: course, 
        id: group.id_group 
      }));
      dispatch(fetchGroupMembers({ 
        course: course, 
        id: group.id_group 
      }));
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`group-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="group-summary" onClick={toggleExpand}>
        <h3>{group.name}</h3>
        <p>{group.description}</p>
        <span className="toggle-icon">
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="group-details-container">
          <GroupDetails groupId={group.id_group} />
        </div>
      )}
    </div>
  );
};

export default GroupCard;
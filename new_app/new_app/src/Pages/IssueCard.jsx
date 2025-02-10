import React from "react";
import { Link } from "react-router-dom";
// import "./IssueCard.css";

const IssueCard = ({
  title,
  description,
  increaseCounter,
  counterValue,
  issueStatus,
  decreaseCounter,
  onDelete,
  onEdit,
  showComments,
  CommentsNumber,
  documentId,
  id,
}) => {
  const badgeColors = {
    Open: "badge-red",
    Closed: "badge-green",
    "In-progress": "badge-yellow",
  };

  return (
    <div className="issue-card">
      <div className="card-content">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span className={`badge ${badgeColors[issueStatus]}`}>{issueStatus}</span>
        </div>

        <p className="description">{description}</p>

        <div className="controls">
          <div className="counter-group">
            <button onClick={() => increaseCounter(id)} className="counter-btn">+</button>
            <span className="counter-value">{counterValue}</span>
            <button onClick={() => decreaseCounter(id)} className="counter-btn">-</button>
          </div>

          <div className="buttons-group">
            <button onClick={() => onDelete(documentId)} className="icon-btn delete-btn">🗑️</button>
            <Link to="/edit" className="icon-btn edit-btn">✏️</Link>
            <button onClick={showComments} className="icon-btn comments-btn">
              💬 <span className="comment-count">{CommentsNumber}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;

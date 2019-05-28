import React from 'react';

function CommentsList(props) {
  return (
    <ul id="comments-list">
      {props.comments.map((comment, index) => (
        <li key={index}>
          <p>
            <span className="author">{comment.author}</span>:
          </p>
          <div className="text">{comment.text}</div>
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;

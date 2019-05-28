import React, { useRef } from 'react';

function CommentForm(props) {
  const authorNameEl = useRef(null);
  const commentTextEl = useRef(null);

  const handleOnSubmit = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    props.onAddComment({
      author: authorNameEl.current.value,
      text: commentTextEl.current.value,
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="author-name">Author name:</label>
        <input id="author-name" data-testid="author-name" ref={authorNameEl} />
      </div>
      <div>
        <label htmlFor="comment-text">Comment:</label>
        <input
          id="comment-text"
          data-testid="comment-text"
          ref={commentTextEl}
        />
      </div>
      <button type="submit" id="add-comment-btn" data-testid="add-comment-btn">
        Add
      </button>
    </form>
  );
}

export default CommentForm;

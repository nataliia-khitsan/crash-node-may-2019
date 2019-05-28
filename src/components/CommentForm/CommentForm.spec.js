import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CommentForm from './CommentForm';

it('should pass comment object when Add button click', () => {
  const spy = jest.fn();

  const authorName = 'Marilyn Monroe';
  const commentText = 'Bonjour';

  const { getByTestId } = render(<CommentForm onAddComment={spy} />);

  const author = getByTestId('author-name');
  const text = getByTestId('comment-text');
  const addButton = getByTestId('add-comment-btn');

  fireEvent.change(author, {
    target: { value: authorName },
  });

  fireEvent.change(text, {
    target: { value: commentText },
  });

  fireEvent.click(addButton);
  expect(spy).toHaveBeenCalledWith({ author: authorName, text: commentText });
});

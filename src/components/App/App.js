import React, {useState, useEffect} from 'react';
import {translate} from 'react-i18next';
import CommentForm from "../CommentForm/CommentForm";
import axios from 'axios';
import CommentsList from "../CommentsList/CommentsList";

function App() {
  const [fetchCount, setFetchCount] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  });

  const onAddComment = async (comment) => {
    console.log('onAddComment', comment);
    await axios.post('/comments', comment);
    setFetchCount(fetchCount + 1);
  };

  const fetchComments = async () => {
    const {data: comments} = await axios.get('/comments');
    setComments(comments);
  };

  return (
    <div>
      <CommentForm onAddComment={onAddComment}/>
      <CommentsList comments={comments}/>
    </div>
  );
}

export default translate()(App);

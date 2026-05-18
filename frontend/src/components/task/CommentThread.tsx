import React, { useState } from 'react';
import { useComments, useAddComment } from '@/api/comments';
import { useUsers } from '@/api/users';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import { format } from 'date-fns';
import './CommentThread.css';

interface CommentThreadProps {
  taskId: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({ taskId }) => {
  const { data: comments, isLoading } = useComments(taskId);
  const { data: users } = useUsers();
  const [newComment, setNewComment] = useState('');
  const addCommentMutation = useAddComment();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addCommentMutation.mutateAsync({
      taskId,
      body: newComment,
    });
    setNewComment('');
  };

  const getUser = (id: number) => users?.find(u => u.id === id);

  return (
    <div className="comment-thread">
      <h3 className="comment-thread__title">댓글 {comments?.length || 0}</h3>

      <div className="comment-list">
        {comments?.map(comment => {
          const author = getUser(comment.authorId);
          return (
            <div key={comment.id} className="comment-item">
              <Avatar name={author?.name || 'Unknown'} size="sm" />
              <div className="comment-item__content">
                <div className="comment-item__header">
                  <span className="comment-item__author">{author?.name}</span>
                  <span className="comment-item__date">
                    {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
                <div className="comment-item__body">{comment.body}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="comment-form">
        <textarea
          className="input comment-form__input"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="comment-form__actions">
          <Button size="sm" onClick={handleAddComment} loading={addCommentMutation.isPending}>
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentThread;

import React, { useState } from "react";
import styles from "./Coment.module.css";
import { ThumbsUp, Trash } from "phosphor-react";
import Avatar from "../Avatar/Avatar";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

const Comment: React.FC<CommentProps> = ({ content, onDeleteComment }) => {
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => state + 1);
  };

  return (
    <div className={styles.comments}>
      <Avatar
        hasBorder={false}
        src="https://avatars.githubusercontent.com/u/21373296?v=4"
      />
      <div className={styles.commentsBox}>
        <div className={styles.commentsContent}>
          <header>
            <div className={styles.authorEndTime}>
              <strong>Devon Lane (você)</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11T08:13:00">
                Cerca de 2h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Comment;

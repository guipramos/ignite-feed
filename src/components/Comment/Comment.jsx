import React, { useState } from "react";
import styles from "./Coment.module.css";
import { ThumbsUp, Trash } from "phosphor-react";
import Avatar from "../Avatar/Avatar";

const Comment = ({ content, onDeleteComment }) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1;
    });
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
              <time
                title="11 de Maio às 08:13h"
                dateTime="11 de Maio às 08:13h"
              >
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

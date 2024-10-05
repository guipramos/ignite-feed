import React, { useState } from "react";
import styles from "./Post.module.css";
import Comment from "../Comment/Comment";
import Avatar from "../Avatar/Avatar";
import moment from "moment";

const Post = ({ author, publishedAt, content }) => {
  const [comments, setComments] = useState(["Post muito bacana, hein?!"]);
  const [newCommentText, setNewCommentText] = useState("");
  const dateFormat = moment(publishedAt).format("l");
  const publishedDateRelativeToNow = moment(dateFormat, "YYYYMMDD").fromNow();

  const handleCreateNewComment = (e) => {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };

  const handleNewCommentChange = (e) => {
    e.target.setCustomValidity("");
    setNewCommentText(e.target.value);
  };

  const handleNewCommentInvalid = () => {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  };

  const deleteComment = (commentToDelete) => {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setComments(commentsWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={dateFormat} dateTime="11 de Maio às 08:13h">
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          onChange={handleNewCommentChange}
          value={newCommentText}
          placeholder="Deixe um comentário"
          onIsvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
};

export default Post;

import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Post.module.css";
import Comment from "../Comment/Comment";
import Avatar from "../Avatar/Avatar";
import moment from "moment";

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: string | Date;
  content: Content[];
}

const Post: React.FC<PostProps> = ({ author, publishedAt, content }) => {
  const [comments, setComments] = useState<string[]>([
    "Post muito bacana, hein?!",
  ]);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const dateFormat = moment(publishedAt).format("l");
  const publishedDateRelativeToNow = moment(dateFormat, "YYYYMMDD").fromNow();

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("");
    setNewCommentText(e.target.value);
  };

  const handleNewCommentInvalid = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("Esse campo é obrigatório!");
  };

  const deleteComment = (commentToDelete: string) => {
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

        <time title={dateFormat} dateTime={String(publishedAt)}>
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
          onInvalid={handleNewCommentInvalid}
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

import React, { MouseEventHandler } from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import styles from "./style.module.scss";

export type NoteBlockProps = {
  createdDate: string;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onEdit: MouseEventHandler<HTMLButtonElement>;
  title: string;
};

function NoteBlock({
  createdDate,
  onDelete,
  onEdit,
  title,
}: NoteBlockProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>{createdDate}</p>
      <p className={styles.title}>{title}</p>
      <div className={styles.buttonsWrapper}>
        <button onClick={onEdit}>
          <RiEditLine size={20} />
        </button>
        <button onClick={onDelete}>
          <RiDeleteBinLine size={20} />
        </button>
      </div>
    </div>
  );
}

export default NoteBlock;

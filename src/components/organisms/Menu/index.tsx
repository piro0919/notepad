import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import {
  IoIosCreate,
  IoIosList,
  // IoIosSearch,
  IoIosSettings,
} from "react-icons/io";
import styles from "./style.module.scss";

function Menu(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <aside className={styles.aside}>
      <Link href="/notes/new">
        <a
          className={`${styles.anchor} ${
            pathname === "/notes/new" ? styles.active : ""
          }`}
        >
          <IoIosCreate className={styles.icon} />
          <span className={styles.text}>新規メモ</span>
        </a>
      </Link>
      <Link href="/">
        <a
          className={`${styles.anchor} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          <IoIosList className={styles.icon} />
          <span className={styles.text}>メモ一覧</span>
        </a>
      </Link>
      {/* <Link href="/search">
        <a
          className={`${styles.anchor} ${
            pathname === "/search" ? styles.active : ""
          }`}
        >
          <IoIosSearch className={styles.icon} />
          <span className={styles.text}>メモ検索</span>
        </a>
      </Link> */}
      <Link href="/settings">
        <a
          className={`${styles.anchor} ${
            pathname === "/settings" ? styles.active : ""
          }`}
        >
          <IoIosSettings className={styles.icon} />
          <span className={styles.text}>おんめも設定</span>
        </a>
      </Link>
    </aside>
  );
}

export default Menu;

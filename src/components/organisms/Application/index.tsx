import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import BarLoader from "react-spinners/BarLoader";
import swal from "sweetalert";
import usePwa2 from "use-pwa2";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";

export type ApplicationProps = {
  onDisplayQrCode: ButtonProps["onClick"];
  setActive: (active: boolean) => void;
};

function Application({
  onDisplayQrCode,
  setActive,
}: ApplicationProps): JSX.Element {
  const { enabledInstall, enabledUpdate, installPwa, isLoading, updatePwa } =
    usePwa2();
  const router = useRouter();
  const handleUpdate = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(async () => {
    const result = await swal({
      buttons: {
        cancel: {
          className: "sweet-button",
          text: "キャンセル",
          visible: true,
        },
        confirm: { className: "sweet-button", text: "OK", visible: true },
      },
      icon: "info",
      text: "おんめもをアップデートしますか？",
      title: "アップデートする",
    });

    if (!result) {
      return;
    }

    setActive(true);

    const result2 = await updatePwa();

    setActive(false);

    if (result2) {
      await swal({
        buttons: {
          confirm: { className: "sweet-button", text: "OK", visible: true },
        },
        icon: "success",
        text: "このページを再読み込みします",
        title: "アップデートが完了しました",
      });

      router.reload();

      return;
    }

    await swal({
      buttons: {
        confirm: { className: "sweet-button", text: "OK", visible: true },
      },
      icon: "error",
      text: "アップデート中にエラーが起きました",
      title: "アップデートに失敗しました",
    });
  }, [router, setActive, updatePwa]);
  const pwa = useMemo(() => {
    if (isLoading) {
      return <BarLoader color="#fff" height={1} width={64} />;
    }

    if (enabledInstall) {
      return <Button onClick={installPwa}>インストール</Button>;
    }

    if (enabledUpdate) {
      return <Button onClick={handleUpdate}>アップデート</Button>;
    }

    return <div>ー</div>;
  }, [enabledInstall, enabledUpdate, handleUpdate, installPwa, isLoading]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filedWrapper}>
        <div>PWA</div>
        {pwa}
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <div>Google Play ストア</div>
        <a
          className={styles.anchor}
          href="https://play.google.com/store/apps/details?id=link.kk_web.on_memo.twa"
          rel="noreferrer"
          target="_blank"
        >
          リンク
          <HiOutlineExternalLink />
        </a>
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <div>QRコード</div>
        <Button onClick={onDisplayQrCode}>表示する</Button>
      </div>
    </div>
  );
}

export default Application;

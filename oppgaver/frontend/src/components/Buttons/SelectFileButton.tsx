import React from "react";
import styles from "./Button.module.css";

interface props {
  onFileChange: (file: File | null) => void;
}

export function SelectFileButton({ onFileChange }: props) {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  function handleClick() {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    onFileChange(selectedFile || null);
  }

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        Velg Fil
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/png, image/jpeg, image/jpg"
      />
    </>
  );
}

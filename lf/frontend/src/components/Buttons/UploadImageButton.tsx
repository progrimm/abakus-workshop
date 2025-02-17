import styles from "./Button.module.css";

interface GenerateRecipeButtonProps {
  file: File | null;
  onSend: () => void;
  onDone: (aiTags: string[] | undefined) => void;
}

export default function UploadImageButton({
  file,
  onSend,
  onDone,
}: GenerateRecipeButtonProps) {
  const uploadImage = async (file: File): Promise<string[] | undefined> => {
    if (!file) {
      console.log("Ingen fil valgt");
      return [];
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "http://127.0.0.1:5000/recognize_ingredients",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorJson = await response.json();
        console.error(
          "uploadImage failed\n",
          "Status code: " + response.status + "\n",
          "Error message: " + errorJson.error + "\n",
        );
        return undefined;
      }

      const data = await response.json();
      console.log("uploadImage Response:", data);
      return data;
    } catch (error) {
      console.error("Error during upload:", error);
      return undefined;
    }
  };
  const handleClick = async () => {
    if (file) {
      onSend();
      try {
        const aiTags = await uploadImage(file);

        onDone(aiTags);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      onSend();
    }
  };

  return (
    <div>
      <button className={styles.buttons} onClick={handleClick}>
        {" "}
        Send
      </button>
    </div>
  );
}

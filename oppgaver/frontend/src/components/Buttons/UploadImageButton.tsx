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
    /**
     * TODO oppgave 1.4.5
     * Check if a file is selected
     * If no file is selected, log "No file selected" and return an empty list
     */
    try {
      const formData = new FormData();
      formData.append("image", file);

      /**
       * TODO oppgave 1.4.6
       * Modify the method under with "http://127.0.0.1:5000/recognize_ingredients" endpoint using a POST request
       * Pass the FormData object as the body of the request
       */

      const response = await fetch("TODO", {
        method: "TODO",
        body: "TODO",
      });
      if (!response.ok) {
        const errorJson = await response.json();
        console.error(
          "uploadImage failed\n",
          "Status code: " + response.status + "\n",
          "Error message: " + errorJson.error + "\n",
        );
        return undefined;
      }
      /**
       * TODO oppgave 1.5.5
       * Convert the server response to JSON format
       */

      const data = await //TODO ;
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

  return <div>/* TODO 1.4.3 and 1.4.4 Add an button with onClick event */</div>;
}

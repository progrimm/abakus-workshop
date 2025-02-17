import { useState, useEffect } from "react";
import styles from "./IngredientTagsContainer.module.css";
import Recipe from "../../model/Recipe.tsx";

interface TagProps {
  id: number;
  name: string;
}

interface IngredientTagsContainerProps {
  onDone: (recipe: Recipe | undefined) => void;
  setLoading: () => void;
  aiTags: string[];
}

export default function IngredientTagsContainer({
  onDone,
  setLoading,
  aiTags
}: IngredientTagsContainerProps) {
  const [tags, setTags] = useState<TagProps[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (aiTags.length > 0) {
      const initialTags = aiTags.map((name, index) => ({
        id: Date.now() + index,
        name
      }));
      setTags(initialTags);
    }
  }, [aiTags]);

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      const tag: TagProps = {
        id: Date.now(),
        name: newTag.trim()
      };
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (id: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
  };

  const generateRecipe = async (tags: string[]) => {
    setLoading();

    try {
      const response = await fetch("http://localhost:5000/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags})
      });

      if (response.ok) {
        const data = await response.json();
        onDone(data as Recipe);
      }
      else {
        onDone(undefined);
      }
    }
    catch (error) {
      console.error("Error:", error);
      onDone(undefined);
    }
  };

  return (
    <div className={styles.container}>
      <p>
        De følgende ingrediensene ble generert automatisk fra AI-modellen. Du
        kan legge til flere ingredienser eller fjerne de som ikke stemmer.
      </p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <div key={tag.id} className={styles.tag}>
            {tag.name}
            <button
              onClick={() => handleDeleteTag(tag.id)}
              className={styles.deleteButton}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Skriv inn en ingrediens"
          className={styles.inputField}
        />
        <button onClick={handleAddTag} className={styles.addButton}>
          Legg til
        </button>
        <button
          disabled={tags?.length < 1}
          onClick={() => {
            const tagNames = tags.map((tag) => tag.name);
            console.log("Sender til backend:", tagNames);
            generateRecipe(tagNames);
          }}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
}

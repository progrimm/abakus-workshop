from dataclasses import dataclass

from clients.image_generator_client import ImageGeneratorClient
from clients.image_recognition_client import ImageRecognitionClient
from clients.llm_client import LangueModelClient
from model.recipe import Recipe
import uuid

igc = ImageGeneratorClient()
llm = LangueModelClient()


def recipe_prompt(ingredients: list[str]):
    return f"""
You are a really good chef.
Please create some sort of recipe based on the following ingredients.
Be clever and precise.
The following ingredient(s) is all that i have in my fridge: {", ".join(ingredients)}.

Requirements:
- First line of the output is the recipe name
- The output should be formatted in markdown
"""


def image_prompt(recipe: str):
    return f"""
        Slap together some high-effort, sexy photo of the dish described in this recipe.
        Seriously, try hard. Fancy plating and lighting—make it really cool.

        RECIPE:
        {recipe}
    """


@dataclass
class RecipeGenerator:
    image_recognition_client: ImageRecognitionClient
    llm_client: LangueModelClient
    image_generation_client: ImageGeneratorClient

    def generate_recipe(self, ingredients: list[str]):
        # TODO oppgave 2.2 - call azure and return real data

        recipe = llm.generate_text(recipe_prompt(ingredients))
        image = igc.generate_image(image_prompt(recipe))

        unique_id = str(uuid.uuid4())

        recipe_total = Recipe(
            unique_id,
            recipe,
            image,
            ingredients
        )

        return recipe_total

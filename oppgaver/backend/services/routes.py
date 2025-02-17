from flask import Blueprint, request, jsonify
import os
import tempfile
from werkzeug.datastructures import FileStorage

from clients.database import Database
from io import BytesIO
from clients.image_generator_client import ImageGeneratorClient
from clients.image_recognition_client import ImageRecognitionClient
from clients.llm_client import LangueModelClient
from recipe_generator import RecipeGenerator

routes = Blueprint('routes', __name__)

ocr = ImageRecognitionClient()
llm = LangueModelClient()
img_gen = ImageGeneratorClient()
database = Database()

recipe_gen = RecipeGenerator(ocr, llm, img_gen)


@routes.route('/generate_recipe', methods=['POST'])
def generate_recipe():
    if not request.is_json:
        return jsonify({"error": "Request must be in JSON format"}), 400

    data = request.get_json()
    if 'tags' not in data or not isinstance(data['tags'], list):
        return jsonify({"error": "Missing or invalid 'tags' field "}), 400

    result = recipe_gen.generate_recipe(data['tags'])

    if result:
        return jsonify(result)
    else:
        return jsonify({'error': 'Failed to generate recipe'}), 404

# TODO 1.3.2: Define the correct route URL and HTTP method (POST)
@routes.route('/recognize_ingredients', methods=['POST'])
def recognize_ingredients():
    if 'image' not in request.files:
        return jsonify({"error": "No image file found in request"}), 400

    file: FileStorage = request.files['image']

    if not file.filename.endswith(('.jpg', '.jpeg', '.png')):
        return jsonify({"error": "Invalid file type"}), 400

    try:
        file_stream = BytesIO(file.read())
        # TODO 1.3.3: Find out which class and method from Azure Custom Vision to use
        ingredients = ocr.recognize_ingredients(image=file_stream)
        if ingredients:
        # TODO 1.3.4: Return a JSON array containing the recognized ingredients
            return jsonify(ingredients), 200
        else:
            return jsonify({"error": "No ingredients found in the image"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@routes.route('/recipes', methods=['GET'])
def list_recipes():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({"error": "user_id query parameter is required"}), 400

    recipes = database.get_recipes(user_id)
    if recipes:
        return jsonify(recipes), 200
    else:
        return jsonify({"error": "An error occurred while processing your request."}), 500

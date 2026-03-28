from copy import deepcopy
from pathlib import Path
import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
SEEDED_USERS = {
    "1": {"id": "1", "first_name": "Ava", "user_group": 11},
    "2": {"id": "2", "first_name": "Ben", "user_group": 22},
    "3": {"id": "3", "first_name": "Chloe", "user_group": 33},
    "4": {"id": "4", "first_name": "Diego", "user_group": 44},
    "5": {"id": "5", "first_name": "Ella", "user_group": 55},
}
MODEL_PATH = Path(__file__).resolve().parent / "src" / "random_forest_model.pkl"
PREDICTION_COLUMNS = [
    "city",
    "province",
    "latitude",
    "longitude",
    "lease_term",
    "type",
    "beds",
    "baths",
    "sq_feet",
    "furnishing",
    "smoking",
    "cats",
    "dogs",
]
app = Flask(__name__)
CORS(app)
users = deepcopy(SEEDED_USERS)
@app.get("/users")
def get_users():
    return jsonify(list(users.values())), 200
@app.post("/users")
def create_user():
    payload = request.get_json()
    if payload is None:
        return jsonify({"message": "Request body must be JSON."}), 400
    user_id = str(payload.get("id", "")).strip()
    first_name = str(payload.get("first_name", "")).strip()
    user_group = payload.get("user_group")
    if not str(user_id).strip() or not str(first_name).strip() or user_group is None:
        return jsonify({"message": "id, first_name, and user_group are required."}), 400
    if user_id in users:
        return jsonify({"message": f"User {user_id} already exists."}), 409
    users[user_id] = {
        "id": user_id,
        "first_name": first_name,
        "user_group": user_group,
    }
    return jsonify({
        "id": user_id,
        "first_name": first_name,
        "user_group": user_group,
        "message": f"Created user {user_id}.",
    }), 201
@app.put("/users/<user_id>")
def update_user(user_id):
    payload = request.get_json()
    if payload is None:
        return jsonify({"message": "Request body must be JSON."}), 400
    if user_id not in users:
        return jsonify({"message": f"User {user_id} not found."}), 404
    first_name = str(payload.get("first_name", "")).strip()
    user_group = payload.get("user_group")
    if not str(first_name).strip() or user_group is None:
        return jsonify({"message": "first_name and user_group are required."}), 400
    users[user_id] = {
        "id": str(user_id),
        "first_name": first_name,
        "user_group": user_group,
    }
    return jsonify({
        "id": str(user_id),
        "first_name": first_name,
        "user_group": user_group,
        "message": f"Updated user {user_id}.",
    }), 200
@app.delete("/users/<user_id>")
def delete_user(user_id):
    if user_id not in users:
        return jsonify({"message": f"User {user_id} not found."}), 404
    del users[user_id]
    return jsonify({"message": f"Deleted user {user_id}."}), 200
if __name__ == "__main__":
    app.run(debug=True, port=5050)

@app.post("/users")
def create_user():
    payload = request.get_json()

    if payload is None:
        return jsonify({"message": "Request body must be JSON."}), 400

    user_id = str(payload.get("id", "")).strip()
    first_name = str(payload.get("first_name", "")).strip()
    user_group = payload.get("user_group")

    if not str(user_id).strip() or not str(first_name).strip() or user_id is None:
        return jsonify({"message": "id, first_name, and user_group are required."}), 400

    if user_id in users:
        return jsonify({"message": f"User {user_id} already exists."}), 409

    users[user_id] = {
        "id": user_id,
        "first_name": first_name,
        "user_group": user_group,
    }

    return jsonify({
        "id": user_id,
        "first_name": first_name,
        "user_group": user_group,
        "message": f"Created user {user_id}.",
    }), 201


@app.put("/users/<user_id>")
def update_user(user_id):
    payload = request.get_json()

    if payload is None:
        return jsonify({"message": "Request body must be JSON."}), 400

    if user_id not in users:
        return jsonify({"message": f"User {user_id} not found."}), 404

    first_name = str(payload.get("first_name", "")).strip()
    user_group = payload.get("user_group")

    if not first_name or not user_group:
        return jsonify({"message": "first_name and user_group are required."}), 400

    users[user_id] = {
        "id": str(user_id),
        "first_name": first_name,
        "user_group": user_group,
    }

    return jsonify({
        "id": str(user_id),
        "first_name": first_name,
        "user_group": user_group,
        "message": f"Updated user {user_id}.",
    }), 200


@app.delete("/users/<user_id>")
def delete_user(user_id):
    if user_id not in users:
        return jsonify({"message": f"User {user_id} not found."}), 404

    del users[user_id]
    return jsonify({"message": f"Deleted user {user_id}."}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5050)

"""
Assignment 4 - ENSF 381 L01 Group 2
Azlan Qamar: 30241636
Mazin Mazin: 30243457
"""

import json
import random
import re
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# ---------------------------------------------------------------------------
# Load data files
# ---------------------------------------------------------------------------
with open("flavors.json") as f:
    FLAVORS = json.load(f)

with open("reviews.json") as f:
    REVIEWS = json.load(f)

# ---------------------------------------------------------------------------
# In-memory user store
# Pre-populated with one sample user (username: sweet_alice, password: IceCream!23)
# ---------------------------------------------------------------------------


def make_hash(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


USERS = [
    {
        "id": 1,
        "username": "sweet_alice",
        "email": "alice@example.com",
        "password_hash": make_hash("IceCream!23"),
        "cart": [],
        "orders": []
    }
]

next_user_id = 2
next_order_id = 1

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def find_user_by_id(user_id):
    return next((u for u in USERS if u["id"] == user_id), None)


def find_user_by_username(username):
    return next((u for u in USERS if u["username"] == username), None)


def find_flavor_by_id(flavor_id):
    return next((f for f in FLAVORS if f["id"] == flavor_id), None)


def parse_price(price_str):
    """Convert '$4.99' -> 4.99"""
    return float(price_str.replace("$", ""))


def validate_signup(data):
    username = data.get("username", "")
    email = data.get("email", "")
    password = data.get("password", "")

    if not (3 <= len(username) <= 20):
        return "Username must be between 3 and 20 characters."
    if not re.match(r'^[a-zA-Z][a-zA-Z0-9_-]*$', username):
        return "Username must start with a letter and contain only letters, numbers, underscores, or hyphens."
    if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
        return "Email must be in a valid format."
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    if not re.search(r'[A-Z]', password):
        return "Password must contain at least one uppercase letter."
    if not re.search(r'[a-z]', password):
        return "Password must contain at least one lowercase letter."
    if not re.search(r'[0-9]', password):
        return "Password must contain at least one number."
    if not re.search(r'[^A-Za-z0-9]', password):
        return "Password must contain at least one special character."
    return None

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

# 1. POST /signup


@app.route("/signup", methods=["POST"])
def signup():
    global next_user_id
    data = request.get_json()

    error = validate_signup(data)
    if error:
        return jsonify({"success": False, "message": error}), 400

    username = data["username"]
    email = data["email"]
    password = data["password"]

    if find_user_by_username(username):
        return jsonify({"success": False, "message": "Username is already taken."}), 400
    if any(u["email"] == email for u in USERS):
        return jsonify({"success": False, "message": "Email is already registered."}), 400

    new_user = {
        "id": next_user_id,
        "username": username,
        "email": email,
        "password_hash": bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(),
        "cart": [],
        "orders": []
    }
    USERS.append(new_user)
    next_user_id += 1

    return jsonify({"success": True, "message": "Registration successful."}), 201


# 2. POST /login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username", "")
    password = data.get("password", "")

    user = find_user_by_username(username)
    if not user:
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

    if not bcrypt.checkpw(password.encode(), user["password_hash"].encode()):
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "userId": user["id"],
        "username": user["username"]
    })


# 3. GET /reviews
@app.route("/reviews", methods=["GET"])
def get_reviews():
    selected = random.sample(REVIEWS, min(2, len(REVIEWS)))
    return jsonify({"success": True, "message": "Reviews loaded.", "reviews": selected})


# 4. GET /flavors
@app.route("/flavors", methods=["GET"])
def get_flavors():
    return jsonify({"success": True, "message": "Flavors loaded.", "flavors": FLAVORS})


# 5. GET /cart
@app.route("/cart", methods=["GET"])
def get_cart():
    user_id = request.args.get("userId", type=int)
    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404
    return jsonify({"success": True, "message": "Cart loaded.", "cart": user["cart"]})


# 6. POST /cart
@app.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    user = find_user_by_id(data.get("userId"))
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    flavor = find_flavor_by_id(data.get("flavorId"))
    if not flavor:
        return jsonify({"success": False, "message": "Flavor not found."}), 404

    existing = next(
        (i for i in user["cart"] if i["flavorId"] == flavor["id"]), None)
    if existing:
        return jsonify({"success": False, "message": "Flavor already in cart. Use PUT /cart to update quantity."}), 400

    user["cart"].append({
        "flavorId": flavor["id"],
        "name": flavor["name"],
        "price": parse_price(flavor["price"]),
        "quantity": 1
    })
    return jsonify({"success": True, "message": "Flavor added to cart.", "cart": user["cart"]})


# 7. PUT /cart
@app.route("/cart", methods=["PUT"])
def update_cart():
    data = request.get_json()
    user = find_user_by_id(data.get("userId"))
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    flavor_id = data.get("flavorId")
    quantity = data.get("quantity")

    if quantity < 1:
        return jsonify({"success": False, "message": "Quantity must be at least 1."}), 400

    item = next((i for i in user["cart"] if i["flavorId"] == flavor_id), None)
    if not item:
        return jsonify({"success": False, "message": "Flavor not found in cart."}), 404

    item["quantity"] = quantity
    return jsonify({"success": True, "message": "Cart updated successfully.", "cart": user["cart"]})


# 8. DELETE /cart
@app.route("/cart", methods=["DELETE"])
def delete_cart_item():
    data = request.get_json()
    user = find_user_by_id(data.get("userId"))
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    flavor_id = data.get("flavorId")
    user["cart"] = [i for i in user["cart"] if i["flavorId"] != flavor_id]
    return jsonify({"success": True, "message": "Flavor removed from cart.", "cart": user["cart"]})


# 9. POST /orders
@app.route("/orders", methods=["POST"])
def place_order():
    global next_order_id
    data = request.get_json()
    user = find_user_by_id(data.get("userId"))
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404
    if not user["cart"]:
        return jsonify({"success": False, "message": "Cart is empty."}), 400

    total = sum(i["price"] * i["quantity"] for i in user["cart"])
    order = {
        "orderId": next_order_id,
        "items": list(user["cart"]),
        "total": round(total, 2),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    user["orders"].append(order)
    user["cart"] = []
    next_order_id += 1

    return jsonify({"success": True, "message": "Order placed successfully.", "orderId": order["orderId"]})


# 10. GET /orders
@app.route("/orders", methods=["GET"])
def get_orders():
    user_id = request.args.get("userId", type=int)
    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404
    return jsonify({"success": True, "message": "Order history loaded.", "orders": user["orders"]})


if __name__ == "__main__":
    app.run(debug=True, port=5001)

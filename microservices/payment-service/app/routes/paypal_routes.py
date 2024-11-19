from flask import Blueprint, jsonify


paypal_routes = Blueprint('paypal_routes', __name__)


@paypal_routes.route('/paypal', methods=['GET'])
def get_paypal():
    return jsonify({'message': 'Hello, World!'})


@paypal_routes.route('/paypal/payment', methods=['POST'])
def create_payment():
    return jsonify({'message': 'Hello, World!'})

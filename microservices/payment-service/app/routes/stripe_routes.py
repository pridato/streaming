from flask import Blueprint, jsonify

stripe_service = Blueprint('stripe_service', __name__)


@stripe_service.route('/stripe/payment', methods=['POST'])
def create_payment():
    return jsonify({'message': 'Hello, World!'})

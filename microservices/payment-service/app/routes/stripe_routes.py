from flask import Blueprint, jsonify

stripe_service = Blueprint('stripe_service', __name__)


@stripe_service.route('/stripe/payment', methods=['GET'])
def get_payment():
    return jsonify({'message': 'Hello, World!'})

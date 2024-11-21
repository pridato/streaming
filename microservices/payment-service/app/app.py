import logging
from flask import Flask
from flask_cors import CORS
from app.routes.paypal_routes import paypal_routes
from app.routes.stripe_routes import stripe_service
from app.routes.auth_route import auth_routes

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# habilitar a localhost:3000
CORS(app)

app.register_blueprint(stripe_service)
app.register_blueprint(paypal_routes)
app.register_blueprint(auth_routes)

if __name__ == '__main__':
    app.run(debug=True)

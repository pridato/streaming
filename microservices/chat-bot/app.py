from flask import Flask
from routes.routes import init_routes
import logging
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="http://localhost:3000")

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

init_routes(app)


if __name__ == '__main__':
    app.run(debug=True)

import json
import os

KNOWLEDGE_BASE_PATH = os.path.join(
    os.path.dirname(__file__), 'data', 'knowledge_base.json')

with open(KNOWLEDGE_BASE_PATH, 'r') as file:
    KNOWLEDGE_BASE = json.load(file)

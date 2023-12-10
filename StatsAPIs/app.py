from flask import Flask
from flask_cors import CORS
from utils.db_utils import execute_query
from stats.routes import stats
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(filename='applogs.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

app.secret_key = 'Veet@9824339295'
app.register_blueprint(stats)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"

if __name__ == "__main__":
  app.run()
from request_data import request_data
from forcast import forecast
import json
import webbrowser
import threading
from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

def open_browser():
    webbrowser.open_new('http://127.0.0.1:5000/')

@app.route("/data")
def data():
    dates, data = request_data()
    result = forecast(json.loads(dates), json.loads(data))
    return result


if __name__ == '__main__':
    threading.Timer(1, open_browser).start()
    app.run()


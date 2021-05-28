from flask import Flask, render_template, abort, Blueprint, request, session, jsonify
from json import dumps, loads
from jinja2 import TemplateNotFound
import json
from datetime import datetime


# app = Flask(__name__)
custom = Blueprint('custom', __name__,
                        template_folder='templates', static_folder='static')


@custom.route("/")
@custom.route("/index")
def index():
    try:
        return render_template('index.html')
    except TemplateNotFound:
        abort(404)

@custom.route("/trials", methods=['GET', 'POST'])
def trials():
    try:
        blocks = request.form.get('blocks')
        target_dir = "static/blocks/" + blocks + ".txt"
        session.clear()
        session["target"] = target_dir
        name = request.form.get('name')
        name = name.replace(" ", "_")
        now = datetime.now()
        date_time = now.strftime("%m_%d_%Y_%H_%M_%S")
        res_file = "static/result/" + name + "_" + blocks + "_" + date_time + ".txt"
        data = {}
        data['results']=[]
        with open(res_file, 'w') as outfile:
            json.dump(data, outfile)
        session["res_file"] = res_file
        return render_template('trials.html')
    except TemplateNotFound:
        abort(404)

@custom.route("/pick_trial", methods=['GET', 'POST'])
def pick_trial():
    target_dir = session["target"]
    with open(target_dir) as target_file:
            target = json.load(target_file)
    return jsonify({'data': target})

@custom.route("/record_data", methods=['GET', 'POST'])
def record_data():
    target = session["res_file"]
    folder = request.form['folder']
    object1 = request.form['object1']
    object2 = request.form['object2']
    rt = request.form['rt']
    response = request.form['response']
    data = {
        'folder': folder,
        'object1': object1,
        'object2': object2,
        'response': response,
        'rt': rt
    }
    with open(target, 'r+') as file:
        file_data = json.load(file)
        file_data['results'].append(data)
        file.seek(0) 
        json.dump(file_data, file)
    return "result recorded!"



    
    

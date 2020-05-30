from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

user_api = Blueprint('user_api', __name__, template_folder='templates')

@user_api.route('/user_api')
def show():
    return "something"

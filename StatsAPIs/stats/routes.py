from venv import logger
from flask import Blueprint, jsonify, request
from stats.controller import *

stats = Blueprint('stats_blueprint', __name__)

@stats.route('/get_admin_stats', methods=['GET'])
def get_admin_stats_route():
    try:
        logger.info('request called for /get_admin_stats endpoint')
        return get_admin_stats_controller(request)
    except Exception as e:
        return jsonify(e), 409
    
@stats.route('/get_org_admin_stats', methods=['POST'])
def get_org_admin_stats_route():
    try:
        logger.info('request called for /get_org_admin_stats endpoint')
        return get_org_admin_stats_controller(request)
    except Exception as e:
        return jsonify(e), 409
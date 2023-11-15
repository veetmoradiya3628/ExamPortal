from flask import Blueprint, jsonify, request

from stats.controller import get_admin_stats_controller

stats = Blueprint('stats_blueprint', __name__)

@stats.route('/get_admin_stats', methods=['GET'])
def get_admin_stats_route():
    try:
        return get_admin_stats_controller(request)
    except Exception as e:
        return jsonify(e), 409
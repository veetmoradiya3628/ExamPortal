from flask import jsonify
from stats.models import *


def get_admin_stats_controller(request):
    res = {}
    res['organization_cnt'] = get_organization_cnt()[0][0]
    res['active_teacher_cnt'] = get_users_cnt_with_role_and_status('teacher', 1)[0][0]
    res['in_active_teacher_cnt'] = get_users_cnt_with_role_and_status('teacher', 0)[0][0]
    res['active_student_cnt'] = get_users_cnt_with_role_and_status('student', 1)[0][0]
    res['in_active_student_cnt'] = get_users_cnt_with_role_and_status('student', 0)[0][0]
    org_data = get_organization_data()
    org_list = []
    for organization_data in org_data:
        org = {}
        org_id = organization_data[0]
        org['name'] = organization_data[3]
        teacher_cnt = get_user_role_cnt_for_organization('teacher', org_id)[0][0]
        student_cnt = get_user_role_cnt_for_organization('student', org_id)[0][0]
        print('''teacher cnt : {}, student cnt : {}'''.format(teacher_cnt, student_cnt))
        org['teacher_cnt'] = teacher_cnt
        org['student_cnt'] = student_cnt
        org_list.append(org)
    res['organization_data'] = org_list
    return jsonify(res), 200
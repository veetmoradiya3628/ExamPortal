from flask import jsonify
from stats.models import *
from stats.mongo_model import *
from venv import logger

def get_admin_stats_controller(request):
    res = {}
    org_cnt = get_organization_cnt()[0][0]
    logger.info("organization count : {}".format(org_cnt))
    res['organization_cnt'] = org_cnt
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

def get_org_admin_stats_controller(request):
    req_data = request.get_json()
    logger.info("data received for org admin stats controller with data : {}".format(req_data))
    if req_data.get('organization_id') != None:
        org_id = req_data['organization_id']
        res = {}
        # classroom cnt process
        class_cnt = get_classroom_cnt_for_organization(org_id)[0][0]
        logger.info("classroom cnt : {} for organization with org_id : {}".format(class_cnt, org_id))
        res['classroom_cnt'] = class_cnt
        # teacher cnt process
        org_teacher_cnt = get_user_role_cnt_for_organization('teacher', org_id)[0][0]
        logger.info("teacher cnt : {} for organization with org_id : {}".format(org_teacher_cnt, org_id))
        res['teacher_cnt'] = org_teacher_cnt
        # student cnt process
        org_student_cnt = get_user_role_cnt_for_organization('student', org_id)[0][0]
        logger.info("student cnt : {} for organization with org_id : {}".format(org_student_cnt, org_id))
        res['student_cnt'] = org_student_cnt
        # get quiz of organization & quiz attempt based on classes logic & quiz_stats data
        quiz_stats = list()
        total_quiz_cnt = 0
        total_quiz_attempt_cnt = 0
        classroom_ids = get_list_of_class_ids_for_organization(org_id)
        logger.info("classroom ids : {}".format(classroom_ids))
        for class_id in classroom_ids:
            quizzes = get_quizzes_from_class_id("quizzes", class_id[0])
            logger.info("class_id : {}, quizzes cnt : {}".format(class_id[0], len(quizzes)))
            total_quiz_cnt = total_quiz_cnt + len(quizzes)
            for quiz in quizzes:
                quiz_stat = dict()
                quiz_stat['quiz_name'] = str(quiz['quizTitle'])
                quiz_attempts = get_quiz_attempts_from_quiz_id("attempt_quiz", str(quiz['_id']))
                logger.info("quiz_id : {}, attempt cnt : {}".format(quiz['_id'], len(quiz_attempts)))
                quiz_stat['attempt_cnt'] = len(quiz_attempts)
                quiz_stats.append(quiz_stat)
                total_quiz_attempt_cnt = total_quiz_attempt_cnt + len(quiz_attempts)
        res['quiz_cnt'] = total_quiz_cnt
        res['quiz_attempt_cnt'] = total_quiz_attempt_cnt
        res['quiz_stats'] = quiz_stats
        # class student & teacher graph stats
        classroom_stats = list()
        for class_id in classroom_ids:
            class_stat = dict()
            class_stat['classroom_name'] = get_classroom_name_with_class_id(class_id[0])[0][0]
            logger.info("class_id : {}, class_name : {}".format(class_id[0], class_stat['classroom_name']))
            student_data = get_user_data_for_classroom_with_role_and_class_id(class_id[0], 'student')
            logger.info("student data : {}".format(student_data))
            class_stat['student_cnt'] = len(student_data)
            teacher_data = get_user_data_for_classroom_with_role_and_class_id(class_id[0], 'teacher')
            logger.info("teacher data : {}".format(teacher_data))
            class_stat['teacher_cnt'] = len(teacher_data)
            quizzes = get_quizzes_from_class_id("quizzes", class_id[0])
            logger.info("class_id : {}, quizzes cnt : {}".format(class_id[0], len(quizzes)))
            class_stat['quizzes_cnt'] = len(quizzes)
            classroom_stats.append(class_stat)
        res['classroom_stats'] = classroom_stats
        return jsonify(res), 200
    else:
        error = {}
        error['message'] = 'please pass valid organization_id'
        return jsonify(error), 400
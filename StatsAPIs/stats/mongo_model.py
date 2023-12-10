from utils.mongo_db_utils import execute_find_query

def get_quizzes_from_class_id(document, classroom_id):
    filter = dict()
    filter['classroomId'] = classroom_id
    return execute_find_query(document, filter)

def get_quiz_attempts_from_quiz_id(document, quiz_id):
    filter = dict()
    filter['quizId'] = quiz_id
    return execute_find_query(document, filter)

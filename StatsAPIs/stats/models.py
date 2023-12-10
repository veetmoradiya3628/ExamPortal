from utils.db_utils import execute_query


def get_organization_cnt():
    query='''SELECT COUNT(*) FROM tbl_organization'''
    args = ()
    print('args', args)
    return execute_query(query, args)

def get_users_cnt_with_role_and_status(rolename, status):
    query = '''SELECT COUNT(*) FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) =%s AND is_enabled = %s;'''
    args = (rolename, status)
    print('args', args)
    return execute_query(query, args)

def get_organization_data():
    query = '''SELECT * FROM tbl_organization'''
    args = ()
    print('args', args)
    return execute_query(query, args)

def get_user_role_cnt_for_organization(rolename, org_id):
    query = '''SELECT count(*) FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = %s AND tbl_user.org_id = %s;'''
    args = (rolename, org_id)
    print('args', args)
    return execute_query(query, args)

def get_classroom_cnt_for_organization(org_id):
    query = '''SELECT COUNT(*) FROM tbl_classroom WHERE organization_id =%s;'''
    args = (org_id,)
    print('args', args)
    return execute_query(query, args)

def get_list_of_class_ids_for_organization(org_id):
    query = '''SELECT classroom_id FROM tbl_classroom where organization_id =%s;'''
    args = (org_id,)
    print('args', args)
    return execute_query(query, args)

def get_user_data_for_classroom_with_role_and_class_id(class_id, role_name):
    query = '''SELECT * FROM tbl_classroom_user where classroom_id=%s AND user_id in (SELECT tbl_user.user_id FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name)=%s);'''
    args = (class_id, role_name)
    print('args', args)
    return execute_query(query, args)

def get_classroom_name_with_class_id(class_id):
    query = '''SELECT classroom_title FROM tbl_classroom where classroom_id =%s'''
    args = (class_id,)
    print('args', args)
    return execute_query(query, args)

def get_posts_cnt_with_class_id(class_id):
    query = '''select * from tbl_posts where classroom_id =%s''';
    args = (class_id,)
    print('args', args)
    return execute_query(query, args)

def get_classroom_cnt_for_organization_mapped_to_teacher(org_id, user_id):
    query = '''SELECT COUNT(classroom_id) FROM tbl_classroom_user where classroom_id in (SELECT classroom_id FROM 
                tbl_classroom where organization_id =%s) AND user_id =%s;'''
    args=(org_id, user_id,)
    print('args', args)
    return execute_query(query, args)

def get_list_of_classids_for_teacher(org_id, user_id):
    query = '''SELECT classroom_id FROM tbl_classroom_user where classroom_id in (SELECT classroom_id FROM 
                tbl_classroom where organization_id =%s) AND user_id =%s;'''
    args=(org_id, user_id,)
    print('args', args)
    return execute_query(query, args)


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
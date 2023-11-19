SELECT user_id FROM exam_server.tbl_classroom_user where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49';

-- all user belong to organization
SELECT count(user_id) from tbl_user where org_id = (select organization_id from tbl_classroom where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49');

-- get mapped user_id
SELECT count(user_id) FROM tbl_classroom_user where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49';

-- not mapped user_id
SELECT * from tbl_user where org_id = (select organization_id from tbl_classroom where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49') AND user_id not in (SELECT user_id FROM tbl_classroom_user where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49') AND user_id in (SELECT user_user_id from tbl_user_role where role_role_id = (select role_id from tbl_role where role_name = 'ADMIN'));

SELECT * FROM tbl_user_role where role_role_id = (select role_id from tbl_role where role_name = 'TEACHER');

SELECT * FROM tbl_user_role;

SELECT * FROM tbl_role;

select * from tbl_classroom where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49';

select * from tbl_user where user_id = '08545b03-f586-4d89-8d7d-a78f0a8ed38b';


select * from tbl_user where user_id in (select user_id from tbl_classroom_user where classroom_id = '2fb3717f-4609-4539-bcea-97b23889c796');

select * from tbl_user where user_id in (select user_user_id from tbl_user_role where user_user_id in (select user_id from tbl_classroom_user where classroom_id = '2fb3717f-4609-4539-bcea-97b23889c796') and role_role_id = (select role_id from tbl_role where role_name = 'STUDENT'));


select * from tbl_user where user_id = 'a593ee93-d357-4d16-8fff-f09c4214e5c1';

select count(*) from tbl_organization;

SELECT count(*) FROM tbl_user;

SELECT count(*) FROM tbl_user;

-- Query for User related operations on dashboard
SELECT * FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = 'teacher' AND is_enabled = 1;


-- Query for Users count from organization based on role
SELECT t1.org_id, t2.org_name, count(*) as user_cnt FROM tbl_user t1 INNER JOIN tbl_organization t2 ON t1.org_id = t2.org_id group by t1.org_id;

select tbl_user.org_id, tbl_organization.org_name, count(*) from tbl_user right join tbl_organization ON tbl_user.org_id = tbl_organization.org_id group by tbl_user.org_id; 



SELECT count(*) FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = 'teacher';

-- get classroom counts based on organization id.
SELECT COUNT(*) FROM tbl_classroom WHERE organization_id = 'a77f5d7b-c50d-418d-8c66-3814049ca386'; 

-- get organization user count with userrole
SELECT COUNT(*) FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = 'teacher' AND tbl_user.org_id = 'a77f5d7b-c50d-418d-8c66-3814049ca386';

-- get classroom_ids based on organization_id
SELECT classroom_id FROM tbl_classroom where organization_id = 'a77f5d7b-c50d-418d-8c66-3814049ca386';

-- get user_id with role_name
SELECT tbl_user.user_id FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = 'teacher';

-- get user_cnt with role for given classid with user_role
SELECT * FROM tbl_classroom_user where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49' AND user_id in (SELECT tbl_user.user_id FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = 'student');


-- get classroom_name with classroom_id 
SELECT classroom_title FROM tbl_classroom where classroom_id = '2d6598d6-7b5f-404f-b60f-4f9dbdbdef49';
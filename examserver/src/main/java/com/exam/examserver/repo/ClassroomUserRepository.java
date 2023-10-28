package com.exam.examserver.repo;

import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.ClassroomUser;
import com.exam.examserver.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomUserRepository extends JpaRepository<ClassroomUser, String> {
    List<ClassroomUser> findByClassroomAndUser(Classroom c, User u);

    List<ClassroomUser> findByClassroom(Classroom c);

    List<ClassroomUser> findByUser(User u);

    @Transactional
    Long deleteByClassroomAndUser(Classroom c, User u);

    @Query(value = "SELECT * from tbl_user where org_id = (select organization_id from tbl_classroom where classroom_id = :classroomId) " +
            "AND user_id not in (SELECT user_id FROM tbl_classroom_user where classroom_id = :classroomId) " +
            "AND user_id in (SELECT user_user_id from tbl_user_role where role_role_id = (select role_id from tbl_role where role_name = :roleName))"
    , nativeQuery = true)
    List<User> findNotMappedUserToClassroomWithRole(@Param("classroomId") String classroomId,@Param(("roleName")) String roleName);
}

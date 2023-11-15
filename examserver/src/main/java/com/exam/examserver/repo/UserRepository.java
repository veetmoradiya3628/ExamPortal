package com.exam.examserver.repo;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

    List<User> findByOrganization(Organization organization);

//    @Modifying
//    @Query(value = "UPDATE User u SET u.is_enabled = :status WHERE u.user_id = :userId")
//    void updateUserStatus(@Param("userId") Long userId, @Param("status") boolean status);

    @Query(nativeQuery = true,
    value = "SELECT COUNT(*) FROM ((tbl_user INNER JOIN tbl_user_role ON tbl_user.user_id = tbl_user_role.user_user_id) INNER JOIN tbl_role ON tbl_user_role.role_role_id = tbl_role.role_id) WHERE lower(role_name) = :role_name AND is_enabled = :status")
    int findAllUsersByRoleNameAndStatus(@Param("role_name") String roleName, @Param("status") boolean status);
}

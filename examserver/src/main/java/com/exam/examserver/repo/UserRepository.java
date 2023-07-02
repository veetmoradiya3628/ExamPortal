package com.exam.examserver.repo;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public User findByUsername(String username);

    boolean existsByUsername(String username);

    List<User> findByOrganization(Organization organization);

//    @Modifying
//    @Query(value = "UPDATE User u SET u.is_enabled = :status WHERE u.user_id = :userId")
//    void updateUserStatus(@Param("userId") Long userId, @Param("status") boolean status);

}

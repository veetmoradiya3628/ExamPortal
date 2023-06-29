package com.exam.examserver.repo;

import com.exam.examserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public User findByUsername(String username);

    boolean existsByUsername(String username);

//    @Modifying
//    @Query(value = "UPDATE User u SET u.is_enabled = :status WHERE u.user_id = :userId")
//    void updateUserStatus(@Param("userId") Long userId, @Param("status") boolean status);

}

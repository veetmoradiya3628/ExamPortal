package com.exam.examserver.repo;

import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {
    List<Posts> findByClassroomOrderByCreatedAtDesc(Classroom classroom);
}

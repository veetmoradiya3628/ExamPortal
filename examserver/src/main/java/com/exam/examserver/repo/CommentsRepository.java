package com.exam.examserver.repo;

import com.exam.examserver.entity.Comments;
import com.exam.examserver.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, String> {
    public List<Comments> findByPost(Posts post);
}

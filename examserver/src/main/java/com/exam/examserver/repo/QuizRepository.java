package com.exam.examserver.repo;

import com.exam.examserver.entity.exam.Category;
import com.exam.examserver.entity.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, String> {
    public List<Quiz> findByCategory(Category category);

    public List<Quiz> findByActive(Boolean b);
    public List<Quiz> findByCategoryAndActive(Category c, Boolean b);
}

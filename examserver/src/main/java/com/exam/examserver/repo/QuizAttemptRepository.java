package com.exam.examserver.repo;

import com.exam.examserver.entity.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    @Query("{'userId': ?0,'quizId': ?1}")
    public List<QuizAttempt> findQuizAttemptParams(String userId, String quizId);
}

package com.exam.examserver.repo;

import com.exam.examserver.entity.QuestionAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface QuestionAttemptRepository extends MongoRepository<QuestionAttempt, String> {
    @Query("{'$and': [{'userId': ?0},{'questionId': ?1},{'quizAttemptId':?2}]}")
    public List<QuestionAttempt> checkForAttemptExists(String userId, String questionId, String questionAttemptId);
}

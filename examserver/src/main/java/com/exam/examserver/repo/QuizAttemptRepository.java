package com.exam.examserver.repo;

import com.exam.examserver.entity.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
}

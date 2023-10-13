package com.exam.examserver.repo;

import com.exam.examserver.entity.QuestionAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionAttemptRepository extends MongoRepository<QuestionAttempt, String> {
}

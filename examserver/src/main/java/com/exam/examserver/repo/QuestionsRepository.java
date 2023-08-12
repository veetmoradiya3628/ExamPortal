package com.exam.examserver.repo;

import com.exam.examserver.entity.Questions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionsRepository extends MongoRepository<Questions, String> {
}

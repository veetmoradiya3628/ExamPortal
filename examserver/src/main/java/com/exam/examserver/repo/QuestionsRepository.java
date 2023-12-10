package com.exam.examserver.repo;

import com.exam.examserver.entity.Questions;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionsRepository extends MongoRepository<Questions, String> {
    public List<Questions> findByQuizId(String quizId);
}

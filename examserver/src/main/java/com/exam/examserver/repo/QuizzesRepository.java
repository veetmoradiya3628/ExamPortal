package com.exam.examserver.repo;

import com.exam.examserver.entity.Quizzes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizzesRepository extends MongoRepository<Quizzes, String> {

}

package com.exam.examserver.repo;

import com.exam.examserver.entity.Quizzes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizzesRepository extends MongoRepository<Quizzes, String> {
    List<Quizzes> findByClassroomId(String classroomId);
}

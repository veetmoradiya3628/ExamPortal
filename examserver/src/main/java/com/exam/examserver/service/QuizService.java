package com.exam.examserver.service;

import com.exam.examserver.entity.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuizService {
    public ResponseEntity<List<Quiz>> getAllQuiz();

    public ResponseEntity<Quiz> createQuiz(Quiz quiz);

    public ResponseEntity<Quiz> updateQuiz(String quizId, Quiz quiz);

    public ResponseEntity<?> deleteQuiz(String quizId);
}

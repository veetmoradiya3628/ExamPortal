package com.exam.examserver.service;

import com.exam.examserver.dto.QuestionsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuestionsService {
    public ResponseEntity<?> createQuestion(QuestionsDTO questionsDTO);

    public ResponseEntity<?> getAllQuestions();

    public ResponseEntity<?> deleteQuestion(String questionId);

    public ResponseEntity<?> getQuestionsForQuiz(String quizId);
}

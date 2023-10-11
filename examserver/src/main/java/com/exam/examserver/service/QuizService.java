package com.exam.examserver.service;

import com.exam.examserver.dto.QuizDTO;
import org.springframework.http.ResponseEntity;

public interface QuizService {
    public ResponseEntity<?> createQuiz(QuizDTO quizDTO);

    public ResponseEntity<?> changeQuizStatus(String quizId, Boolean status);

    public ResponseEntity<?> getQuizzesForUser(String userId);

    public ResponseEntity<?> getQuizWithQuestionsAndDetails(String quizId);

    public ResponseEntity<?> getQuizzesForClassroom(String classId);
}

package com.exam.examserver.service;

import com.exam.examserver.req_res_format.QuizAttemptDetailRequest;
import com.exam.examserver.req_res_format.QuizEndRequest;
import com.exam.examserver.req_res_format.QuizStartRequest;
import org.springframework.http.ResponseEntity;

public interface QuizAttemptService {
    public ResponseEntity<?> startQuizAttemptService(QuizStartRequest request);

    public ResponseEntity<?> endQuizAttemptService(QuizEndRequest request);

    public ResponseEntity<?> getQuizDetailsByQuizAttemptIdService(QuizAttemptDetailRequest request);

    public ResponseEntity<?> getQuizAttemptDetailByQuizId(String quizId);
}

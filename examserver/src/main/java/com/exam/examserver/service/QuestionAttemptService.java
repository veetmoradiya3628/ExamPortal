package com.exam.examserver.service;

import com.exam.examserver.req_res_format.QuestionAttemptRequest;
import org.springframework.http.ResponseEntity;

public interface QuestionAttemptService {
    public ResponseEntity<?> attemptQuestionService(String questionId, String userId, QuestionAttemptRequest requestObject);
}

package com.exam.examserver.controller;

import com.exam.examserver.req_res_format.QuizStartRequest;
import com.exam.examserver.service.QuizAttemptService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quiz_attempt")
@CrossOrigin("*")
public class QuizAttemptController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuizAttemptService quizAttemptService;

    @PostMapping("/startQuiz")
    public ResponseEntity<?> startQuizAttempt(@RequestBody QuizStartRequest request){
        logger.info("controller method called startQuizAttempt " + request.toString());
        return quizAttemptService.startQuizAttemptService(request);
    }
}

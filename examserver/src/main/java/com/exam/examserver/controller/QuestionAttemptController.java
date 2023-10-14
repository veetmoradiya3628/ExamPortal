package com.exam.examserver.controller;

import com.exam.examserver.req_res_format.QuestionAttemptRequest;
import com.exam.examserver.service.QuestionAttemptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question_attempt")
@CrossOrigin("*")
public class QuestionAttemptController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuestionAttemptService questionAttemptService;

    @PostMapping("/{questionId}/user/{userId}")
    public ResponseEntity<?> attemptQuestionController(@PathVariable("questionId") String questionId,
                                                       @PathVariable("userId") String userId,
                                                       @RequestBody QuestionAttemptRequest requestObject){
        logger.info("controller method attemptQuestionController with questionId " + questionId + " and userId " + userId);
        logger.info("requestObject : " + requestObject.toString());
        return this.questionAttemptService.attemptQuestionService(questionId, userId, requestObject);
    }
}

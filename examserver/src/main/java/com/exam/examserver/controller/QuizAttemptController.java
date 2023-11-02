package com.exam.examserver.controller;

import com.exam.examserver.req_res_format.QuizAttemptDetailRequest;
import com.exam.examserver.req_res_format.QuizEndRequest;
import com.exam.examserver.req_res_format.QuizStartRequest;
import com.exam.examserver.service.QuizAttemptService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @PostMapping("/endQuiz")
    public ResponseEntity<?> endQuizAttempt(@RequestBody QuizEndRequest request){
        logger.info("controller method called endQuizAttempt " + request.toString());
        return quizAttemptService.endQuizAttemptService(request);
    }

    @GetMapping("/details")
    public ResponseEntity<?> getQuizAttemptDetailsController(@RequestBody QuizAttemptDetailRequest request){
        logger.info("controller method called getQuizAttemptDetailsController "+request.toString());
//        return ResponseEntity.ok(null);
                return quizAttemptService.getQuizDetailsByQuizAttemptIdService(request);
    }

    @GetMapping("/{quizId}/attempts")
    public ResponseEntity<?> getAttemptedDataByQuizId(@PathVariable("quizId") String quizId){
        logger.info("controller method called getAttemptedDataByQuizId with quizId : "+ quizId);
        return quizAttemptService.getQuizAttemptDetailByQuizId(quizId);
    }

    @GetMapping("/{studentId}/student_attempts")
    public ResponseEntity<?> getAttemptedDataByUserId(@PathVariable("studentId") String studentId){
        logger.info("controller method called getAttemptedDataByUserId with studentId : " + studentId);
        return quizAttemptService.getQuizDetailsByStudentId(studentId);
    }

    @GetMapping("/{quizId}/student/{studentId}")
    public ResponseEntity<?> getQuizAttemptDetailsByQuizIdAndUserId(@PathVariable("quizId") String quizId,
                                                                    @PathVariable("studentId") String studentId){
        logger.info("controller method called getQuizAttemptDetailsByQuizIdAndUserId with quizId : "+ quizId + " studentId : " + studentId);
        return quizAttemptService.getQuizAttemptDetailsByQuizAndStudentId(quizId, studentId);
    }
}

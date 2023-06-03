package com.exam.examserver.controller;


import com.exam.examserver.entity.Quiz;
import com.exam.examserver.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    final String LOG_TAG = "QUIZ_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(QuizController.class);

    @Autowired
    private QuizService quizService;

    /*
    * API to get all Quizzes
     */
    @GetMapping("/")
    public ResponseEntity<List<Quiz>>  getAllQuiz(){
        return quizService.getAllQuiz();
    }

    /*
    * API to create Quiz
     */
    @PostMapping("/")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz){
        return quizService.createQuiz(quiz);
    }

    /*
    * API to update Quiz
     */
    @PutMapping("/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable("quizId") String quizId, @RequestBody Quiz quiz){
        return quizService.updateQuiz(quizId, quiz);
    }

    /*
     * API to delete Quiz
     */
    @DeleteMapping("/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("quizId") String quizId){
        return quizService.deleteQuiz(quizId);
    }
}

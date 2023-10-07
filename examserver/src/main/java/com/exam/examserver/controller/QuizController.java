package com.exam.examserver.controller;

import com.exam.examserver.dto.QuizDTO;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin("*")
public class QuizController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuizService quizService;

    /*
     * Method to create a Quiz
     */
    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDTO quiz){
        logger.info("received request object --> " + quiz.toString());
        return this.quizService.createQuiz(quiz);
    }

    /*
     * Method to activate and deactivate quiz
     */
    @PostMapping("/{quizId}/changeStatus")
    public ResponseEntity<?> changeQuizStatus(@PathVariable("quizId") String quizId, @RequestParam Boolean status){
        return this.quizService.changeQuizStatus(quizId, status);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllQuizzes(){
//        List<Quizzes> listOfQuizzes = this.quizzesRepository.findAll();
//        listOfQuizzes.forEach(quizzes -> {
//            System.out.println(quizzes.toString());
//        });
        return ResponseHandler.generateResponse(null, HttpStatus.OK, null);
    }

    /*
     * Method to get quiz for user with userId
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getQuizzesForUser(@PathVariable("userId") String userId){
        logger.info("received userId for getQuizzesForUser is : "+userId);
        return this.quizService.getQuizzesForUser(userId);
    }

    /*
     * Get Quiz with Questions by QuizId for Attempt purpose
     */
    @GetMapping("/{quizId}/questions")
    public ResponseEntity<?> getQuizByQuizIdWithQuestionAndDetails(@PathVariable("quizId") String quizId){
        logger.info("controller method called getQuizByQuizIdWithQuestionAndDetails with quizId "+quizId);
        return this.quizService.getQuizWithQuestionsAndDetails(quizId);
    }
}

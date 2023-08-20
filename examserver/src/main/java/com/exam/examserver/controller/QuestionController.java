package com.exam.examserver.controller;

import com.exam.examserver.dto.QuestionsDTO;
import com.exam.examserver.service.QuestionsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuestionsService questionsService;

    @PostMapping("/create")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionsDTO question) {
        logger.info("received question req object -> " + question.toString());
        return this.questionsService.createQuestion(question);
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<?> getAllQuestions(){
        return this.questionsService.getAllQuestions();
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsForQuiz(@PathVariable("quizId") String quizId){
        logger.info("received quiz id to get questions is -> "+quizId);
        return this.questionsService.getQuestionsForQuiz(quizId);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("questionId") String questionId){
        return this.questionsService.deleteQuestion(questionId);
    }
}

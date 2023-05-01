package com.exam.examserver.controller;

import com.exam.examserver.entity.exam.Question;
import com.exam.examserver.entity.exam.Quiz;
import com.exam.examserver.service.QuestionService;
import com.exam.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // update the question
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }


    // get the question by Id
    @GetMapping("/{qId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable("qId") Long questionId){
        return ResponseEntity.ok(this.questionService.getQuestion(questionId));
    }

    // get all question of any quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("quizId") Long quizId){
//        Quiz quiz = new Quiz();
//        quiz.setQid(quizId);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList<>(questions);
        Collections.shuffle(list);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()) + 1);
        }
        return ResponseEntity.ok(list);
    }

    // delete question
    @DeleteMapping("/{quesId}")
    public void deleteSingleQuestion(@PathVariable("quesId") Long quesId){
        this.questionService.deleteQuestion(quesId);
    }

    // get the questions

    @GetMapping("/")
    public ResponseEntity<?> getQuestions(){
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    // get all question of any quiz
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("quizId") Long quizId){
        Quiz quiz = new Quiz();
        quiz.setQid(quizId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    // delete the question by Id
//    @DeleteMapping("/{qId}")
//    public void deleteQuestion(@PathVariable("qId") Long questionId){
//        this.questionService.
//    }
}

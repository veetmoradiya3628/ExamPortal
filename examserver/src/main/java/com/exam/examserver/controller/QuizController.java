package com.exam.examserver.controller;

import com.exam.examserver.entity.exam.Category;
import com.exam.examserver.entity.exam.Quiz;
import com.exam.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;

    // add quiz
    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    // update quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    // get quiz
    @GetMapping("/")
    public ResponseEntity<?> getQuizzes(){
        return ResponseEntity.ok(this.quizService.getAllQuiz());
    }

    // get quiz by id
    @GetMapping("/{qId}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable("qId") Long quizId){
        return ResponseEntity.ok(this.quizService.getQuiz(quizId));
    }

    // delete quiz
    @DeleteMapping("/{qId}")
    public void deleteQuiz(@PathVariable("qId") Long quizId){
        this.quizService.deleteQuiz(quizId);
    }

    @GetMapping("/category/{cid}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getQuizzesOfCategory(category);
    }

    // get active quizzes
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    // get active quizzes of category
    @GetMapping("/category/active/{cid}")
    public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }

}

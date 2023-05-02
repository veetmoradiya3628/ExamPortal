package com.exam.examserver.controller;

import com.exam.examserver.entity.exam.Category;
import com.exam.examserver.entity.exam.Quiz;
import com.exam.examserver.repo.CategoryRepository;
import com.exam.examserver.service.QuizService;
import com.exam.examserver.service.impl.QuizServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    Logger logger = LoggerFactory.getLogger(QuizServiceImpl.class);

    @Autowired
    private QuizService quizService;

    @Autowired
    private CategoryRepository categoryRepository;

    // add quiz
    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz){
        logger.info("data received at addQuiz is "+quiz.toString());
        Long categoryId = quiz.getCategory().getCid();
        if(!categoryRepository.existsByCid(categoryId)) {
            logger.debug("category with cid "+categoryId+" not exists!!");
            Map<String, String> mpp = Map.of("message", "category not exists with cid : " + categoryId);
            return new ResponseEntity<>(mpp, HttpStatus.NOT_FOUND);
        }
        logger.info("category with cid "+categoryId+" exists");
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

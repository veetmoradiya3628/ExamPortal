package com.exam.examserver.service.impl;

import com.exam.examserver.entity.Quiz;
import com.exam.examserver.repo.QuizRepository;
import com.exam.examserver.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    Logger logger = LoggerFactory.getLogger(QuizServiceImpl.class);

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        try{
            List<Quiz> _quizzes = new ArrayList<>(this.quizRepository.findAll());
            if (_quizzes.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(_quizzes, HttpStatus.OK);
        }catch (Exception e) {
            logger.info("Exception occurred in getAllQuiz controller ->" + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Quiz> createQuiz(Quiz quiz) {
        try{
            logger.info("data received in createQuiz service method is -> "+quiz.toString());
            Quiz _quiz = new Quiz();
            _quiz.setQuizTitle(quiz.getQuizTitle());
            _quiz.setQuizDescription(quiz.getQuizDescription());
            _quiz.setCategory(quiz.getCategory());
            _quiz.setIsActive(quiz.getIsActive());
            _quiz.setStartsAt(quiz.getStartsAt());
            _quiz.setEndsAt(quiz.getEndsAt());
            _quiz.setNoOfQuestions(quiz.getNoOfQuestions());
            _quiz.setQuizImage(quiz.getQuizImage());
            Quiz _createdImage = this.quizRepository.save(_quiz);
            return new ResponseEntity<>(_createdImage, HttpStatus.CREATED);
        }catch (Exception e){
            logger.info("Exception occurred in createQuiz controller ->" + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Quiz> updateQuiz(String quizId, Quiz quiz) {
        try{
            Optional<Quiz> _quiz = this.quizRepository.findById(quizId);
            if(_quiz.isPresent()){
                Quiz _q = this.quizRepository.save(quiz);
                return new ResponseEntity<>(_q, HttpStatus.OK);
            }else{
                logger.info("quiz with quizId -> "+quizId+ " not found in database");
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            logger.info("Exception occurred in createQuiz controller ->" + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> deleteQuiz(String quizId) {
        try{
            Optional<Quiz> _quiz = this.quizRepository.findById(quizId);
            if(_quiz.isPresent()){
                this.quizRepository.deleteById(quizId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }else{
                logger.info("quiz with quizId -> "+quizId+ " not found in database");
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            logger.info("Exception occurred in deleteQuiz controller ->" + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

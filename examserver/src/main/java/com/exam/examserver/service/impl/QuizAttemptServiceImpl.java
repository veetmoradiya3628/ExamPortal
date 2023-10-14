package com.exam.examserver.service.impl;

import com.exam.examserver.entity.*;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.ClassroomUserRepository;
import com.exam.examserver.repo.QuizAttemptRepository;
import com.exam.examserver.repo.QuizzesRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.req_res_format.QuizStartRequest;
import com.exam.examserver.service.QuizAttemptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizAttemptServiceImpl implements QuizAttemptService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuizzesRepository quizzesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassroomUserRepository classroomUserRepository;

    @Override
    public ResponseEntity<?> startQuizAttemptService(QuizStartRequest request) {
        logger.info("service method called startQuizAttemptService with request parameter : " + request);
        try{
            String userId = request.getUserId(); String quizId = request.getQuizId();

            // Validate quiz and user id passed as valid or not
            Optional<Quizzes> quizzes = this.quizzesRepository.findById(quizId);
            Optional<User> user = this.userRepository.findById(userId);
            if (quizzes.isPresent()){
                if (user.isPresent()){
                    // Validate already attempt exists or not
                    if (this.quizAttemptRepository.findQuizAttemptParams(userId, quizId).size() > 0){
                        logger.info("quizAttempt already started ...");
                        return ResponseHandler.generateResponse("quiz already attempted or started with quizId "+ quizId + " and userId "+userId, HttpStatus.ALREADY_REPORTED, null);
                    }
                    // Validate quiz belong to user or not
                    if (this.isQuizMappedToUser(quizzes.get(), user.get())){
                        // everything valid, lets attempt quiz
                        QuizAttempt quizAttempt = new QuizAttempt();
                        quizAttempt.setUserId(userId);
                        quizAttempt.setQuizId(quizId);
                        quizAttempt.setQuizStatus(QuizAttempt.QuizStatus.ON_GOING);
                        quizAttempt.setAttemptStartedAt(LocalDateTime.now());
                        quizAttempt.setScore(0);
                        quizAttempt.setCorrectQuestionsId(new ArrayList<>());
                        quizAttempt.setWrongQuestionsId(new ArrayList<>());
                        quizAttempt.setNotAttemptedQuestionId(new ArrayList<>());
                        quizAttempt.setIsAttemptCompleted(false);

                        logger.info("final quiz_attempt object for starting the quiz " + quizAttempt.toString());
                        quizAttempt = this.quizAttemptRepository.save(quizAttempt);
                        return ResponseHandler.generateResponse("quiz started with quizId "+ quizId + " for userId "+userId, HttpStatus.OK, quizAttempt);
                    }else{
                        // user not mapped to quiz
                        logger.info("user not allowed to attempt quiz as no mapping found");
                        return ResponseHandler.generateResponse("User Mapping with Quiz not Exists", HttpStatus.NOT_FOUND, null);
                    }
                }else{
                    // user not present with this id
                    logger.info("user with userId : "+userId+ " not present");
                    return ResponseHandler.generateResponse("user with userId : "+quizId+ " not present", HttpStatus.NOT_FOUND, null);
                }
            }else{
                // quiz not present with this id
                logger.info("quiz with quizId : "+quizId+ " not present");
                return ResponseHandler.generateResponse("Not a Valid quizId, pass valid quizId", HttpStatus.NOT_FOUND, null);
            }
        }catch (Exception e){
            logger.info("Exception occurred in the function startQuizAttemptService : "+e.getMessage());
            return ResponseHandler.generateResponse("Exception : "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public boolean isQuizMappedToUser(Quizzes quiz, User user){
        logger.info("method called isQuizMappedToUser");
        List<ClassroomUser> listOfUsers = this.classroomUserRepository.findByClassroomAndUser(new Classroom(quiz.getClassroomId()), user);
        return listOfUsers.size() > 0;
    }

    public Boolean isQuizAttemptPresentAndAttemptIsActive(String attemptId){
        Optional<QuizAttempt> quizAttempt = this.quizAttemptRepository.findById(attemptId);
        return quizAttempt.isPresent() && !quizAttempt.get().getIsAttemptCompleted();
    }
}

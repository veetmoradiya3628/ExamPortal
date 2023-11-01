package com.exam.examserver.service.impl;

import com.exam.examserver.dto.QuizAttemptDTO;
import com.exam.examserver.entity.*;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.*;
import com.exam.examserver.req_res_format.QuizAttemptDetailRequest;
import com.exam.examserver.req_res_format.QuizEndRequest;
import com.exam.examserver.req_res_format.QuizStartRequest;
import com.exam.examserver.service.QuizAttemptService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

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
    private UserServiceImpl userService;

    @Autowired
    private ClassroomUserRepository classroomUserRepository;

    @Autowired
    private QuestionsRepository questionsRepository;


    @Autowired
    private QuestionAttemptRepository questionAttemptRepository;

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
                    List<QuizAttempt> isQuizAttemptExists = this.quizAttemptRepository.findQuizAttemptParams(userId, quizId);
                    if (isQuizAttemptExists.size() > 0){
                        logger.info("quizAttempt already started ...");
                        QuizAttempt q = isQuizAttemptExists.get(0);
                        q.setQuizAttemptId(q.getId().toHexString());
                        return ResponseHandler.generateResponse("quiz already attempted or started with quizId "+ quizId + " and userId "+userId, HttpStatus.ALREADY_REPORTED, q);
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
                        quizAttempt.setQuizAttemptId(quizAttempt.getId().toHexString());
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

    @Override
    public ResponseEntity<?> endQuizAttemptService(QuizEndRequest request) {
        logger.info("service method called endQuizAttemptService with request parameter : " + request);
        try{
            // Validate quizAttemptId is valid
            Optional<QuizAttempt> quizAttemptCheck = this.quizAttemptRepository.findById(request.getQuizAttemptId());
            if(quizAttemptCheck.isPresent()){
                // Validate quiz already completed ...
                if (quizAttemptCheck.get().getIsAttemptCompleted()){
                    return ResponseHandler.generateResponse("Quiz already attempted and ended", HttpStatus.ALREADY_REPORTED, quizAttemptCheck.get());
                }else{
                    QuizAttempt quizAttempt = quizAttemptCheck.get();

                    List<Questions> questionsOfQuiz = this.questionsRepository.findByQuizId(quizAttempt.getQuizId());
                    logger.info("questionsOfQuiz" + questionsOfQuiz);

                    List<QuestionAttempt> attemptedQuestions = this.questionAttemptRepository.findByQuizAttemptId(request.getQuizAttemptId());
                    logger.info("attemptedQuestions" + attemptedQuestions);

                    List<String> questionIds = new ArrayList<>();
                    questionsOfQuiz.forEach(question -> questionIds.add(String.valueOf(question.getId())));

                    AtomicInteger totalQuizScore = new AtomicInteger();

                    List<String> attemptedQuestionIds = new ArrayList<>();
                    List<String> attemptedCorrect = new ArrayList<>();
                    List<String> attemptedWrong = new ArrayList<>();
                    attemptedQuestions.forEach(attemptedQuestion -> {
                        attemptedQuestionIds.add(attemptedQuestion.getQuestionId());
                        if (attemptedQuestion.getIsAttemptedCorrect()){
                            attemptedCorrect.add(String.valueOf(attemptedQuestion.getId())); // refers to attempted Id of the question
                            totalQuizScore.addAndGet(attemptedQuestion.getQuestion().getScore());
                        }else{
                            attemptedWrong.add(String.valueOf(attemptedQuestion.getId())); // refers to attempted Id of the question
                        }
                    });

                    List<String> notAttemptedQuestionIds = new ArrayList<>();
                    questionIds.forEach(questionId -> {
                        if (!attemptedQuestionIds.contains(questionId)){
                            notAttemptedQuestionIds.add(questionId);
                        }
                    });

                    logger.info("questions Ids : "+questionIds);
                    logger.info("attempted questions Ids : "+attemptedQuestionIds);
                    logger.info("not attempted questions Ids : "+notAttemptedQuestionIds);

                    quizAttempt.setCorrectQuestionsId(attemptedCorrect);
                    quizAttempt.setWrongQuestionsId(attemptedWrong);
                    quizAttempt.setNotAttemptedQuestionId(notAttemptedQuestionIds);
                    quizAttempt.setScore(totalQuizScore.get());
                    quizAttempt.setIsAttemptCompleted(true);
                    quizAttempt.setQuizStatus(QuizAttempt.QuizStatus.ENDED);
                    quizAttempt.setAttemptEndedAt(LocalDateTime.now());

                    logger.info("quizAttempt formatted object : " + quizAttempt.toString());
                    this.quizAttemptRepository.save(quizAttempt);

                    return ResponseHandler.generateResponse("Quiz ended successfully...", HttpStatus.OK, quizAttempt);
                }
            }else{
                logger.info("quiz attempt you are trying to end is not valid quizAttemptId : "+request.getQuizAttemptId());
                return ResponseHandler.generateResponse("quiz attempt id " + request.getQuizAttemptId() + " not a valid id.", HttpStatus.NOT_FOUND, null);
            }
        }catch (Exception e){
            logger.info("Exception occurred in the function startQuizAttemptService : "+e.getMessage());
            return ResponseHandler.generateResponse("Exception : "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getQuizDetailsByQuizAttemptIdService(QuizAttemptDetailRequest request) {
        try{
            logger.info("service method called getQuizDetailsByQuizAttemptIdService with request parameter : " + request);
            // Validate requestAttemptId
            Optional<QuizAttempt> quizAttemptOptional = this.quizAttemptRepository.findById(request.getQuizAttemptId());
            if (quizAttemptOptional.isPresent()){
                QuizAttempt quizAttempt = quizAttemptOptional.get();

                List<QuestionAttempt> correctAttemptedQuestions = new ArrayList<>();
                quizAttempt.getCorrectQuestionsId().forEach(questionAttemptId -> {
                    correctAttemptedQuestions.add(this.questionAttemptRepository.findById(questionAttemptId).get());
                });

                List<QuestionAttempt> wrongAttemptedQuestions = new ArrayList<>();
                quizAttempt.getWrongQuestionsId().forEach(questionAttemptId -> {
                    wrongAttemptedQuestions.add(this.questionAttemptRepository.findById(questionAttemptId).get());
                });

                List<Questions> notAttemptedQuestions = new ArrayList<>();
                quizAttempt.getNotAttemptedQuestionId().forEach(questionId -> {
                    notAttemptedQuestions.add(this.questionsRepository.findById(questionId).get());
                });

                JSONObject responseObject = new JSONObject();
                responseObject.put("quizAttemptDetails", quizAttempt);
                responseObject.put("correctQuestions", correctAttemptedQuestions);
                responseObject.put("wrongQuestions", wrongAttemptedQuestions);
                responseObject.put("notAttemptedQuestions", notAttemptedQuestions);

                return ResponseHandler.generateResponse("Quiz Attempt details for quizAttemptId : " +request.getQuizAttemptId() , HttpStatus.OK, responseObject.toMap());
            }else{
                // attemptId not present
                return ResponseHandler.generateResponse("Quiz Attempt with attemptId " + request.getQuizAttemptId() + " not exists!", HttpStatus.NOT_FOUND, null);
            }
        }catch (Exception e){
            logger.info("Exception occurred in the function startQuizAttemptService : "+e.getMessage());
            return ResponseHandler.generateResponse("Exception : "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getQuizAttemptDetailByQuizId(String quizId) {
        try {
            Optional<Quizzes> q = this.quizzesRepository.findById(quizId);
            if (q.isPresent()) {
                List<QuizAttempt> attempts = this.quizAttemptRepository.findQuizAttemptWithQuizId(quizId);
                List<QuizAttemptDTO> response = new ArrayList<>();
                attempts.forEach(quizAttempt -> {
                    QuizAttemptDTO attempt = new QuizAttemptDTO(quizAttempt,
                            this.userService.getUsername(quizAttempt.getUserId()),
                            this.quizzesRepository.findById(quizAttempt.getQuizId()).get());
                    response.add(attempt);
                });
                return ResponseHandler.generateResponse("Quiz attempts for provided quizId", HttpStatus.OK, response);
            } else {
                return ResponseHandler.generateResponse("Quiz with provided quizId not found!!", HttpStatus.NOT_FOUND, null);
            }
        } catch (Exception e) {
            logger.info("Exception occurred in the function getQuizAttemptDetailByQuizId : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getQuizDetailsByStudentId(String studentId) {
        try{
            Optional<User> userRef = this.userRepository.findById(studentId);
            if (userRef.isPresent()){
                User u = userRef.get();
                List<QuizAttempt> attempts = this.quizAttemptRepository.findQuizAttemptWithUserId(studentId);
                List<QuizAttemptDTO> response = new ArrayList<>();
                attempts.forEach(quizAttempt -> {
                    QuizAttemptDTO attempt = new QuizAttemptDTO(quizAttempt,
                            this.userService.getUsername(quizAttempt.getUserId()),
                            this.quizzesRepository.findById(quizAttempt.getQuizId()).get());
                    response.add(attempt);
                });
                return ResponseHandler.generateResponse("Quiz attempts for provided userId", HttpStatus.OK, response);
            }else{
                logger.info("student with student Id " + studentId + " not found");
                return ResponseHandler.generateResponse("student with student Id " + studentId + " not found", HttpStatus.NOT_FOUND, null);
            }
        }catch (Exception e){
            logger.info("Exception occurred in the function getQuizAttemptDetailByQuizId : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
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

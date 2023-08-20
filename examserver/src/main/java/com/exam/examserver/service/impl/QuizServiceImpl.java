package com.exam.examserver.service.impl;


import com.exam.examserver.dto.QuizDTO;
import com.exam.examserver.entity.ClassroomUser;
import com.exam.examserver.entity.Quizzes;
import com.exam.examserver.entity.User;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.ClassroomUserRepository;
import com.exam.examserver.repo.QuestionsRepository;
import com.exam.examserver.repo.QuizzesRepository;
import com.exam.examserver.service.QuizService;
import com.mongodb.client.result.UpdateResult;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    private static final String LOG_TAG = "QuizServiceImpl";
    Logger logger = LoggerFactory.getLogger(getClass());
    private final MongoTemplate mongoTemplate;

    @Autowired
    private QuizzesRepository quizzesRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private ClassroomUserRepository classroomUserRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ClassroomServiceImpl classroomService;

    public QuizServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ResponseEntity<?> createQuiz(QuizDTO quizDTO) {
        logger.info(LOG_TAG + " inside createQuiz with data : " + quizDTO.toString());
        if (quizDTO.getQuestionIds().size() == 0){
            if (this.classroomService.isClassroomPresentById(quizDTO.getClassroomId())){
                Quizzes quizzes = this.modelMapper.map(quizDTO, Quizzes.class);
                logger.info(LOG_TAG + " mapped quizzes object : " + quizzes.toString());
                quizzes = this.quizzesRepository.save(quizzes);
                logger.info(LOG_TAG + " added quiz in quizzes data : " + quizzes);
                return ResponseHandler.generateResponse("Quiz added successfully", HttpStatus.CREATED, quizzes);
            }else{
                return ResponseHandler.generateResponse("classroom with class id " + quizDTO.getClassroomId() + " not exists", HttpStatus.NOT_FOUND, null);
            }
        }
        return ResponseHandler.generateResponse("can not create quiz with questionIds, first add question", HttpStatus.CONFLICT, null);
    }

    @Override
    public ResponseEntity<?> changeQuizStatus(String quizId, Boolean status) {
        if (this.quizzesRepository.findById(quizId).isPresent()){
            Quizzes quiz = this.quizzesRepository.findById(quizId).get();
            quiz.setIsActive(status);
            this.quizzesRepository.save(quiz);
            return ResponseHandler.generateResponse("Quiz status updated to "+status+" for quiz "+quizId, HttpStatus.OK, null);
        }else{
            return ResponseHandler.generateResponse("Quiz with quizId " + quizId + " not found.", HttpStatus.NOT_FOUND, null);
        }
    }

    @Override
    public ResponseEntity<?> getQuizzesForUser(String userId) {
        try{
            List<ClassroomUser> classrooms = this.classroomUserRepository.findByUser(new User(userId));
            if (classrooms.size() > 0){
                logger.info("inside if condition - ");
                List<Quizzes> quizzes = new ArrayList<>();
                classrooms.forEach(classroom -> {
                    logger.info("classroom id : " + classroom.getClassroom().getClassroomId());
                    List<Quizzes> quizzesForClassroom = this.quizzesRepository.findByClassroomId(classroom.getClassroom().getClassroomId());
                    logger.info("quizzesForClassroom : " + quizzesForClassroom.size());
                    quizzesForClassroom.forEach(q -> logger.info(q.toString()));
                    quizzes.addAll(quizzesForClassroom);
                });
                if (quizzes.size() > 0){
                    List<QuizDTO> responseObj = new ArrayList<>();
                    quizzes.forEach(quiz -> {
                        QuizDTO q = this.modelMapper.map(quiz, QuizDTO.class);
                        q.setId(quiz.getId().toString());
                        q.setClassroomName(this.classroomService.getClassroomNameById(quiz.getClassroomId()));
                        responseObj.add(q);
                    });
                    return ResponseHandler.generateResponse("Ok", HttpStatus.OK, responseObj);
                }else{
                    return ResponseHandler.generateResponse("No Quiz found for the userId "+ userId, HttpStatus.NO_CONTENT, null);
                }
            }else{
                return ResponseHandler.generateResponse("No classroom and quiz found for the userId "+ userId, HttpStatus.NO_CONTENT, null);
            }
        }catch (Exception e){
            logger.info("Exception : "+e.getMessage());
            return ResponseHandler.generateResponse("Exception occurred...", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    public boolean isQuizExistsById(String quizId){
        return this.quizzesRepository.findById(quizId).isPresent();
    }

    public boolean addQuestionId(String quizId, String newQuestionId){
        Query query = new Query(Criteria.where("_id").is(quizId));
        Update update = new Update().addToSet("questionIds", newQuestionId);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Quizzes.class);
        return updateResult.getModifiedCount() > 0;
    }

    public boolean updateQuestionCountAndTotalScore(String quizId, int score) {
        Query query = new Query(Criteria.where("_id").is(quizId));
        Quizzes existingQuizzes = mongoTemplate.findOne(query, Quizzes.class);
        logger.info("existing quiz --> " + existingQuizzes.toString());
        if (existingQuizzes != null) {
            int newNumberOfQuestions = existingQuizzes.getNumberOfQuestions() + 1;
            int newTotalMarks = existingQuizzes.getTotalMarks() + score;

            Update update = new Update()
                    .set("numberOfQuestions", newNumberOfQuestions)
                    .set("totalMarks", newTotalMarks);
            UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Quizzes.class);
            return updateResult.getModifiedCount() > 0;
        }
        return false;
    }

    public boolean deleteQuestionIdAndCountAndChangeTotalScore(String quizId, String questionId, int score) throws NullPointerException{
        Query query = new Query(Criteria.where("_id").is(quizId));
        Quizzes existingQuizzes = mongoTemplate.findOne(query, Quizzes.class);
        logger.info("existing quiz --> " + existingQuizzes.toString());
        if (existingQuizzes != null) {
            // get
            List<String> questionIds = existingQuizzes.getQuestionIds();
            int totalScore = existingQuizzes.getTotalMarks();
            int numberOfQuestions = existingQuizzes.getNumberOfQuestions();

            // remove
            questionIds.remove(questionId);
            totalScore = totalScore - score;
            numberOfQuestions = numberOfQuestions - 1;

            Update update = new Update()
                    .set("questionIds", questionIds)
                    .set("totalMarks", totalScore)
                    .set("numberOfQuestions", numberOfQuestions);

            UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Quizzes.class);
            return updateResult.getModifiedCount() > 0;
        }
        return false;
    }
}

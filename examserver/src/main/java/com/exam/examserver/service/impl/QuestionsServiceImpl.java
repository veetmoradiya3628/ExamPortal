package com.exam.examserver.service.impl;

import com.exam.examserver.dto.QuestionsDTO;
import com.exam.examserver.entity.Questions;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.QuestionsRepository;
import com.exam.examserver.service.QuestionsService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionsServiceImpl implements QuestionsService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private QuizServiceImpl quizService;

    @Override
    public ResponseEntity<?> createQuestion(QuestionsDTO questionsDTO) {
        logger.info("received object --> " + questionsDTO);
        if (quizService.isQuizExistsById(questionsDTO.getQuizId())){
            Questions questions = this.modelMapper.map(questionsDTO, Questions.class);
            logger.info("converted object --> " + questions.toString());
            // can have more validations on questionType, score, question Length, can add more field as createdBy with user uuid
            questions = this.questionsRepository.save(questions);

            // have to handle update of quiz object with question change details
            if (this.quizService.addQuestionId(questions.getQuizId(), questions.getId().toString()) &&
                this.quizService.updateQuestionCountAndTotalScore(questions.getQuizId(), questions.getScore())){
                return ResponseHandler.generateResponse("Question successfully added", HttpStatus.OK, questions);
            }else{
                // roll back as not able to update ref details in quiz document
                logger.info("roll back as not able to update ref details in quiz document");
                this.questionsRepository.deleteById(questions.getId().toString());
                return ResponseHandler.generateResponse("Something went wrong, please try again!", HttpStatus.INTERNAL_SERVER_ERROR, null);
            }
        }
        return ResponseHandler.generateResponse("Quiz does not exists by quizId : "+ questionsDTO.getQuizId(), HttpStatus.NOT_FOUND, null);
    }

    @Override
    public ResponseEntity<?> getAllQuestions() {
        List<QuestionsDTO> questions = new ArrayList<>();
        this.questionsRepository.findAll().forEach(question -> {
            System.out.println(question.toString());
            QuestionsDTO questionsDTO = this.modelMapper.map(question, QuestionsDTO.class);
            questionsDTO.setId(question.getId().toHexString());
            questionsDTO.setQuizId(question.getQuizId());
            questions.add(questionsDTO);
        });
        return ResponseHandler.generateResponse("all the questions present in DB", HttpStatus.OK, questions);
    }

    @Override
    public ResponseEntity<?> deleteQuestion(String questionId) {
        Optional<Questions> questions = this.questionsRepository.findById(questionId);
        if (questions.isPresent()){
            Questions question = questions.get();
            if (this.quizService.deleteQuestionIdAndCountAndChangeTotalScore(
                    question.getQuizId(),
                    questionId,
                    question.getScore())
            ){
             this.questionsRepository.deleteById(questionId);
             return ResponseHandler.generateResponse("Question with questionID "+ questionId + " deleted successfully!", HttpStatus.OK, null);
            }else{
                return ResponseHandler.generateResponse("Something went wrong, please try again!", HttpStatus.INTERNAL_SERVER_ERROR, null);
            }
        }
        return ResponseHandler.generateResponse("Question with questionID "+ questionId + " not exists!", HttpStatus.NOT_FOUND, null);
    }
}

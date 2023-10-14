package com.exam.examserver.service.impl;

import com.exam.examserver.dto.OptionsDTO;
import com.exam.examserver.dto.QuestionsDTO;
import com.exam.examserver.entity.Options;
import com.exam.examserver.entity.QuestionAttempt;
import com.exam.examserver.entity.Questions;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.QuestionAttemptRepository;
import com.exam.examserver.req_res_format.QuestionAttemptRequest;
import com.exam.examserver.service.QuestionAttemptService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuestionAttemptServiceImpl implements QuestionAttemptService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private QuestionsServiceImpl questionsService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private QuizAttemptServiceImpl quizAttemptService;

    @Autowired
    private QuestionAttemptRepository questionAttemptRepository;

    @Override
    public ResponseEntity<?> attemptQuestionService(String questionId, String userId, QuestionAttemptRequest requestObject) {
        logger.info("service method attemptQuestionService called with request parameter : " + requestObject);
        try{
            // Validate questionId
            if(this.questionsService.isQuestionPresentById(questionId)){
                // Validate userId
                if(this.userService.isUserPresentById(userId)){
                    // Validate requestObject.quizAttemptId
                    if (this.quizAttemptService.isQuizAttemptPresentAndAttemptIsActive(requestObject.getQuizAttemptId())){
                        /*
                         * if already attempted then update it else add new data
                         */
                        List<QuestionAttempt> questionAttempts = this.questionAttemptRepository.checkForAttemptExists(userId, questionId, requestObject.getQuizAttemptId());
                        if(questionAttempts.size() > 0){
                            logger.info("question already attempted earlier so updating same question");
                            QuestionAttempt attemptedQuestion = questionAttempts.get(0);
//
                            attemptedQuestion.setQuestion(this.modelMapper.map(requestObject.getQuestion(), Questions.class));
                            attemptedQuestion.setUserId(userId);
                            attemptedQuestion.setQuestionId(questionId);
                            attemptedQuestion.setQuizAttemptId(requestObject.getQuizAttemptId());

                            List<Options> selectedOptions = new ArrayList<>();
                            requestObject.getSelectedOptions().forEach(optionsDTO -> {
                                selectedOptions.add(this.modelMapper.map(optionsDTO, Options.class));
                            });
                            attemptedQuestion.setSelectedOptions(selectedOptions);

                            attemptedQuestion.setIsAttemptedCorrect(evaluateQuestion(requestObject.getQuestion(), requestObject.getSelectedOptions()));
                            attemptedQuestion.setQuestionUpdatedAt(LocalDateTime.now());

                            attemptedQuestion = this.questionAttemptRepository.save(attemptedQuestion);

                            return ResponseHandler.generateResponse("question attempt updated successfully", HttpStatus.OK, attemptedQuestion);
                        }else {
                            // Evaluate the selectedOptions and if true add score else no score
                            Boolean isAttemptedCorrect = evaluateQuestion(requestObject.getQuestion(), requestObject.getSelectedOptions());

                            List<Options> selectedOptions = new ArrayList<>();
                            requestObject.getSelectedOptions().forEach(optionsDTO -> {
                                selectedOptions.add(this.modelMapper.map(optionsDTO, Options.class));
                            });
                            QuestionAttempt questionAttempt = QuestionAttempt.builder().question(this.modelMapper.map(requestObject.getQuestion(), Questions.class))
                                            .userId(userId)
                                            .questionId(questionId)
                                            .quizAttemptId(requestObject.getQuizAttemptId())
                                            .selectedOptions(selectedOptions)
                                            .isAttemptedCorrect(isAttemptedCorrect)
                                            .questionAttemptedAt(LocalDateTime.now())
                                            .questionUpdatedAt(LocalDateTime.now()).build();

                            QuestionAttempt attemptedQuestion = this.questionAttemptRepository.save(questionAttempt);

                            return ResponseHandler.generateResponse("question attempted successfully...", HttpStatus.OK, attemptedQuestion);
                        }
                    }else{
                        // quizAttemptId not present
                        logger.info("quiz attempt is either completed or not started");
                        return ResponseHandler.generateResponse("quiz attempt is either completed or not started", HttpStatus.NOT_ACCEPTABLE, null);
                    }
                }else{
                    // user with userId not exists
                    logger.info("user with userId "+ userId + " not exists!");
                    return ResponseHandler.generateResponse("user with userId "+ userId + " not exists!", HttpStatus.NOT_FOUND, null);
                }
            }else{
                // question with questionId not exists
                logger.info("question with questionId "+ questionId + " not exists!");
                return ResponseHandler.generateResponse("question with questionId "+ questionId + " not exists!", HttpStatus.NOT_FOUND, null);
            }
        }catch (Exception e){
            logger.info("Exception occurred in the function startQuizAttemptService : "+e.getMessage());
            return ResponseHandler.generateResponse("Exception : "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    /*
     * Method for question evaluation by question type and selected Options by user
     */
    private Boolean evaluateQuestion(QuestionsDTO question, List<OptionsDTO> selectedOptions) {
        if (selectedOptions.size() == 0) return false;
        if (question.getQuestionType() == Questions.QuestionType.SINGLE_CORRECT || question.getQuestionType() == Questions.QuestionType.TRUE_FALSE){
            if (selectedOptions.size() != 1) return false;
            String correctOptionText = "";
            for (int i = 0; i < question.getOptions().size(); i++){
                OptionsDTO option = question.getOptions().get(i);
                if (option.getIsCorrect()){
                    correctOptionText = option.getOptionText();
                }
            }
            logger.info(selectedOptions.get(0).getOptionText() + " " + correctOptionText);
            return selectedOptions.get(0).getOptionText().equalsIgnoreCase(correctOptionText);
        }else if (question.getQuestionType() == Questions.QuestionType.MULTIPLE_CORRECT){
            List<String> correctOptionTexts = new ArrayList<>();
            for (int i = 0; i < question.getOptions().size(); i++) {
                OptionsDTO option = question.getOptions().get(i);
                if (option.getIsCorrect()){
                    correctOptionTexts.add(option.getOptionText());
                }
            }
            List<String> selectedOptionsTexts = new ArrayList<>();
            for (OptionsDTO selectedOption : selectedOptions) {
                selectedOptionsTexts.add(selectedOption.getOptionText());
            }
            Collections.sort(correctOptionTexts);
            Collections.sort(selectedOptionsTexts);
            logger.info("correct Options Texts : " + correctOptionTexts + "\n" + "selected Options Texts : "+ selectedOptionsTexts + "\n" + correctOptionTexts.equals(selectedOptionsTexts));
            return correctOptionTexts.equals(selectedOptionsTexts);
        }
        return false;
    }
}

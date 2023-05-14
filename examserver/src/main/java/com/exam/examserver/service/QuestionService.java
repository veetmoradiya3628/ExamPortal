package com.exam.examserver.service;

import com.exam.examserver.entity.exam.Question;
import com.exam.examserver.entity.exam.Quiz;

import java.util.Set;

public interface QuestionService {
    public Question addQuestion(Question question);
    public Question updateQuestion(Question question);
    public Set<Question> getQuestions();
    public Question getQuestion(String questionId);
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    public void deleteQuestion(String questionId);

    public Question getQuestionId(String questionId);
}

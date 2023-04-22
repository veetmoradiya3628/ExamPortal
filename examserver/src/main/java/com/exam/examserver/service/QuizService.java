package com.exam.examserver.service;

import com.exam.examserver.entity.exam.Quiz;

import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getAllQuiz();
    public Quiz getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);
}

package com.exam.examserver.service;

import com.exam.examserver.entity.exam.Category;
import com.exam.examserver.entity.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getAllQuiz();
    public Quiz getQuiz(String quizId);
    public void deleteQuiz(String quizId);

    public List<Quiz> getQuizzesOfCategory(Category category);

    public List<Quiz> getActiveQuizzes();

    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}

package com.exam.examserver.dto;

import com.exam.examserver.entity.QuizAttempt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptDTO {
    public QuizAttempt quizAttempt;
    public String attemptedStudent;
}

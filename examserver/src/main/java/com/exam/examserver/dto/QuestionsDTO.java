package com.exam.examserver.dto;

import com.exam.examserver.entity.Questions.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionsDTO {
    private String id;
    private String questionText;
    private QuestionType questionType;
    private Integer score;
    private String quizId;
    private List<OptionsDTO> options;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

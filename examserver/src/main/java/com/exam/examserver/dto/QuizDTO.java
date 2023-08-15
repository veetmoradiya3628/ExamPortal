package com.exam.examserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    private String id;
    private String quizTitle;
    private String quizDescription;
    private String classroomId;
    private Boolean isActive;
    private Instant startTime;
    private Instant endTime;
    private Integer duration;
    private Integer numberOfQuestions;
    private Integer totalMarks;
    private String quizImage;
    private Integer maxAttempts;
    private String createdBy;
    private List<String> questionIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}


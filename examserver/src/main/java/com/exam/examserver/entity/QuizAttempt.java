package com.exam.examserver.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Document(collection = "attempt_quiz")
public class QuizAttempt {
    public enum QuizStatus {
        ON_GOING,
        ENDED
    }

    @Id
    private ObjectId id;
    private String userId;
    private String quizId;
    private Integer score;
    private List<String> correctQuestionsId;
    private List<String> wrongQuestionsId;
    private List<String> notAttemptedQuestionId;
    private Boolean isAttemptCompleted;
    private String reportUrl;
    private QuizStatus quizStatus;
    @CreatedDate
    private LocalDateTime attemptStartedAt;
    @LastModifiedDate
    private LocalDateTime attemptEndedAt;
}

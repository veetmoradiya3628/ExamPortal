package com.exam.examserver.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Document(collection = "attempt_question")
public class QuestionAttempt {
    @Id
    private ObjectId id;
    private Questions question;
    private String userId;
    private String quizAttemptId;
    private List<Options> selectedOptions;
    private Boolean isAttemptedCorrect;
    @CreatedDate
    private LocalDateTime questionAttemptedAt;

    @LastModifiedDate
    private LocalDateTime questionUpdatedAt;
}

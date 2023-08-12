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
@Document(collection = "questions")
public class Questions {
    public enum QuestionType {
        SINGLE_CORRECT,
        MULTIPLE_CORRECT,
        TRUE_FALSE
    }

    @Id
    private ObjectId id;
    private String questionText;
    private QuestionType questionType;
    private Integer score;
    private String quizId;
    private List<Options> options;
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

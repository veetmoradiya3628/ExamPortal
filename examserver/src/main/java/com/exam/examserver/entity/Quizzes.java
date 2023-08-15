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
@Document(collection = "quizzes")
public class Quizzes {
    @Id
    private ObjectId id;
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

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

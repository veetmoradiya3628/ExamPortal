package com.exam.examserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_quiz")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String quizId;

    private String quizTitle;
    private String quizDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    private Boolean isActive = false;

    private LocalDateTime starsAt;
    private LocalDateTime endsAt;
    private Integer noOfQuestions;
    private String quizImage;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions = new LinkedHashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "Quiz{" +
                "quizId='" + quizId + '\'' +
                ", quizTitle='" + quizTitle + '\'' +
                ", quizDescription='" + quizDescription + '\'' +
                ", category=" + category +
                ", isActive=" + isActive +
                ", starsAt=" + starsAt +
                ", endsAt=" + endsAt +
                ", noOfQuestions=" + noOfQuestions +
                ", quizImage='" + quizImage + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

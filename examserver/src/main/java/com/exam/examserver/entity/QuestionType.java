package com.exam.examserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_question_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionType {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer privateTypeId;

    private String description;

    @OneToMany(mappedBy = "questionType", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions = new LinkedHashSet<>();

    @Override
    public String toString() {
        return "QuestionType{" +
                "privateTypeId=" + privateTypeId +
                ", description='" + description + '\'' +
                ", questions=" + questions +
                '}';
    }
}

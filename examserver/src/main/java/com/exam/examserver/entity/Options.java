package com.exam.examserver.entity;

import lombok.*;
import org.bson.types.ObjectId;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Options {
    private String optionText;
    private Boolean isCorrect;
}


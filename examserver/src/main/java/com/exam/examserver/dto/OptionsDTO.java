package com.exam.examserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionsDTO {
    private String optionText;
    private Boolean isCorrect;
}

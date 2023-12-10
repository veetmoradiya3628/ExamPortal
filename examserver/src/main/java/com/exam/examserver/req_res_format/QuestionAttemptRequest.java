package com.exam.examserver.req_res_format;

import com.exam.examserver.dto.OptionsDTO;
import com.exam.examserver.dto.QuestionsDTO;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class QuestionAttemptRequest {
    QuestionsDTO question;
    String userId;
    String quizAttemptId;
    List<OptionsDTO> selectedOptions;
}


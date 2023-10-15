package com.exam.examserver.req_res_format;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class QuizAttemptDetailRequest {
    String quizId;
    String userId;
    String quizAttemptId;
}

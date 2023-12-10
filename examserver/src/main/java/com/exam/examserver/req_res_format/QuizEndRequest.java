package com.exam.examserver.req_res_format;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class QuizEndRequest {
    String quizAttemptId;
}

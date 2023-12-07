package com.exam.examserver.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassroomDTO {
    private String classroomId;
    private String classroomTitle;
    private String classroomSubTitle;
    private String classroomCode;
    private String organizationId;
    private Integer quizCnt;
    private Integer studentCnt;
    private Integer teacherCnt;
    private LocalDateTime createdAt;
}

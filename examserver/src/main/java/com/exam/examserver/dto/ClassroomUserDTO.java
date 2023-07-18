package com.exam.examserver.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ClassroomUserDTO {
    private String classroomUserId;
    private String classroomId;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

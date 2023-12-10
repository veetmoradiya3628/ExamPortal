package com.exam.examserver.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostsDTO {
    private String postId;
    private String postContent;
    private String classroomId;
    private Boolean commentAllowed;
    private String userId;
    private Integer commentCount;
    private String postCreatorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

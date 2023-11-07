package com.exam.examserver.dto;

import com.exam.examserver.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentsDTO {
    public String commentId;
    private String commentMessage;
    private String postId;
    private String userId;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.exam.examserver.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {
    String userId;
    String username;
    String email;
    String firstName;
    String lastName;
    String phone;
    Boolean enabled;
    String profileImage;
    List<String> roles;
    String organizationId;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

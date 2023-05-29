package com.exam.examserver.entity;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtRequest {
    String username;
    String password;
}

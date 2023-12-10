package com.exam.examserver.req_res_format;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtRequest {
    String username;
    String password;
}

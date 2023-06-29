package com.exam.examserver.req_res_format;

import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtResponse {
    String token;
    UserDetails userDetails;
}

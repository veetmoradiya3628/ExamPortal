package com.exam.examserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResetPasswordDTO {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}

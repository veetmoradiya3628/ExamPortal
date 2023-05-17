package com.exam.examserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/admin")
    public String getAdmin(){
        return "Accessible by Only Admin!!";
    }

    @GetMapping("/teacher")
    public String getTeacher(){
        return "Accessible by Only Teacher!!";
    }

    @GetMapping("/student")
    public String getStudent(){
        return "Accessible by Only Student";
    }
}

package com.exam.examserver.helper;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(){
        super("User with this username not found in database!!!");
    }
}

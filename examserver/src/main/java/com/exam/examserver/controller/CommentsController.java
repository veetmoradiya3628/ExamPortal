package com.exam.examserver.controller;

import com.exam.examserver.dto.CommentsDTO;
import com.exam.examserver.entity.Comments;
import com.exam.examserver.service.impl.CommentsServiceImpl;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments/")
@CrossOrigin("*")
public class CommentsController {
    final String LOG_TAG = "COMMENTS_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(CommentsController.class);

    @Autowired
    private CommentsServiceImpl commentsService;

    @GetMapping("/")
    public ResponseEntity<?> getAllComments(){
        logger.info(LOG_TAG + " method called getAllComments");
        return this.commentsService.getAllComments();
    }

    @PostMapping("/")
    public ResponseEntity<?> addComment(@RequestBody CommentsDTO comment)
    {
        logger.info(LOG_TAG + " method call addComment");
        return this.commentsService.addComment(comment);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getCommentsForPostByPostId(@PathVariable("postId") String postId){
        logger.info(LOG_TAG + " method call getCommentsForPostByPostId with postId : " + postId);
        return this.commentsService.getCommentsForPost(postId);
    }
}

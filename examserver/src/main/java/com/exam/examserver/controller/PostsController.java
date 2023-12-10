package com.exam.examserver.controller;

import com.exam.examserver.dto.PostsDTO;
import com.exam.examserver.service.PostsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/")
@CrossOrigin("*")
public class PostsController {
    final String LOG_TAG = "POSTS_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(PostsController.class);

    @Autowired
    private PostsService postsService;

    /*
     * API to get all the posts available in the system
     */
    @GetMapping("/")
    public ResponseEntity<?> getAllPosts(){
        return this.postsService.getAllPosts();
    }

    /*
     * API to create post
     */
    @PostMapping("/")
    public ResponseEntity<?> createPost(@RequestBody PostsDTO postsDTO){
        return this.postsService.createPost(postsDTO);
    }

    /*
     * API to get post for Classroom
     */
    @GetMapping("/classroom/{classId}")
    public ResponseEntity<?> getPostsForClassroom(@PathVariable("classId") String classId){
        return this.postsService.getPostsForClass(classId);
    }

    /*
     * API to delete post for Classroom
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePostById(@PathVariable("postId") String postId){
        return this.postsService.deletePostById(postId);
    }
}

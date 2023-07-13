package com.exam.examserver.service;

import com.exam.examserver.dto.PostsDTO;
import org.springframework.http.ResponseEntity;

public interface PostsService {
    public ResponseEntity<?> getAllPosts();

    public ResponseEntity<?> createPost(PostsDTO postsDTO);

    public ResponseEntity<?> getPostsForClass(String classId);

    public ResponseEntity<?> deletePostById(String postId);
}

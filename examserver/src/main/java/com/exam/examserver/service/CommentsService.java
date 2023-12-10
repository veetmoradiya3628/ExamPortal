package com.exam.examserver.service;

import com.exam.examserver.dto.CommentsDTO;
import com.exam.examserver.entity.Comments;
import org.springframework.http.ResponseEntity;

public interface CommentsService {
    public  ResponseEntity<?> getAllComments();

    public ResponseEntity<?> addComment(CommentsDTO comment);

    public ResponseEntity<?> getCommentsForPost(String postId);

    public ResponseEntity<?> deleteCommentWithCommentId(String commentId);
}

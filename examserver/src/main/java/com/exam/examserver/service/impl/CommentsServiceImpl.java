package com.exam.examserver.service.impl;

import com.exam.examserver.dto.CommentsDTO;
import com.exam.examserver.entity.Comments;
import com.exam.examserver.entity.Posts;
import com.exam.examserver.entity.User;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.CommentsRepository;
import com.exam.examserver.repo.PostsRepository;
import com.exam.examserver.service.CommentsService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentsServiceImpl implements CommentsService {

    final String LOG_TAG = "COMMENTS_SERVICE";
    Logger logger = LoggerFactory.getLogger(CommentsServiceImpl.class);

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ResponseEntity<?> getAllComments() {
        try {
            List<Comments> comments = this.commentsRepository.findAll();
            if (comments.size() > 0) {
                List<CommentsDTO> response = new ArrayList<>();
                comments.forEach(comment -> {
                    CommentsDTO d = this.modelMapper.map(comment, CommentsDTO.class);
                    response.add(d);
                });
                return ResponseHandler.generateResponse("", HttpStatus.OK, response);
            }
            return ResponseHandler.generateResponse("", HttpStatus.OK, comments);
        } catch (Exception e) {
            logger.info(LOG_TAG + " Exception in the method getAllComments : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in get all comments", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> addComment(CommentsDTO comment) {
        try {
            Comments c = new Comments();
            c.setCommentMessage(comment.getCommentMessage());
            c.setUser(new User(comment.getUserId()));
            c.setPost(new Posts(comment.getPostId()));
            c.setCreatedAt(LocalDateTime.now());
            c.setUpdatedAt(LocalDateTime.now());
            c = this.commentsRepository.save(c);
            return ResponseHandler.generateResponse("Successfully added comment for the post", HttpStatus.OK, c);
        } catch (Exception e) {
            logger.info(LOG_TAG + " exception in the method addComment : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in addComment", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getCommentsForPost(String postId) {
        try {
            if (this.postsRepository.findById(postId).isPresent()) {
                List<Comments> comments = this.commentsRepository.findByPost(new Posts(postId));
                List<CommentsDTO> response = new ArrayList<>();
                comments.forEach(comment -> {
                    CommentsDTO d = this.modelMapper.map(comment, CommentsDTO.class);
                    response.add(d);
                });
                return ResponseHandler.generateResponse("", HttpStatus.OK, response);
            }
            return ResponseHandler.generateResponse("post with postId : " + postId + " not found!!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            logger.info(LOG_TAG + " exception in the method getCommentsForPost : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in get getCommentsForPost", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> deleteCommentWithCommentId(String commentId) {
        try {
            if (this.commentsRepository.findById(commentId).isPresent()) {
                this.commentsRepository.deleteById(commentId);
                logger.info("comment deleted with commentId : " + commentId);
                return ResponseHandler.generateResponse("comment deleted with commentId : " + commentId, HttpStatus.OK, null);
            } else {
                logger.info(LOG_TAG + " comment not found with commentId : " + commentId);
                return ResponseHandler.generateResponse("comment not found with commentId : " + commentId, HttpStatus.NOT_FOUND, null);
            }
        } catch (Exception e) {
            logger.info(LOG_TAG + " exception in the method deleteCommentWithCommentId : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in get deleteCommentWithCommentId", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}

package com.exam.examserver.service.impl;

import com.exam.examserver.dto.CommentsDTO;
import com.exam.examserver.entity.Comments;
import com.exam.examserver.entity.Posts;
import com.exam.examserver.entity.User;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.CommentsRepository;
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
    private ModelMapper modelMapper;


    @Override
    public ResponseEntity<?> getAllComments() {
        try{
            List<Comments> comments = this.commentsRepository.findAll();
            if (comments.size() > 0){
                List<CommentsDTO> response = new ArrayList<>();
                comments.forEach(comment -> {
                    CommentsDTO d = this.modelMapper.map(comment, CommentsDTO.class);
                    response.add(d);
                });
                return ResponseHandler.generateResponse("", HttpStatus.OK, response);
            }
            return ResponseHandler.generateResponse("", HttpStatus.OK, comments);
        }catch (Exception e){
            logger.info(LOG_TAG + " exception in the method getAllComments : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in get all comments", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> addComment(CommentsDTO comment) {
        try{
            Comments c = new Comments();
            c.setCommentMessage(comment.getCommentMessage());
            c.setUser(new User(comment.getUserId()));
            c.setPost(new Posts(comment.getPostId()));
            c.setCreatedAt(LocalDateTime.now());
            c.setUpdatedAt(LocalDateTime.now());
            c = this.commentsRepository.save(c);
            return ResponseHandler.generateResponse("Successfully added comment for the post", HttpStatus.OK, c);
        }catch (Exception e){
            logger.info(LOG_TAG + " exception in the method addComment : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception in get all comments", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}

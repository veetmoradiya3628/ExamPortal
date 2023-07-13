package com.exam.examserver.service.impl;

import com.exam.examserver.dto.PostsDTO;
import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.Posts;
import com.exam.examserver.entity.User;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.ClassroomRepository;
import com.exam.examserver.repo.PostsRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.PostsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostsServiceImpl implements PostsService {
    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ClassroomRepository classroomRepository;
    @Override
    public ResponseEntity<?> getAllPosts() {
        List<Posts> availablePosts = this.postsRepository.findAll();
        List<PostsDTO> responsePosts = new ArrayList<>();
        if (availablePosts.size() > 0){
            availablePosts.forEach(posts -> {
                PostsDTO postsDTO = this.modelMapper.map(posts, PostsDTO.class);
                responsePosts.add(postsDTO);
            });
        }
        return ResponseEntity.ok(responsePosts);
    }

    @Override
    public ResponseEntity<?> createPost(PostsDTO postsDTO) {
        System.out.println(postsDTO.toString());
        Optional<User> isUser = this.userRepository.findById(postsDTO.getUserId());
        Optional<Classroom> isClassroom = this.classroomRepository.findById(postsDTO.getClassroomId());
        if (isUser.isPresent()){
            if (isClassroom.isPresent()){
                Posts posts = new Posts();
                posts.setPostContent(postsDTO.getPostContent());
                posts.setCommentAllowed(postsDTO.getCommentAllowed());
                posts.setClassroom(isClassroom.get());
                posts.setUser(isUser.get());
                Posts post = this.postsRepository.save(posts);
                postsDTO.setPostId(post.getPostId());
                postsDTO.setCreatedAt(posts.getCreatedAt());
                postsDTO.setUpdatedAt(posts.getUpdatedAt());
                return ResponseEntity.ok(postsDTO);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classroom with ID "+postsDTO.getClassroomId()+" not exists");
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID "+postsDTO.getUserId()+" not exists");
        }
    }

    @Override
    public ResponseEntity<?> getPostsForClass(String classId) {
        Optional<Classroom> isClassroom = this.classroomRepository.findById(classId);
        List<PostsDTO> responsePosts = new ArrayList<>();
        if (isClassroom.isPresent()){
            this.postsRepository.findByClassroomOrderByCreatedAtDesc(new Classroom(classId)).forEach(post -> {
                PostsDTO p = this.modelMapper.map(post, PostsDTO.class);
                p.setPostCreatorName(post.getUser().getFirstName()+" "+post.getUser().getLastName());
                responsePosts.add(p);
            });
        }else{
            return ResponseHandler.generateResponse("Classroom with ID "+classId+" not exists!", HttpStatus.NOT_FOUND, null);
        }
        return ResponseHandler.generateResponse("Post data for classroom with ID : "+classId, HttpStatus.OK, responsePosts);
    }

    @Override
    public ResponseEntity<?> deletePostById(String postId) {
        Optional<Posts> isPost = this.postsRepository.findById(postId);
        System.out.println("isPost -> "+isPost);
        if (isPost.isPresent()){
            System.out.println(isPost.get().getPostId());
            this.postsRepository.deleteById(postId);
            return ResponseHandler.generateResponse("Successfully deleted post with id : "+postId, HttpStatus.OK, null);
        }else{
            return ResponseHandler.generateResponse("Post with ID "+postId+" not exists", HttpStatus.NOT_FOUND, null);
        }
    }
}

package com.exam.examserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_posts")
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String postId;

    @Column(length = 5000)
    public String postContent;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(
            name = "classroom_id",
            referencedColumnName = "classroomId"
    )
    public Classroom classroom;

    @ColumnDefault("1")
    public Boolean commentAllowed;

    @ManyToOne(cascade =  CascadeType.MERGE)
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    public User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

package com.exam.examserver.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_classroom_user")
@ToString
public class ClassroomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String classroomUserId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(
            name = "classroom_id",
            referencedColumnName = "classroomId"
    )
    public Classroom classroom;

    @ManyToOne(cascade = CascadeType.MERGE)
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

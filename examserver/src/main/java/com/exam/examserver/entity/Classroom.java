package com.exam.examserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_classroom")
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String classroomId;

    public String classroomTitle;

    public String classroomSubTitle;

    public String classroomCode;

    @ManyToOne(cascade =  CascadeType.MERGE)
    @JoinColumn(
            name = "organization_id",
            referencedColumnName = "orgId"
    )
    public Organization organization;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

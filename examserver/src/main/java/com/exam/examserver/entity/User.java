package com.exam.examserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    private String username;

    private String password;

    private String email;
    private String firstName;
    private String lastName;
    @Column(name = "phone_no")
    private String phone;

    @Column(name = "is_enabled")
    private Boolean enabled;
    private String profileImage;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // user many roles
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    private Organization organization;

    @OneToMany(mappedBy = "teacher")
    Set<TeacherQuiz> teacherQuizSet;

    @OneToMany(mappedBy = "student")
    Set<StudentQuiz> studentQuizSet;

    @Transient
    private String roleName;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public User() {
    }

    public User(String userId) {
        this.userId = userId;
    }
    public User(String userId, String username, String password, String email, String firstName, String lastName, String phone, Boolean enabled, String profileImage, LocalDateTime createdAt, LocalDateTime updatedAt, Set<UserRole> userRoles, Organization organization, Set<TeacherQuiz> teacherQuizSet, Set<StudentQuiz> studentQuizSet) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.enabled = enabled;
        this.profileImage = profileImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userRoles = userRoles;
        this.organization = organization;
        this.teacherQuizSet = teacherQuizSet;
        this.studentQuizSet = studentQuizSet;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Set<TeacherQuiz> getTeacherQuizSet() {
        return teacherQuizSet;
    }

    public void setTeacherQuizSet(Set<TeacherQuiz> teacherQuizSet) {
        this.teacherQuizSet = teacherQuizSet;
    }

    public Set<StudentQuiz> getStudentQuizSet() {
        return studentQuizSet;
    }

    public void setStudentQuizSet(Set<StudentQuiz> studentQuizSet) {
        this.studentQuizSet = studentQuizSet;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> set = new HashSet<>();

        this.userRoles.forEach(userRole -> {
            set.add(new Authority(userRole.getRole().getRoleName()));
        });

        return set;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", enabled=" + enabled +
                ", profileImage='" + profileImage + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", userRoles=" + userRoles +
                ", organization=" + organization +
                ", teacherQuizSet=" + teacherQuizSet +
                ", studentQuizSet=" + studentQuizSet +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}

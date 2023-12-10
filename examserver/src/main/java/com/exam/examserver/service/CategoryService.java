package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Organization;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface CategoryService {
    public ResponseEntity<?> addCategory(Category category);
    public ResponseEntity<Category> updateCategory(Category category);
    public ResponseEntity<List<Category>> getCategories();
    public ResponseEntity<Category> getCategory(String categoryId);
    public ResponseEntity<?> deleteCategory(String categoryId);
}

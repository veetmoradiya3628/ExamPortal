package com.exam.examserver.service.impl;

import com.exam.examserver.entity.Category;
import com.exam.examserver.repo.CategoryRepository;
import com.exam.examserver.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> addCategory(Category category) {
        try{
            Category _category = this.categoryRepository.save(category);
            return new ResponseEntity<>(_category, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Category> updateCategory(Category category) {
        try {
            Optional<Category> categoryData = this.categoryRepository.findById(category.getCategoryId());
            Category _category = null;
            if (categoryData.isPresent()) {
                _category = categoryData.get();
                _category.setCategoryTitle(category.getCategoryTitle());
                _category.setCategoryDescription(category.getCategoryDescription());
            }
            assert _category != null;
            return new ResponseEntity<>(this.categoryRepository.save(_category), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Category>> getCategories() {
        try{
            List<Category> _categories = new ArrayList<>(this.categoryRepository.findAll());
            if(_categories.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(_categories, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Category> getCategory(String categoryId) {
        Optional<Category> categoryData = this.categoryRepository.findById(categoryId);
        return categoryData.map(category -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<?> deleteCategory(String categoryId) {
        try{
            Category category = new Category();
            category.setCategoryId(categoryId);
            this.categoryRepository.delete(category);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

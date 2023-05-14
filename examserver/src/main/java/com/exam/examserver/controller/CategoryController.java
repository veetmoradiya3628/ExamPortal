package com.exam.examserver.controller;

import com.exam.examserver.entity.exam.Category;
import com.exam.examserver.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    // add category
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        logger.info("data received to add category is "+category.toString());
        Category addedCategory = this.categoryService.addCategory(category);
        return ResponseEntity.ok(addedCategory);
    }

    // get category by id
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable("categoryId") String categoryId){
        return this.categoryService.getCategory(categoryId);
    }

    // get all categories
    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    // update categories
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    // delete category
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") String categoryId){
        this.categoryService.deleteCategory(categoryId);
    }

}

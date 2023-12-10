package com.exam.examserver.controller;

import com.exam.examserver.entity.Category;
import com.exam.examserver.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
    final String LOG_TAG = "CATEGORY_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    /*
    * API to add Category data..
    * */
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        logger.info(LOG_TAG + " data received to add category is "+category.toString());
        return this.categoryService.addCategory(category);
    }

    /*
     * API to add Category data by CategoryID
     * */
    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategory(@PathVariable("categoryId") String categoryId){
        logger.info(LOG_TAG + " categoryId received to get category is "+categoryId);
        return this.categoryService.getCategory(categoryId);
    }

    /*
     * API to get All Category Data
     * */
    @GetMapping("/")
    public ResponseEntity<List<Category>> getCategories(){
        logger.info(LOG_TAG + " inside get all categories details method");
        return this.categoryService.getCategories();
    }

    /*
      * API to update Category by ID
     */
    @PutMapping("/")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    /*
       *
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") String categoryId){
        logger.info(LOG_TAG + " inside delete category method" + categoryId);
        return this.categoryService.deleteCategory(categoryId);
    }

}

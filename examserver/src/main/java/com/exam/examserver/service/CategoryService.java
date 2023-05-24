package com.exam.examserver.service;

import com.exam.examserver.entity.Category;

import java.util.Set;

public interface CategoryService {
    public Category addCategory(Category category);
    public Category updateCategory(Category category);
    public Set<Category> getCategories();
    public Category getCategory(String categoryId);
    public void deleteCategory(String categoryId);
}

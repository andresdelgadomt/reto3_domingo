/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.repository.crud.InterfaceCategoria;
import com.usa.reto3.reto3.model.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author acami
 */
@Repository

public class CategoryRepository {
    @Autowired
    private InterfaceCategoria categoriaCrudRepository;
    
    public List<Category> getAll(){
        return (List<Category>) categoriaCrudRepository.findAll();
        
    }
    public Optional <Category> getCategoria(int id){
        return  categoriaCrudRepository.findById(id);
    }
    
    public Category save(Category categoria){
        return categoriaCrudRepository.save(categoria);
    }
    public void delete(Category category){
        categoriaCrudRepository.delete(category);
    }
}

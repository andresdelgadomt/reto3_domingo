/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.repository.crud.InterfaceQuadbike;
import com.usa.reto3.reto3.model.Quadbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author acami
 */
@Repository
public class QuadbikeRepositorio {
    @Autowired
    private InterfaceQuadbike QuadbikecrudRepository;
    
    public List<Quadbike> getAll(){
        return (List<Quadbike>) QuadbikecrudRepository.findAll();
        
    }
    public Optional <Quadbike> getQuadbike(int id){
        return  QuadbikecrudRepository.findById(id);
    }
    
    public Quadbike save(Quadbike quadbike){
        return QuadbikecrudRepository.save(quadbike);
    }
    
    public void delete(Quadbike quadbike){
        QuadbikecrudRepository.delete(quadbike);
    }
}

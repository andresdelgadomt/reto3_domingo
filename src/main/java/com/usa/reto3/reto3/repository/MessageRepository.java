/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.model.Message;
import com.usa.reto3.reto3.repository.crud.InterfaceMensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author acami
 */
@Repository
public class MessageRepository {
    @Autowired
    private InterfaceMensaje messageCrudRepository;
    
    public List<Message> getAll(){
        return (List<Message>) messageCrudRepository.findAll();
        
    }
    public Optional<Message> getMessage(int id){
        return messageCrudRepository.findById(id);
    }
    
    public Message save(Message m){
        return messageCrudRepository.save(m);
    }
    
    public void delete(Message message){
        messageCrudRepository.delete(message);
    }
}

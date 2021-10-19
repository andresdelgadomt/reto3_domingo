/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.model.Client;
import com.usa.reto3.reto3.repository.crud.InterfaceCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author acami
 */
@Repository
public class ClientRepository {
    
    @Autowired
    private InterfaceCliente clienteCrudRepository;
    
    public List<Client> getAll(){
        return (List<Client>) clienteCrudRepository.findAll();
    }
    
    public Optional<Client> getClient(int id){
        return clienteCrudRepository.findById(id);
    }
    public Client save(Client c){
        return clienteCrudRepository.save(c);
    }
    public void delete(Client c){
        clienteCrudRepository.delete(c);
    }
}

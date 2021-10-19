/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.usa.reto3.reto3.repository.crud;

import com.usa.reto3.reto3.model.Reservation;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author acami
 */
public interface InterfaceReservation extends CrudRepository <Reservation, Integer>{
    
}

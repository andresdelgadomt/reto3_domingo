/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.usa.reto3.reto3.repository.crud;

import com.usa.reto3.reto3.model.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

/**
 *
 * @author acami
 */
public interface InterfaceReservation extends CrudRepository <Reservation, Integer>{
      
     //jpql 
    @Query("select c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client) desc")  
    public List<Object[]> countTotalReservationByClient();
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);

    public List<Reservation> findAllByStatus(String status);

}
/*
 Cliente A, 20,
 Client B, 30,
 Client c, 3
 */

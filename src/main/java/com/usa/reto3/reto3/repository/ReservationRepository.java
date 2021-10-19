
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.model.Reservation;
import com.usa.reto3.reto3.repository.crud.InterfaceReservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author acami
 */
@Repository
public class ReservationRepository {
    @Autowired
    private InterfaceReservation reservationCrudRepository;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    public Reservation save(Reservation r){
        return reservationCrudRepository.save(r);
    }
    public void delete(Reservation reservation){
        reservationCrudRepository.delete(reservation);
   }
}

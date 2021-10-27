
package com.usa.reto3.reto3.repository;

import com.usa.reto3.reto3.model.Client;
import com.usa.reto3.reto3.model.Reservation;
import com.usa.reto3.reto3.model.custom.CountClient;
import com.usa.reto3.reto3.repository.crud.InterfaceReservation;

import java.util.ArrayList;
import java.util.Date;
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

   public List<Reservation> getReservationsByStatus(String status){
    return reservationCrudRepository.findAllByStatus(status);
   }

   public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
    return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
   }

   public List<CountClient> getTopClient(){
    List<CountClient> res=new ArrayList<>();

    List<Object[]> report =reservationCrudRepository.countTotalReservationByClient();
        for(int i=0; i<report.size();i++){
            Client reser=(Client) report.get(i)[0];
            Long cantidad=(Long) report.get(i)[1];
            CountClient cc=new CountClient(cantidad,reser);
            res.add(cc);
            /*
            res.add(new CountReservations((Integer) report.get(i)[1],(Reservation)report.get(i)[0]);
            */
        }
        return res;
    }
}

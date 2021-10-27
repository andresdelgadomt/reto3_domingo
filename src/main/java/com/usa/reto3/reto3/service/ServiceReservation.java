/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.usa.reto3.reto3.service;

import com.usa.reto3.reto3.model.Reservation;
import com.usa.reto3.reto3.model.custom.CountClient;
import com.usa.reto3.reto3.model.custom.StatusAmount;
import com.usa.reto3.reto3.repository.ReservationRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author acami
 */
@Service
public class ServiceReservation {
    @Autowired
    private ReservationRepository reservationRepository;
    public List<Reservation> getAll(){
        return (List<Reservation>) reservationRepository.getAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }
    public Reservation save(Reservation r){
        if (r.getIdReservation()==null){
            return reservationRepository.save(r);
        }
        else {
            Optional<Reservation> paux=reservationRepository.getReservation(r.getIdReservation());
            if (paux.isEmpty()){
                return reservationRepository.save(r);
            }
            else {
                return r;
            }
        }
    }
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation> e= reservationRepository.getReservation(reservation.getIdReservation());
            if(!e.isEmpty()){

                if(reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    e.get().setStatus(reservation.getStatus());
                }
                reservationRepository.save(e.get());
                return e.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }

    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<CountClient> getTopClient(){
        return reservationRepository.getTopClient();

    }

    public StatusAmount getStatusReport(){
        List<Reservation> completed=reservationRepository.getReservationsByStatus("completed");
        List<Reservation> cancelled=reservationRepository.getReservationsByStatus("cancelled");


        StatusAmount statAmt=new StatusAmount(completed.size(),cancelled.size());
        return statAmt;       
    }


    public List<Reservation> getReservationPeriod(String d1, String d2){


    // yyyy-mm-dd

        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne=new Date();
        Date dateTwo=new Date();

        try{

            dateOne=parser.parse(d1);
            dateTwo=parser.parse(d2);
        }catch(ParseException e){
            e.printStackTrace();
        }

        if(dateOne.before(dateTwo)){
            return reservationRepository.getReservationPeriod(dateOne,dateTwo);
        }else{
            return new ArrayList<>();
        }

    }
}

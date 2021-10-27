package com.usa.reto3.reto3.model.custom;

import com.usa.reto3.reto3.model.Reservation;

public class CountClient {
	private Long total;
	private Reservation reservation;


	public CountClient(Long total, Reservation reservation){
	this.total = total;
	this.reservation = reservation;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}
}
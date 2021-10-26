
package com.usa.reto3.reto3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author amdres camilo delgado ramos
 */
@Entity
@Table(name= "quadbike")
public class Quadbike implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     * creación de la variable id de acceso privado
     */
    private Integer id;
    /**
     * creación de la variable name de acceso privado
     */
    private String name;
    /**
     * creación de la variable brand de acceso privado
     */
    private String brand;
    /**
     * creación de la variable year de acceso privado
     */
    private Integer year;
    /**
     * creación de la variable descrpition de acceso privado
     */
    private String description;
    /**
     * creación de la variable category de acceso privado,
     * creando una relación entre la tabla quadbike y category
     */
    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("quadbikes")
    private Category category;
    /**
     * creación de la lista messages de acceso privado,
     * creando una relación entre la tabla quadbike y messages
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "quadbike")
    @JsonIgnoreProperties({"quadbike","client"})
    private List<Message> messages;
    /**
     * creación de la variable category de acceso privado,
     * creando una relación entre la tabla quadbike y reservations
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "quadbike")
    @JsonIgnoreProperties({"quadbike","client"})
    private List<Reservation> reservations;
    /**
     * creación del metodo para permitir ingreso de información a la variable id
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    /**
     * creación del metodo para permitir ingreso de información a la variable name
     */
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    /**
     * creación del metodo para permitir ingreso de información a la variable brand
     */
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
    /**
     * creación del metodo para permitir ingreso de información a la variable year
     */
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
    /**
     * creación del metodo para permitir ingreso de información a la variable description
     */
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * creación del metodo para permitir ingreso de información a la variable category
     */
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    /**
     * creación del metodo para permitir ingreso de información a la lista messages
     */
    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    /**
     * creación del metodo para permitir ingreso de información a la lista reservations
     */
    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
    
    
    
    
    

    
    
    
}

package com.usa.reto3.reto3.repository;


import com.usa.reto3.reto3.model.Score;
import com.usa.reto3.reto3.repository.crud.InterfaceScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ScoreRepository {

    @Autowired
    private InterfaceScore scoreCrudRepository;

    public List <Score> getAll(){
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreCrudRepository.findById(id);
    }

    public Score save(Score s){
        return scoreCrudRepository.save(s);
    }

    public void delete(Score s){
        scoreCrudRepository.delete(s);
    }
}

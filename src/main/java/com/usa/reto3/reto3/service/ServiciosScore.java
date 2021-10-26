package com.usa.reto3.reto3.service;


import com.usa.reto3.reto3.model.Score;
import com.usa.reto3.reto3.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiciosScore {
    @Autowired
    private ScoreRepository metodosCrud;

    public List<Score> getAll(){
        return metodosCrud.getAll();
    }
    public Optional<Score> getScore(int id){
        return metodosCrud.getScore(id);
    }

    public Score save(Score score){
        if(score.getIdScore()==null){
            return metodosCrud.save(score);
        }else{
            Optional<Score> paux=metodosCrud.getScore(score.getIdScore());
            if(paux.isEmpty()){
                return metodosCrud.save(score);
            }else{
                return score;
            }
        }
    }
    public Score update(Score score){
        if(score.getIdScore()!=null){
            Optional<Score>g=metodosCrud.getScore(score.getIdScore());
            if(!g.isEmpty()){
                if(score.getCalificacion()!=null){
                    g.get().setCalificacion(score.getCalificacion());
                }
                if(score.getComentario()!=null){
                    g.get().setComentario(score.getComentario());
                }
                return metodosCrud.save(g.get());
            }
        }
        return score;
    }
    public boolean deletescore(int Id){
        Boolean d=getScore(Id).map(score-> {
            metodosCrud.delete(score);
            return true;
        }).orElse(false);
        return d;
    }
}

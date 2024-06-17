package org.cmsigrist.cmaoytspring.controller;

import org.cmsigrist.cmaoytspring.model.Dessert;
import org.cmsigrist.cmaoytspring.repository.DessertsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/desserts")
public class DessertsController {
    @Autowired
    private DessertsRepository dessertsRepository;
    @GetMapping("/all")
    public List<Dessert> getAllDesserts() {
        return dessertsRepository.findAll();
    }
}

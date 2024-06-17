package org.cmsigrist.cmaoytspring.repository;

import org.cmsigrist.cmaoytspring.model.Dessert;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DessertsRepository extends MongoRepository<Dessert, String> {
}

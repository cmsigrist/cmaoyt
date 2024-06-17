package org.cmsigrist.cmaoytspring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@ToString
@Document(collection = "desserts")
public class Dessert extends RecipeInfo {
    int ovenTemperature;
}

package org.cmsigrist.cmaoytspring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecipeInfo {
    @Id
    String id;
    String title;
    Ingredient[] ingredients;
    String[] preparation;
    Yield yield;
    Time preparationTime;
    Source quote;
    Source source;
    String imageURL;
    RecipeType type;
    String category;
    Language language;
}

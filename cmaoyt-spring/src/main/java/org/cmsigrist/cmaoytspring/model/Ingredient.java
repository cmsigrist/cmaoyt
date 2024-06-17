package org.cmsigrist.cmaoytspring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Ingredient {
    int quantity;
    String unit;
    String name;
}

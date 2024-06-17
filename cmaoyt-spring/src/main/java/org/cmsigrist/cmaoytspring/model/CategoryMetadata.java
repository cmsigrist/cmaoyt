package org.cmsigrist.cmaoytspring.model;

public class CategoryMetadata extends Metadata {
    RecipeMetadata[] recipes;

    public CategoryMetadata(String title, RecipeType type, RecipeMetadata[] recipes) {
        super(title, type);
        this.recipes = recipes;
    }
}

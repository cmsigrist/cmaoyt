package org.cmsigrist.cmaoytspring.model;

public class Metadata {
    String title;
    RecipeType type;

    public Metadata(String title, RecipeType type) {
        this.title = title;
        this.type = type;
    }
}

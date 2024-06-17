package org.cmsigrist.cmaoytspring.model;

public class RecipeMetadata  extends Metadata {
    String id;
    String imageURL;

    public RecipeMetadata(String id, String title, RecipeType type, String imageURL) {
        super(title, type);
        this.id = id;
        this.imageURL = imageURL;
    }
}

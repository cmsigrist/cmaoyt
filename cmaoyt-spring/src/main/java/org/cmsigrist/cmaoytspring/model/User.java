package org.cmsigrist.cmaoytspring.model;

import lombok.Getter;

public class User {
    @Getter
    final String id;
    final String name;
    final UserRole role;
    
    public User(String id, String name, UserRole role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}

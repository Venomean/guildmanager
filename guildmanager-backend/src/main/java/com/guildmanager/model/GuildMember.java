package com.guildmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guild_members")
public class GuildMember {
    @Id
    private String id;
    private String name;
    private String characterClass;
    private int level;
    private String role;

    // Constructors
    public GuildMember() {}
    public GuildMember(String name, String characterClass, int level, String role) {
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.role = role;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCharacterClass() { return characterClass; }
    public void setCharacterClass(String characterClass) { this.characterClass = characterClass; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

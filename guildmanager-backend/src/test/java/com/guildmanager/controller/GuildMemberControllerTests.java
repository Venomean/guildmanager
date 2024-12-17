package com.guildmanager.controller;

import com.guildmanager.model.GuildMember;
import com.guildmanager.repository.GuildMemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class GuildMemberControllerTests {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private GuildMemberRepository guildMemberRepository;

    // Test 1: Get all members
    @DirtiesContext
    @Test
    void getAllMembers_shouldReturnListWithOneObject_whenOneObjectWasSavedInGuildMemberRepository() throws Exception {
        GuildMember guildmember = new GuildMember("Mayooo", "Mayo", 69, "Sauce");
        guildMemberRepository.save(guildmember);

        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                            {
                                "name": "Mayooo",
                                "characterClass": "Mayo",
                                "level": 69,
                                "role": "Sauce"
                            }
                        ]
                        """));
    }

    // Test 2: Create a member
    @Test
    void createMember_shouldReturnCreatedGuildMember_whenNewMemberIsAdded() throws Exception {
        GuildMember newGuildMember = new GuildMember("JohnDoe", "Warrior", 50, "Tank");

        mvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "JohnDoe",
                                    "characterClass": "Warrior",
                                    "level": 50,
                                    "role": "Tank"
                                }
                                """))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("JohnDoe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.characterClass").value("Warrior"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.level").value(50))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("Tank"));
    }

    // Test 3: Update a member
    @Test
    void updateMember_shouldReturnUpdatedGuildMember_whenMemberIsUpdated() throws Exception {
        GuildMember guildmember = new GuildMember("JaneDoe", "Mage", 45, "Healer");
        guildMemberRepository.save(guildmember);
        String updatedName = "JaneDoeUpdated";
        String updatedClass = "Sorcerer";

        mvc.perform(MockMvcRequestBuilders.put("/api/members/{id}", guildmember.getId())
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "%s",
                                    "characterClass": "%s",
                                    "level": 45,
                                    "role": "Healer"
                                }
                                """.formatted(updatedName, updatedClass)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(updatedName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.characterClass").value(updatedClass));
    }

    // Test 4: Delete a member
    @Test
    void deleteMember_shouldReturnNoContent_whenMemberIsDeleted() throws Exception {
        GuildMember guildmember = new GuildMember("Elena", "Rogue", 60, "DPS");
        guildMemberRepository.save(guildmember);

        mvc.perform(MockMvcRequestBuilders.delete("/api/members/{id}", guildmember.getId()))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        // Ensure the member is actually deleted from the database
        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty());
    }
}
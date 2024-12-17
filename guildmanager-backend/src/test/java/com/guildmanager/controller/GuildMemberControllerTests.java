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

    @DirtiesContext
    @Test
    void getAllMembers_shouldReturnListWithOneObject_whenOneObjectWasSavedInGuildMemberRepository() throws Exception {
        GuildMember guildmember = new GuildMember("Mayooo", "Mayo", 69, "Sauce" );
        guildMemberRepository.save(guildmember);

        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                
                                [
                                 {
                                     "name": "Mayooo",
                                     "characterClass": "Mayo",
                                     "level": 69,
                                     "role": "Sauce"
                                 }
                                ]
                                """
                ));
    }
}
package com.guildmanager.controller;

import com.guildmanager.model.GuildMember;
import com.guildmanager.service.GuildMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class GuildMemberController {

    private final GuildMemberService guildMemberService;

    @Autowired
    public GuildMemberController(GuildMemberService guildMemberService) {
        this.guildMemberService = guildMemberService;
    }

    @GetMapping
    public List<GuildMember> getAllMembers() {
        return guildMemberService.getAllMembers();
    }

    @PostMapping
    public GuildMember createMember(@RequestBody GuildMember member) {
        return guildMemberService.createMember(member);
    }

    @PutMapping("/{id}")
    public GuildMember updateMember(@PathVariable String id, @RequestBody GuildMember member) {
        return guildMemberService.updateMember(id, member);
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable String id) {
        guildMemberService.deleteMember(id);
    }
}
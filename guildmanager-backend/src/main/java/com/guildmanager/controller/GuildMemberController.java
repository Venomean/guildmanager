package com.guildmanager.controller;

import com.guildmanager.model.GuildMember;
import com.guildmanager.service.GuildMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        System.out.println("Fetching all guild members...");  // Console log added
        List<GuildMember> members = guildMemberService.getAllMembers();
        System.out.println("Retrieved " + members.size() + " guild members.");  // Log the number of members retrieved
        return members;
    }

    @PostMapping
    public ResponseEntity<GuildMember> createMember(@RequestBody GuildMember member) {
        GuildMember createdMember = guildMemberService.createMember(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
    }

    @PutMapping("/{id}")
    public GuildMember updateMember(@PathVariable String id, @RequestBody GuildMember member) {
        return guildMemberService.updateMember(id, member);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        guildMemberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
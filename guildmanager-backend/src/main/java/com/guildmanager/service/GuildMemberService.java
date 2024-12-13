package com.guildmanager.service;

import com.guildmanager.model.GuildMember;
import com.guildmanager.repository.GuildMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuildMemberService {

    private final GuildMemberRepository repository;

    @Autowired
    public GuildMemberService(GuildMemberRepository repository) {
        this.repository = repository;
    }

    public List<GuildMember> getAllMembers() {
        return repository.findAll();
    }

    public GuildMember createMember(GuildMember member) {
        return repository.save(member);
    }

    public GuildMember updateMember(String id, GuildMember member) {
        Optional<GuildMember> existingMember = repository.findById(id);
        if (existingMember.isPresent()) {
            member.setId(id);
            return repository.save(member);
        }
        return null;
    }

    public void deleteMember(String id) {
        repository.deleteById(id);
    }
}
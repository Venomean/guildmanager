package com.guildmanager.repository;

import com.guildmanager.model.GuildMember;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuildMemberRepository extends MongoRepository<GuildMember, String> {
}
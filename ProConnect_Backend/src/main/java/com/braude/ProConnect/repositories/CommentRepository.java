package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}

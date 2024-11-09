package com.app.streaming.repository;

import com.app.streaming.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByVideoId(Long videoId);
    List<Comment> findByUserId(Long userId);
}
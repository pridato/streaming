package com.app.streaming.repository;

import com.app.streaming.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByUserId(Long userId);
}
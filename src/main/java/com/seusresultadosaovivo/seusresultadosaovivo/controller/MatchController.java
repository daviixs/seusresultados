package com.seusresultadosaovivo.seusresultadosaovivo.controller;

import com.seusresultadosaovivo.seusresultadosaovivo.models.Match;
import com.seusresultadosaovivo.seusresultadosaovivo.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<Match>> getMatches(@RequestParam(name = "date", required = false) Optional<String> date) {
        try {
            if (date.isPresent()) {
                LocalDate d = LocalDate.parse(date.get()); // formato ISO yyyy-MM-dd
                List<Match> matches = matchService.fetchMatchesByDate(d);
                return ResponseEntity.ok(matches);
            }
            List<Match> matches = matchService.fetchMatches();
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/matches/tomorrow")
    public ResponseEntity<List<Match>> getTomorrowMatches() {
        try {
            LocalDate tomorrow = LocalDate.now().plusDays(1);
            List<Match> matches = matchService.fetchMatchesByDate(tomorrow);
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
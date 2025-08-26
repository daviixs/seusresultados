package com.seusresultadosaovivo.seusresultadosaovivo.service;

import com.seusresultadosaovivo.seusresultadosaovivo.models.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class MatchService {

    private static final Logger log = LoggerFactory.getLogger(MatchService.class);
    private final WebClient webClient;

    // Injeta a apiKey corretamente via construtor e constrói o WebClient com ela
    public MatchService(
            @Value("${football.api.key:}") String apiKeyProp,
            WebClient.Builder webClientBuilder
    ) {
        String apiKeyEnv = System.getenv("FOOTBALL_API_KEY");
        String apiKey = (apiKeyEnv != null && !apiKeyEnv.isBlank()) ? apiKeyEnv : apiKeyProp;
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("[MatchService] Nenhuma API key fornecida (FOOTBALL_API_KEY ou football.api.key). Usando dados mock.");
        }
        this.webClient = webClientBuilder
                .baseUrl("https://api.football-data.org/v4")
                .defaultHeader("X-Auth-Token", apiKey != null ? apiKey : "")
                .build();
    }

    public List<Match> fetchMatches() {
        try {
            FootballDataMatchesResponse response = webClient.get()
                    .uri("/matches")
                    .retrieve()
                    .bodyToMono(FootballDataMatchesResponse.class)
                    .block();

            List<Match> mapped = mapFromFootballData(response);
            if (mapped.isEmpty()) {
                return getMockMatches();
            }
            return mapped;
        } catch (Exception ex) {
            return getMockMatches();
        }
    }

    public List<Match> fetchMatchesByDate(java.time.LocalDate date) {
        try {
            String day = date.toString(); // yyyy-MM-dd
            FootballDataMatchesResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/matches")
                            .queryParam("dateFrom", day)
                            .queryParam("dateTo", day)
                            .build())
                    .retrieve()
                    .bodyToMono(FootballDataMatchesResponse.class)
                    .block();

            List<Match> mapped = mapFromFootballData(response);
            if (mapped.isEmpty()) {
                // Fallback: filtra os mocks pela mesma data (compara prefixo yyyy-MM-dd)
                String prefix = day;
                List<Match> filtered = new java.util.ArrayList<>();
                for (Match m : getMockMatches()) {
                    if (m.getDate() != null && m.getDate().startsWith(prefix)) {
                        filtered.add(m);
                    }
                }
                return filtered;
            }
            return mapped;
        } catch (Exception ex) {
            String day = date.toString();
            String prefix = day;
            List<Match> filtered = new java.util.ArrayList<>();
            for (Match m : getMockMatches()) {
                if (m.getDate() != null && m.getDate().startsWith(prefix)) {
                    filtered.add(m);
                }
            }
            return filtered;
        }
    }

    private List<Match> mapFromFootballData(FootballDataMatchesResponse response) {
        List<Match> out = new ArrayList<>();
        if (response == null || response.matches == null) return out;
        for (FootballDataMatch fm : response.matches) {
            try {
                Match m = new Match();
                m.setId(String.valueOf(fm.id));
                m.setHomeTeam(fm.homeTeam != null ? fm.homeTeam.name : null);
                m.setAwayTeam(fm.awayTeam != null ? fm.awayTeam.name : null);
                Integer home = (fm.score != null && fm.score.fullTime != null) ? fm.score.fullTime.home : null;
                Integer away = (fm.score != null && fm.score.fullTime != null) ? fm.score.fullTime.away : null;
                m.setHomeScore(home);
                m.setAwayScore(away);
                // status: SCHEDULED, TIMED, IN_PLAY, PAUSED, FINISHED, etc.
                String status = fm.status != null ? fm.status.toLowerCase() : null;
                if ("in_play".equals(status) || "paused".equals(status)) status = "live";
                if ("timed".equals(status)) status = "scheduled";
                m.setStatus(status);
                m.setDate(fm.utcDate);
                m.setMinute(null); // football-data não fornece minuto diretamente no /matches

                String leagueKey = mapCompetitionToLeagueKey(fm.competition);
                m.setLeague(leagueKey);

                out.add(m);
            } catch (Exception ignore) {
                // ignora elemento malformado
            }
        }
        return out;
    }

    private String mapCompetitionToLeagueKey(FootballCompetition comp) {
        if (comp == null) return "other";
        String code = comp.code != null ? comp.code : "";
        String name = comp.name != null ? comp.name.toLowerCase() : "";
        // Mapas comuns
        switch (code) {
            case "PL": return "premier_league";
            case "PD": return "laliga";
            case "BL1": return "bundesliga";
            case "SA": return "serie_a";
            case "FL1": return "ligue_1";
            case "BSA": return "brasileirao";
            default:
                // Heurística por nome
                if (name.contains("premier")) return "premier_league";
                if (name.contains("liga") && name.contains("espan")) return "laliga";
                if (name.contains("bundesliga")) return "bundesliga";
                if (name.contains("serie a")) return "serie_a";
                if (name.contains("ligue 1")) return "ligue_1";
                if (name.contains("brasileir")) return "brasileirao";
                return "other";
        }
    }

    // DTOs mínimos para desserializar a API football-data
    private static class FootballDataMatchesResponse { public List<FootballDataMatch> matches; }
    private static class FootballDataMatch {
        public long id;
        public String utcDate;
        public String status;
        public FootballCompetition competition;
        public FootballTeam homeTeam;
        public FootballTeam awayTeam;
        public FootballScore score;
    }
    private static class FootballCompetition { public String code; public String name; }
    private static class FootballTeam { public String name; }
    private static class FootballScore { public FootballScoreFT fullTime; }
    private static class FootballScoreFT { public Integer home; public Integer away; }

    private List<Match> getMockMatches() {
        List<Match> list = new ArrayList<>();

        Match m1 = new Match();
        m1.setId("1");
        m1.setHomeTeam("Manchester City");
        m1.setAwayTeam("Arsenal");
        m1.setHomeScore(2);
        m1.setAwayScore(1);
        m1.setStatus("live");
        m1.setLeague("premier_league");
        m1.setDate("2025-08-23T20:00:00Z");
        m1.setMinute(67);
        list.add(m1);

        Match m2 = new Match();
        m2.setId("2");
        m2.setHomeTeam("Real Madrid");
        m2.setAwayTeam("Barcelona");
        m2.setHomeScore(0);
        m2.setAwayScore(0);
        m2.setStatus("scheduled");
        m2.setLeague("laliga");
        m2.setDate("2025-08-24T18:30:00Z");
        m2.setMinute(null);
        list.add(m2);

        Match m3 = new Match();
        m3.setId("3");
        m3.setHomeTeam("Bayern Munich");
        m3.setAwayTeam("Borussia Dortmund");
        m3.setHomeScore(3);
        m3.setAwayScore(2);
        m3.setStatus("finished");
        m3.setLeague("bundesliga");
        m3.setDate("2025-08-22T16:00:00Z");
        m3.setMinute(90);
        list.add(m3);

        return list;
    }

    // Wrapper para o payload real da API: { "matches": [ ... ] }
    private static class MatchesResponse {
        private List<Match> matches;

        public List<Match> getMatches() {
            return matches;
        }

        public void setMatches(List<Match> matches) {
            this.matches = matches;
        }
    }
}
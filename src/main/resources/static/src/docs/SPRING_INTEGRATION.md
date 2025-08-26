# 🔌 Como Conectar com Spring Boot

## 1. Backend Spring Boot

Crie um projeto Spring Boot com as seguintes dependências:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
</dependencies>
```

## 2. Controller Spring Boot

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // URL do React
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping("/matches")
    public ResponseEntity<List<Match>> getAllMatches() {
        try {
            List<Match> matches = matchService.fetchMatches();
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
```

## 3. Model Spring Boot

```java
public class Match {
    private String id;
    private String homeTeam;
    private String awayTeam;
    private Integer homeScore;
    private Integer awayScore;
    private String status; // "live", "finished", "scheduled"
    private String league;
    private String date;
    private Integer minute;
    
    // Getters e Setters...
}
```

## 4. Service Spring Boot

```java
@Service
public class MatchService {
    
    @Value("${football.api.key}")
    private String apiKey;
    
    private final WebClient webClient;
    
    public MatchService() {
        this.webClient = WebClient.builder()
            .baseUrl("https://api.football-data.org/v4")
            .defaultHeader("X-Auth-Token", apiKey)
            .build();
    }
    
    public List<Match> fetchMatches() {
        // Busca dados da API de futebol
        return webClient.get()
            .uri("/matches")
            .retrieve()
            .bodyToFlux(Match.class)
            .collectList()
            .block();
    }
}
```

## 5. Alterar o Hook React

No arquivo `src/hooks/useMatches.ts`, altere a linha 36:

```typescript
// ❌ REMOVER esta linha:
throw new Error('API indisponível - usando dados mock');

// ✅ ADICIONAR estas linhas:
const response = await fetch('http://localhost:8080/api/matches');
if (!response.ok) throw new Error('API Error');
const data = await response.json();
setMatches(data);
```

## 6. Configurar CORS no Spring Boot

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

## 7. API Key da Football-Data.org

1. Registre-se em: https://www.football-data.org/client/register
2. Adicione no `application.properties`:

```properties
football.api.key=SUA_API_KEY_AQUI
server.port=8080
```

## 8. Como Rodar

1. **Backend**: `mvn spring-boot:run` (porta 8080)
2. **Frontend**: `npm run dev` (porta 5173)

Agora o React irá consumir dados reais do Spring Boot! 🚀
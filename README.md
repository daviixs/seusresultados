# Seus Resultados Ao Vivo

Aplicação com backend em Spring Boot (WebFlux) e frontend em React + Vite.

## Execução rápida (Windows)
- Script para iniciar backend e frontend automaticamente em janelas separadas:
  - PowerShell: `powershell -ExecutionPolicy Bypass -File .\scripts\start-dev.ps1`
  - Ou clique direito no arquivo `scripts\start-dev.ps1` e escolha “Run with PowerShell”.

## Como rodar o backend (porta 8080)
1. Pré‑requisitos: Java 21 e Maven instalados.
2. No diretório raiz do projeto, execute:
   - Windows PowerShell: `./mvnw.cmd spring-boot:run`
   - Ou: `mvn spring-boot:run`
3. O backend estará disponível em: http://localhost:8080

## Como rodar o frontend (porta 5173)
1. Pré‑requisitos: Node.js 18+ e npm.
2. Vá para a pasta do frontend:
   - `cd src/main/resources/static`
3. Instale dependências e rode o servidor de desenvolvimento do Vite:
   - `npm install`
   - `npm run dev`
4. Acesse o frontend em: http://localhost:5173

## Integração front + back no desenvolvimento
- Já configuramos:
  - Vite para rodar na porta 5173 e com proxy para `/api` apontando para `http://localhost:8080`.
  - CORS no backend liberado para `http://localhost:5173` e `http://127.0.0.1:5173`.
- O frontend consome a API usando caminho relativo (`/api/matches`), então:
  - Em dev, o Vite proxia para o backend (sem erros de CORS).
  - Em produção (sem Vite), a aplicação pode ser servida pelo Spring Boot se os arquivos da versão build forem colocados em `static`.

## Build de produção do frontend
Se quiser gerar os arquivos estáticos de produção do frontend:
1. `cd src/main/resources/static`
2. `npm run build`
3. Os arquivos ficarão em `dist/`. Para o Spring servir esses arquivos diretamente, mova/copiar o conteúdo de `dist` para `src/main/resources/static` (substituindo o conteúdo atual) ou ajustar a pipeline de build para isso.

## Endpoints úteis
- API (hoje): `GET http://localhost:8080/api/matches`
- API por data específica: `GET http://localhost:8080/api/matches?date=YYYY-MM-DD` (ex.: 2025-08-24)
- API de amanhã: `GET http://localhost:8080/api/matches/tomorrow`

## Dicas
- API Key: você pode definir em `src/main/resources/application.properties` (football.api.key=...) ou via variável de ambiente `FOOTBALL_API_KEY` (tem prioridade). Sem chave válida, o backend usa dados mock.
- Se mudar a porta do backend, ajuste o proxy no `vite.config.ts` (server.proxy) ou o `server.port` no `application.properties`.
- Se acessar via 127.0.0.1 ou outra origem, inclua a origem no CORS (WebConfig e/ou @CrossOrigin no controller).

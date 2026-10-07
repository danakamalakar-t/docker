# SMART SOLUTIONS — Full-Stack DevSecOps Project

A production-style business application for SMART SOLUTIONS, with a responsive frontend, Node.js API, PostgreSQL lead database, Docker Compose, Nginx reverse proxy, health checks and CI security gates.

## Architecture
Browser → Nginx → Node.js API → PostgreSQL

## Run locally
1. Copy `.env.example` to `.env` and change the database password.
2. Run `docker compose up --build`.
3. Open `http://localhost:8080`.
4. API health: `http://localhost:4000/api/health`.

## API
- `GET /api/health`
- `GET /api/services`
- `POST /api/leads`

## DevSecOps roadmap
1. GitHub branch protection and pull requests
2. Unit/integration tests
3. npm audit + Trivy
4. Docker image hardening and SBOM
5. Terraform infrastructure
6. AWS deployment
7. HTTPS, secrets management and monitoring
8. Grafana/Prometheus and centralized logs

Never commit `.env` or real credentials.

.PHONY: build up down logs up-prod logs-prod

# ==========================================
# COMANDOS DE DESENVOLVIMENTO LOCAL
# ==========================================

# Constrói a imagem local do Web App
build:
	docker compose build

# Sobe o ambiente local com Hot Reload na porta 3000
up:
	docker compose up -d

# Para todos os containers web e zera redes locais
down:
	docker compose down

# Monitora em tempo real os logs do servidor Next.js de desenvolvimento
logs:
	docker compose logs -f web

# ==========================================
# COMANDOS DE SERVIDOR / DIGITAL OCEAN
# ==========================================

# (RODADO NA VPS) Sobem a aplicação Web otimizada e escondida atrás do Nginx (porta 80)
up-prod:
	docker compose -f docker-compose.prod.yml up -d

# (RODADO NA VPS) Monitora o serviço em execução
logs-prod:
	docker compose -f docker-compose.prod.yml logs -f web

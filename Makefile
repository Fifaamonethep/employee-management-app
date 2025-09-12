# Unitel Laos Employee Management System - Docker Commands

.PHONY: help build up down logs clean dev-up dev-down prod-up prod-down

# Default target
help:
	@echo "Unitel Laos Employee Management System"
	@echo "Available commands:"
	@echo "  make build      - Build Docker images"
	@echo "  make up         - Start production services"
	@echo "  make down       - Stop production services"
	@echo "  make logs       - View application logs"
	@echo "  make clean      - Clean up Docker resources"
	@echo "  make dev-up     - Start development services"
	@echo "  make dev-down   - Stop development services"
	@echo "  make prod-up    - Start production services"
	@echo "  make prod-down  - Stop production services"
	@echo "  make db-init    - Initialize database with sample data"
	@echo "  make db-backup  - Backup database"
	@echo "  make db-restore - Restore database from backup"

# Build Docker images
build:
	@echo "Building Docker images..."
	docker-compose build

# Start production services
up: prod-up

prod-up:
	@echo "Starting production services..."
	docker-compose up -d
	@echo "Services started! Access the application at http://localhost:3000"
	@echo "pgAdmin available at http://localhost:5050 (admin@unitel.la / admin123)"

# Stop production services
down: prod-down

prod-down:
	@echo "Stopping production services..."
	docker-compose down

# Start development services
dev-up:
	@echo "Starting development services..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development services started! Access the application at http://localhost:3001"

# Stop development services
dev-down:
	@echo "Stopping development services..."
	docker-compose -f docker-compose.dev.yml down

# View logs
logs:
	docker-compose logs -f app

# Clean up Docker resources
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f
	@echo "Cleanup complete!"

# Initialize database with sample data
db-init:
	@echo "Initializing database..."
	docker-compose exec postgres psql -U unitel_admin -d unitel_employees -f /docker-entrypoint-initdb.d/01-create-employees-table.sql
	docker-compose exec postgres psql -U unitel_admin -d unitel_employees -f /docker-entrypoint-initdb.d/02-seed-employees-data.sql
	docker-compose exec postgres psql -U unitel_admin -d unitel_employees -f /docker-entrypoint-initdb.d/03-create-admin-user.sql
	@echo "Database initialized!"

# Backup database
db-backup:
	@echo "Creating database backup..."
	docker-compose exec postgres pg_dump -U unitel_admin unitel_employees > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "Backup created!"

# Restore database from backup
db-restore:
	@echo "Restoring database from backup..."
	@read -p "Enter backup file name: " backup_file; \
	docker-compose exec -T postgres psql -U unitel_admin -d unitel_employees < $$backup_file
	@echo "Database restored!"

# Health check
health:
	@echo "Checking service health..."
	docker-compose ps
	@echo "Application: http://localhost:3000"
	@echo "pgAdmin: http://localhost:5050"

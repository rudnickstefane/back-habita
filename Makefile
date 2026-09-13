-include .env

.DEFAULT_GOAL := test

init:
	@echo "Initializing repository"
	chmod +x init.sh && ./init.sh

setup:
	@echo "Installing dependencies"
	command -v pnpm >/dev/null || npm install -g pnpm
	pnpm install

migrate:
	@echo "Migrating database"
	npm run migrate:prod

.PHONY: test
test:
	@echo "Running tests"
	pnpm lint:check && pnpm format:check && pnpm test:cov

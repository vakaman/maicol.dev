SHELL := /bin/bash

.PHONY: install up build test preview lint

install:
	@if [ ! -d node_modules ]; then npm install; fi

up:
	@if [ ! -d node_modules ]; then npm install; fi
	npm run dev -- --host 0.0.0.0 --port 8080

build:
	npm run build

test:
	npm run test

preview:
	npm run preview -- --host 0.0.0.0 --port 4173

lint:
	npm run lint

# maicol.dev

## Desenvolvimento local

```bash
make up
```

O projeto sobe com Vite em `http://localhost:8080`.

## GitHub Pages

O build gera artefatos compatíveis com GitHub Pages:

* `dist/404.html` para fallback de SPA
* `dist/CNAME` com `maicol.dev`
* `dist/.nojekyll` para publicação estática

O deploy automático está em `.github/workflows/deploy-pages.yml`.

## Dev Container

Abra o repositório em um ambiente compatível com Dev Containers e use o container definido em `.devcontainer/devcontainer.json`.

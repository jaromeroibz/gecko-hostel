# Gecko Hostel Backend (Flask)

Backend base para el sistema del hostel usando Flask con estructura modular.

## Estructura

```text
backend/
  app/
    api/
      __init__.py
      routes/
        __init__.py
        health.py
    models/
      __init__.py
    __init__.py
    config.py
    extensions.py
  .env.example
  .gitignore
  requirements.txt
  wsgi.py
```

## Setup local

1. Crear y activar entorno virtual:
   - `python3 -m venv venv`
   - `source venv/bin/activate`
2. Instalar dependencias:
   - `pip install -r requirements.txt`
3. Crear archivo de entorno:
   - `cp .env.example .env`
4. Configurar PostgreSQL local:
   - crear base de datos `hostel_db`
   - ajustar credenciales en `.env` si aplica
5. Ejecutar servidor:
   - `flask --app wsgi run --debug`

## Endpoint inicial

- `GET /api/health`
  - Respuesta: `API running`

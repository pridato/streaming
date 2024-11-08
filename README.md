# Plataforma de Streaming

Este es un proyecto de **plataforma de streaming** desarrollado con **Angular**. El objetivo es construir una aplicación similar a YouTube, que permita a los usuarios ver videos, interactuar con el contenido y gestionar listas de reproducción. A lo largo del desarrollo se agregarán funcionalidades como autenticación de usuarios, recomendación de videos y más.

## Características

- Visualización de videos en tiempo real.
- Gestión de contenido de video (subir, listar, etc.).
- Interacción con el contenido (comentarios, likes, etc.).
- Diseño modular utilizando Angular.
- Implementación futura de servicios como **Kubernetes**, **Docker**, **Redis** y **Kafka** para escalabilidad y rendimiento.

## Tecnologías

- **Frontend**: Angular
- **Backend** (futuro): Java (Spring Boot)
- **Base de datos**: MySQL o PostgreSQL (relacional)
- **Otros** (futuros): Redis, Kafka, Kubernetes, Docker

## Requisitos

Antes de comenzar con el desarrollo, asegúrate de tener instalados los siguientes programas:

- **Node.js** (preferiblemente LTS)
- **pnpm** (gestor de dependencias)
- **Angular CLI** (si no está instalado, usa `pnpm add -g @angular/cli`)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/plataforma-streaming.git
   cd plataforma-streaming
   ```

2. Instala las dependencias utilizando **pnpm**:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   ng serve
   ```

   Esto iniciará la aplicación en `http://localhost:4200`.

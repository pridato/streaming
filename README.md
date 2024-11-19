# Plataforma de Suscripción Premium

Plataforma moderna de suscripción con arquitectura de microservicios, que integra un sistema de autenticación en Java, un chatbot en Python y un frontend en React. Permite a los usuarios suscribirse a diferentes planes y gestionar sus suscripciones.

## Características

### Frontend

- **Inicio de sesión y registro**: autenticación de usuarios.
- **Checkout**: gestión de suscripciones y pagos.

### Backend

- **Autenticación**: gestión de usuarios y suscripciones con JWT.
- **Chatbot**: gestión de consultas con python.
- **Pagos**: integración con Stripe y Paypal.

## Tecnologías

- **Frontend**: React, Zustand, tailwind
- **Backend**: Spring Boot, JWT
- **Base de datos**: MySQL, redis
- **Chatbot**: Python, Flask

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/plataforma-streaming.git
   cd plataforma-streaming
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm run dev
   ```

4. Accede a la aplicación en `http://localhost:5173`.

## Funcionalidades

- Inicio de sesión y registro.
- Checkout con Stripe y Paypal.
- Chatbot con python.

## Seguridad

- Autenticación con JWT.
- Protección de rutas con autenticación.
- Cookies para almacenar el token de autenticación.

# Recibos para Freelancers

Plataforma para poder generar recibos orientado a freelancers hecho con React 18 (Frontend) y .NET 7 (Backend).

## ¿Cómo levantarla? (Para fines de desarrollo y pruebas)

### Prerrequisito
- Clonarse el repositorio
- Tener instalado node (la versión trabajada fue v18.16.0)
- Tener instalado el sdk de .NET (la versión trabajada fue .NET 7)

### Frontend
1. Dirigirse a la carpeta del frontend (RecibosFreelancer.Frontend)
2. Ejecutar `npm run dev` en una terminal
3. Dirigirse al navegador con la ruta que se le proporciona

### Backend
1. Dirigirse a la carpeta del backend (RecibosFreelancer.Backend)
2. Ejecutar `dotnet run` en una terminal

## Funcionalidades

### Crear recibo
El software web le permite generar recibos ingresando los datos que se necesita
en el formulario.

## TODO
- [ ] Implementar una base de datos, para guardar los recibos generados como un historial (backend)
- [ ] Implementar una vista para visualizar el historial de recibos generados y poder descargarlos (frontend)
- [ ] Desplegarla en la nube, e.g Azure (deploy)

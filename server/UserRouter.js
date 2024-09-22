const express = require('express');
const { registerUser, loginUser, getUser, addUser, updateUser, deleteUser } = require('./UserController');
const { getAirports, addAirport, updateAirport, deleteAirport } = require('./AirportController');
const { getRoutes, addRoutes, updateRoutes, deleteRoute } = require('./RoutesController');
const { saveTicket, getUserTickets, deleteTicket } = require('./ticketController');

const userRouter = express.Router();

// User routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/users', getUser);
userRouter.post('/users', addUser);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

// Airport routes
userRouter.get('/airport', getAirports);
userRouter.post('/airport', addAirport);
userRouter.put('/airport/:id', updateAirport);
userRouter.delete('/airport/:id', deleteAirport);

// Route management
userRouter.get('/routes', getRoutes);
userRouter.post('/routes', addRoutes);
userRouter.put('/routes/:id', updateRoutes);
userRouter.delete('/routes/:id', deleteRoute);

// Ticket routes
userRouter.post('/savetickets', saveTicket);
userRouter.get('/gettickets', getUserTickets);
userRouter.delete('/deleteticket/:ticketId', deleteTicket);

module.exports = userRouter;

const Ticket = require('./Ticket');

const saveTicket = async (req, res) => {
  const ticketData = req.body; // Ticket data from the request body

  try {
    const ticket = new Ticket(ticketData);
    const savedTicket = await ticket.save(); // Save the ticket to MongoDB

    res.status(201).json({ message: 'Ticket saved successfully', ticket: savedTicket });
  } catch (error) {
    console.error('Error saving ticket:', error.message);
    res.status(500).json({ message: 'Failed to save ticket', error: error.message });
  }
};

const getUserTickets = async (req, res) => {
  const { username } = req.query; // Fetch the username from query parameters
  console.log(`Fetching tickets for user: ${username}`); // Add server-side logging

  try {
    const tickets = await Ticket.find({ username });

    if (tickets.length > 0) {
      res.status(200).json(tickets);
    } else {
      res.status(404).json({ message: 'No tickets found.' });
    }
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  const { ticketId } = req.params; // Get the ticketId from the route parameter

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId); // Use Mongoose to delete the ticket by ID

    if (deletedTicket) {
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error deleting ticket:', error.message);
    res.status(500).json({ message: 'Failed to delete ticket', error: error.message });
  }
};

module.exports = { saveTicket, getUserTickets, deleteTicket };

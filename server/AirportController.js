const Airport = require('./Airport.js');

const getAirports = async (req, res) => {
  try {
    const airports = await Airport.find();
    res.status(200).json(airports);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ message: 'Failed to retrieve airports' });
  }
};

const addAirport = async (req, res) => {
  try {
    const newAirport = new Airport(req.body);
    const savedAirport = await newAirport.save();
    res.status(201).json(savedAirport);
  } catch (error) {
    console.error('Error adding airport:', error);
    res.status(500).json({ message: 'Failed to add airport' });
  }
};

const updateAirport = async (req, res) => {
  try {
    const updatedAirport = await Airport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAirport);
  } catch (error) {
    console.error('Error updating airport:', error);
    res.status(500).json({ message: 'Failed to update airport' });
  }
};

const deleteAirport = async (req, res) => {
  try {
    await Airport.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Airport deleted successfully' });
  } catch (error) {
    console.error('Error deleting airport:', error);
    res.status(500).json({ message: 'Failed to delete airport' });
  }
};

module.exports = { getAirports, addAirport, updateAirport, deleteAirport };

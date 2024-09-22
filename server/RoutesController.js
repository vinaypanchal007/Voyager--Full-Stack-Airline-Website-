const Routes = require('./Routes.js')

const getRoutes = async(req,res) => {
    try {
        const routes = await Routes.find();
        res.status(200).json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ message: 'Failed to retrieve routes' });
    }
}

const addRoutes = async(req,res) => {
    try {
        const newRoutes = new Routes(req.body);
        const savedRoutes = await newRoutes.save();
        res.status(201).json(savedRoutes);
    } catch (error) {
        console.error('Error adding route:', error);
        res.status(500).json({ message: 'Failed to add route' });
    }
};

const updateRoutes = async (req, res) => {
    try {
      const updatedRoute = await Routes.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedRoute);
    } catch (error) {
      console.error('Error updating Route:', error);
      res.status(500).json({ message: 'Failed to update route' });
    }
};
  
  const deleteRoute = async (req, res) => {
    try {
      await Routes.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
      console.error('Error deleting Route:', error);
      res.status(500).json({ message: 'Failed to delete route' });
    }
};

module.exports = {getRoutes, addRoutes, updateRoutes, deleteRoute};
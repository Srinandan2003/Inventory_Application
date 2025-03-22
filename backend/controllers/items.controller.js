import { itemModel } from "../models/inventory.model.js";

export const getItems = async(req,res) =>{
    try {
        const items = await itemModel.find();
        if(items.length == 0) {
            return res.status(200).json({message:"No items found",data : []})
        }
        console.log("Items successfully fetched");
        res.status(200).json(items);
    } catch (error) {
        console.log("Error while fetching items",error);
        res.status(500).json({message:`Unable to fetch items: ${error.message}`})
        
    }
}

export const addItem = async(req,res) =>{
    try {
        const {name,quantity,category,status,description,createdAt,updatedAt} = req.body

        if(!name || !quantity || !category || !status){
            return res.status(400).json({message:"Missing required fields"})
        }

        const newItem = await itemModel.create({name,quantity,category,status,description, createdAt, updatedAt});
        console.log("Posted item",newItem)
        res.status(201).json({message:"Item added successfully",data:newItem});
    } catch (error) {
        console.error("Error while posting item",error.message);
        res.status(500).json({message:`Error while adding item : ${error.message}`})
    }
}

export const deleteItem = async (req,res) => {
    const   ID = req.params.id
    try {
        const deleteItem = await itemModel.findByIdAndDelete(ID)
        if(!deleteItem) {
            return res.status(404).json({message:"Item not found"})
        }
        console.log("Item deleted successfully",deleteItem);
        res.status(200).json({message:"Item deleted successfully",deletedData : deleteItem});
    } catch (error) {
        console.error("Error occured while deleting item", error.message);
        res.status(500).json({message:"Error while deleteing item ", error:error});
    }
}

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, category, status, description } = req.body;
    try {
      const updatedItem = await itemModel.findByIdAndUpdate(
        id,
        { name, quantity, category, status, description },
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      console.log("Updated item successfully", updatedItem);
      res.status(200).json({ message: "Updated item successfully", updatedData: updatedItem });
    } catch (error) {
      console.error("Error occurred while updating item", error.message);
      res.status(500).json({ message: "Error while updating", error: error.message });
    }
  };
const items = require("../items");

// Get All Items
const getItems = async (req, reply) => {
  reply.send(items);
};

// Get single Item
const getItem = async (req, reply) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);
  reply.send(item);
};

// Add Item
const postItems = async (req, reply) => {
  const { name } = req.body;

  //   ? check name field
  if (!name) {
    reply.code(400).send({ msg: "Name is required" });
    return;
  }

  //?   check name already exists or not
  const found = items.find((item) => item.name === name);
  if (found) {
    reply.code(400).send({ msg: "Item already exists" });
    return;
  }

  const item = {
    id: String(items.length + 1),
    name,
  };
  items.push(item);
  reply.code(201).send(item, { msg: "New Item added successfully" });
};

// Delete the ITEM
const deleteItem = async (req, reply) => {
  const { id } = req.params;
  const itemFound = items.find((item) => item.id === id);
  if (!itemFound) {
    reply.code(404).send({ msg: "Item not found" });
    return;
  }

  items = items.filter((item) => item.id !== id);
  reply.send({ msg: `Item ${id} has been removed` });
};

const updateItem = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find((item) => item.id === id);
  if (!item) {
    reply.code(404).send({ msg: "Item not found" });
    return;
  }

  if (!name) {
    reply.code(400).send({ msg: "Name is required" });
    return;
  }

  const isNameExist = items.find((item) => item.name === name);
  if (isNameExist) {
    reply.code(400).send({ msg: "Name already exists" });
    return;
  }

  items = items.map((item) => (item.id === id ? { id, name } : item));
  reply.send(items, { msg: `Item ${id} has been updated` });
};
module.exports = {
  getItems,
  getItem,
  postItems,
  deleteItem,
  updateItem,
};

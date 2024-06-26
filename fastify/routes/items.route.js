const {
  getItem,
  getItems,
  postItems,
  deleteItem,
  updateItem,
} = require("../controllers/items.controller");

// ? Instead of repeating them again and again we craete a object of same properties
const Items = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getItemsOption = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Items,
      },
    },
  },
};

const getItemOption = {
  schema: {
    reponse: {
      200: Items,
    },
  },
};

const postItemsOption = {
  schema: {
    201: Items,
  },
};

const deleteItemOption = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

const updateItemOption = {
  schema: {
    response: {
      200: Items,
    },
  },
};

function itemsRoute(fastify, options, done) {
  // * Get all items
  fastify.get("/items", getItemsOption, getItems);

  //   * Get Single item
  fastify.get("/items/:id", getItemOption, getItem);

  //   *Add items
  fastify.post("/items", postItemsOption, postItems);

  //   * delete items
  fastify.delete("/items/:id", deleteItemOption, deleteItem);

  //   * update items
  fastify.put("/items/:id", updateItemOption, updateItem);
  done();
}

module.exports = itemsRoute;

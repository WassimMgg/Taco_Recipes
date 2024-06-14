import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';
let recipe; 
app.set('view engine', 'ejs'); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data; 

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.post("/recipe", (req, res) => {
  let selectedIdx;
  recipe = JSON.parse(recipeJSON);
  data = req.body["choice"];
  if (data === "chicken") {
    selectedIdx = 0;
  } else if (data === "beef") {
    selectedIdx = 1;
  } else if(data === "fish") {
    selectedIdx = 2;
  } else {
    // redirect back to the home page if no known option is selected
    res.redirect("/");
    return;
  }

  let selected = {
    name: recipe[selectedIdx].name,
    price: recipe[selectedIdx].price,
    protein: recipe[selectedIdx].ingredients.protein.name,
    salsa: recipe[selectedIdx].ingredients.salsa.name,
    preparation: recipe[selectedIdx].ingredients.protein.preparation,
    toppingsOne: recipe[selectedIdx].ingredients.toppings[0].name,
    toppingsOneQuantity: recipe[selectedIdx].ingredients.toppings[0].quantity,
    toppingsTwo: recipe[selectedIdx].ingredients.toppings[1].name,
    toppingsTwoQuantity: recipe[selectedIdx].ingredients.toppings[1].quantity,
    toppingsThree: recipe[selectedIdx].ingredients.toppings[2].name,
    toppingsThreeQuantity: recipe[selectedIdx].ingredients.toppings[2].quantity
  }

  // send response with the data
  res.render("index.ejs", {
    name: selected.name,
    price: selected.price,
    protein: selected.protein,
    salsa: selected.salsa,
    preparation: selected.preparation,
    toppingsOne: selected.toppingsOne,
    toppingsOneQuantity: selected.toppingsOneQuantity,
    toppingsTwo: selected.toppingsTwo,
    toppingsTwoQuantity: selected.toppingsTwoQuantity,
    toppingsThree: selected.toppingsThree,
    toppingsThreeQuantity: selected.toppingsThreeQuantity
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

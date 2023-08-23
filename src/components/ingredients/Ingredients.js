import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-f5f7c-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       const loadUserIngredients = [];
  //       for (const key in responseData) {
  //         loadUserIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadUserIngredients);
  //     });
  // }, []);

  const filterHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    try {
      fetch(
        "https://react-hooks-f5f7c-default-rtdb.firebaseio.com/ingredients.json",
        {
          method: "POST",
          body: JSON.stringify(ingredient),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          setUserIngredients((prevIngredients) => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient },
          ]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-hooks-f5f7c-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm addIngredientHandler={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterHandler} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

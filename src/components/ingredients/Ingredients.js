import React, { useCallback, useEffect, useReducer, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../../ui/ErrorModal";
import LoadingIndicator from "../../ui/LoadingIndicator";

const loadReducer = (htttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...htttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { loading: false, error: null };
    case "LOAD":
      return { loading: true, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [htttpState, dispatch] = useReducer(loadReducer, {
    loading: false,
    error: null,
  });

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
    setIsLoading(false);
  }, []);

  const addIngredientHandler = (ingredient) => {
    // setIsLoading(true);
    dispatch({ type: "SEND" });
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
          dispatch({ type: "RESPONSE" });
          // setIsLoading(false);
          setUserIngredients((prevIngredients) => [
            ...prevIngredients,
            { id: responseData.name, ...ingredient },
          ]);
        });
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-hooks-f5f7c-default-rtdb.firebaseio.com/ingredients/${ingredientId}.js`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setUserIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        );
      })
      .catch((error) => {
        // setError("Something went wrong!");
        dispatch({ type: "ERROR", errorData: "Something went wrong!" });
        // setIsLoading(false);
      });
  };

  const clearError = () => {
    // setIsLoading(false);
    // setError(null);
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {htttpState.error && (
        <ErrorModal onClose={clearError}>{htttpState.error}</ErrorModal>
      )}
      <IngredientForm
        addIngredientHandler={addIngredientHandler}
        isLoading={htttpState.loading}
      />

      <section>
        <Search onLoadIngredients={filterHandler} />
        {/* Need to add list here! */}
        {isLoading && <LoadingIndicator />}
        {userIngredients && (
          <IngredientList
            ingredients={userIngredients}
            onRemoveItem={removeIngredientHandler}
          />
        )}
      </section>
    </div>
  );
}

export default Ingredients;

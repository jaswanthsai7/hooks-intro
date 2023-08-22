import React, { useState } from "react";
import "./IngredientForm.css";
import Card from "../../ui/Card";

const IngredientForm = React.memo((props) => {
  const inputState = useState({
    title: " ",
    amount: " ",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(inputState);
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState[0].title}
              onChange={(e) => {
                const title = e.target.value;
                inputState[1]((prevInputState) => ({
                  title: title,
                  amount: prevInputState.amount,
                }));
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState[1].amount}
              onChange={(e) =>
                inputState[1]((prevInputState) => ({
                  title: prevInputState.title,
                  amount: e.target.value,
                }))
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

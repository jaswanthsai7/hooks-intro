import React, { useState } from "react";
import "./IngredientForm.css";
import Card from "../../ui/Card";
import LoadingIndicator from "../../ui/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const inputState = useState({
    title: " ",
    amount: " ",
  });

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.addIngredientHandler({ title: enteredTitle, amount: enteredAmount });
    console.log(inputState);
    setEnteredTitle('')
    setEnteredAmount('')
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
              value={enteredTitle}
              onChange={(e) => {
                // const title = e.target.value;
                // inputState[1]((prevInputState) => ({
                //   title: title,
                //   amount: prevInputState.amount,
                // }));
                setEnteredTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(e) =>
                // inputState[1]((prevInputState) => ({
                //   title: prevInputState.title,
                //   amount: e.target.value,
                // }))
                setEnteredAmount(e.target.value)
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

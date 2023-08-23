import React, { useEffect, useRef, useState } from "react";

import "./Search.css";
import Card from "../../ui/Card";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query =
          filter.toString().length === 0
            ? ""
            : `?orderBy="title"&equalTo="${filter}"`;

        fetch(
          "https://react-hooks-f5f7c-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            console.log(responseData);
            const loadUserIngredients = [];
            for (const key in responseData) {
              loadUserIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadUserIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

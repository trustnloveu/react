import { useEffect, useState } from "react";

// HTTP
import axios from "axios";

// CSS
import classes from "./AvailableMeals.module.css";

// Component
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

//* Main
const AvailableMeals = () => {
  //* State
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //* useEffect
  useEffect(() => {
    const getMeals = async () => {
      const { data } = await axios({
        method: "GET",
        url: "https://react-test-98851-default-rtdb.firebaseio.com/meals.json",
        responseType: "json",
      });

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    getMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

class Storage {
  static getCaloriesLimit(defaultLimit = 2000) {
    let caloriesLimit;

    if (localStorage.getItem('caloriesLimit') === null) {
      caloriesLimit = defaultLimit;
    } else {
      caloriesLimit = +localStorage.getItem('caloriesLimit');
    }
    return caloriesLimit;
  }

  static setCaloriesLimit(caloriesLimit) {
    localStorage.setItem('caloriesLimit', caloriesLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;

    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    console.log(localStorage.getItem('totalCalories'));
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  static getMeals() {
    let meals;

    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    const newMeals = meals.filter((meal) => meal.id !== id);

    localStorage.setItem('meals', JSON.stringify(newMeals));
  }

  static getWorkouts() {
    let workouts;

    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    const newWorkouts = workouts.filter((workout) => workout.id !== id);

    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
  }

  static clearStorage() {
    localStorage.clear();
  }
}

export default Storage;

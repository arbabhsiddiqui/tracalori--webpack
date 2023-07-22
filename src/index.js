import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';

import CalorieTracker from './Tracker';
import { Meal, Workout } from './item';

// css imports
import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    this._loadEventListeners();
    this._tracker.loadItems();
  }

  _loadEventListeners() {
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItem.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItem.bind(this, 'workout'));

    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));

    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    if (type === 'meal') {
      const name = document.getElementById('meal-name');
      const calorie = document.getElementById('meal-calories');

      // todo add notification
      if (name.value === '' || calorie.value === '') {
        alert('please enter value');

        return;
      }

      const meal = new Meal(name.value, +calorie.value);

      this._tracker.addMeal(meal);

      const collapseMeal = document.getElementById('collapse-meal');
      new Collapse(collapseMeal, {
        toggle: true,
      });
    } else {
      const name = document.getElementById('workout-name');
      const calorie = document.getElementById('workout-calories');

      // todo add notification
      if (name.value === '' || calorie.value === '') {
        alert('please enter value');

        return;
      }

      const workout = new Workout(name.value, +calorie.value);

      this._tracker.addWorkout(workout);

      const collapseWorkout = document.getElementById('collapse-workout');
      new Collapse(collapseWorkout, {
        toggle: true,
      });
    }
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      const id = e.target.closest('.card').getAttribute('data-id');

      type === 'meal'
        ? this._tracker.removeMeal(id)
        : this._tracker.removeWorkout(id);

      e.target.closest('.card').remove();
    }
  }

  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _reset() {
    this._tracker.reset();

    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';

    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById('limit');
    if (+limit.value === 0 || limit.value === '') {
      alert('please enter reset value');
      return;
    }

    this._tracker.setLimit(+limit.value);

    const modelEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modelEl);
    modal.hide();
  }
}

new App();

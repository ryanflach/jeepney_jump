# Jeepney Jump

**Play the game [here](https://ryanflach.github.com/jeepney_jump).**

Jeepney Jump is a Filipino-themed 2D endless obstacle game. Built in JavaScript, it is a single-page, client-side web application that utilizes [Webpack](https://github.com/webpack/webpack).

As the player, you control a jeepney, an iconic form of public transit in the Philippines.

_Jeepney:_<br />
![Jeepney](http://i.imgur.com/Ug08xZm.png)

As the jeepney travels a 2D boulevard in metro Manila, the player uses the space bar to jump and avoid obstacles.

_Obstacles:_<br />
![Motorcycle](http://i.imgur.com/YEH4N39.png)
![Street Dog](http://i.imgur.com/ZaCuUTL.png)

The player begins with 5 health, losing one upon each collision. Health can be regained by picking up bonus items--lumpia and mango, two famous Filipino foods--along the way. If a player is at maximum health, collecting a bonus item will result in the earning of additional points.

_Bonus Items:_<br />
![Lumpia](http://i.imgur.com/IZHTu1L.png)
![Mango](http://i.imgur.com/LPUTj9K.png)

Difficulty is automatically increased based on the amount of time the player survives. Difficulty is incremented by increasing the speed of passing obstacles and bonus items.

A player's high score is stored and retrieved via `localStorage`.

## Usage

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run the application.
* `http://localhost:8080/webpack-dev-server/test.html` to run the test suite in the browser.

## Collaborators
* [Ryan Flach](https://www.github.com/ryanflach)
* [Angela Lindow](https://www.github.com/allindow)

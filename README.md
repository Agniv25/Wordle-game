# Wordle Game Clone

This repository contains a clone of the famous Wordle game implemented in JavaScript. The game utilizes two APIs to provide an interactive word-guessing experience. One API is used to generate a random meaningful word, and another API is used to check whether the word entered by the user is meaningful or not.

## How to Play

1. Clone or download the repository to your local machine (if you want to play the game then click [here](https://agniv25.github.io/wordle-game/).
2. Open the `index.html` file in a web browser.
3. The game will start by fetching a random meaningful word from the first API.
4. Guess the word by entering letters one at a time in the input field provided.You can either type on the physical keyboard or use the virtual keyboard.
5. Once the word is entered and "ENTER" is pressed then the second API checks whether the word entered is meaningful or not. If not meaningful then that word is not accepted.
6. The game will provide feedback on the correctness of the letter guess by highlighting it accordingly.
7. Keep guessing letters until you either guess the word correctly or run out of attempts.

## APIs Used

1. Random Meaningful Word API: This API is responsible for generating a random meaningful word for the game. It provides a word that the player needs to guess. The API endpoint used for generating the word is: `[API_ENDPOINT_1]`.

2. Word Validation API: This API is used to validate the word entered by the player and check if it is meaningful or not. 

## Technologies Used

The clone of the Wordle game is built using the following technologies:

- HTML
- CSS
- JavaScript
- Fetch API for making HTTP requests to the APIs

## Contributions

Contributions to the repository are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

The Wordle Game Clone is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

Have fun playing the Wordle game!

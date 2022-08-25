window.addEventListener('DOMContentLoaded', () => {

    let tiles = document.querySelectorAll('.tictaktoe__tile');
    let announce = document.querySelector('.tictaktoe__announce');
    let queue = document.querySelector('.tictaktoe__queue');

    console.log(announce);

    let BOARD = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    let playerNow = 'X';
    let isGameContinue = true;

    const TIE = 'TIE';

    let winnCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const announcer = (playerNow) => {
        if (playerNow === 'TIE') {
            announce.innerHTML = "TIE";
        } else {
            announce.innerHTML = `Player ${playerNow} <em class="wins">wins</em>`;
        }
    }

    const logicPlay = function() {
        let isWin = false;
        for (let i = 0; i < winnCombinations.length; ++i) {
            let combinations = winnCombinations[i];
            let a = BOARD[combinations[0]];
            let b = BOARD[combinations[1]];
            let c = BOARD[combinations[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                isWin = true;
                break;
            }
        }

        if (isWin) {
            queue.innerText = 'finish';
            announcer( playerNow === 'X' ? 'X' : 'O' ); // call announcer with winner player
            isGameContinue = false;
            return true;
        }

        if (!BOARD.includes('')) {
            queue.innerText = 'finish';
            announcer(TIE);
            isGameContinue = false;
            return true;
        }
    }

    const isValidItem = (id) => {
        return !BOARD[id];
    }

    const changePlayer = () => {
        playerNow = (playerNow === 'X') ? 'O' : 'X';
        queue.innerHTML = `<p>Player ${playerNow} <em class="queue">is walking now</em></p>`;
    }

    const actionUser = (tile, id) => {
        if (isValidItem(id) && isGameContinue) {
            BOARD[id] = playerNow;
            tile.innerHTML = playerNow;
            tile.classList.add(`player${playerNow}`);
            if (!logicPlay()) {
                changePlayer();
            }
        }
    }

    tiles.forEach((item, id) => {
       item.addEventListener('click', () => {
           actionUser(item, id);
           console.log(BOARD);
       });
    });



});
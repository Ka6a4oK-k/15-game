const field = document.querySelector(".gameField");
const shuffleButton = document.querySelector(".shuffleBtn");
const counterElement = document.querySelector(".counter");
const cells = [];
const positions = [];
let counter = 0;
const empty = {
    position: {
        x: 3,
        y: 3,
    },
    number: 16,
}
for (i = 1; i <=16; i++){
    positions.push(i);
}
for (i = 0; i <= 14; i++){
    const cell = {
        position: {
            x: i % 4,
            y: Math.floor(i / 4),
        },
        number: i + 1,
        tile: tile = document.createElement('div')
    };
    cells.push(cell)
    render(cell)
    tile.className = 'tile';
    tile.innerHTML = cell.number;
    field.append(tile);
    tile.addEventListener('click', () => {
        if (((cell.position.x == empty.position.x) && (Math.abs(cell.position.y - empty.position.y) == 1) ||
            (cell.position.y == empty.position.y) && (Math.abs(cell.position.x - empty.position.x) == 1)) &&
            !isSolved()) {
                const buffer = {...cell.position, position: positions[cell.number - 1]};
                cell.position.x = empty.position.x;
                cell.position.y = empty.position.y;
                positions[cell.number - 1] = positions[15];
                positions[15] = buffer.position;
                empty.position.x = buffer.x;
                empty.position.y = buffer.y;
                counter ++;
                counterElement.textContent = counter;
                render(cell);
            }
    });
}
cells.push(empty)
counterElement.textContent = counter;
function shuffle() {
    counter = 0;
    counterElement.textContent = counter;
    positions.sort(() => Math.random() - 0.5);
    for(i = 0; i <= 15; i++){
        cells[i].position.x = (positions[i] - 1) % 4;
        cells[i].position.y = Math.floor((positions[i] - 1) / 4);
        if(cells[i] != empty){
            render(cells[i])
        }
    }
    if(!isSolvable()){
        shuffle();
    }
}
function render(obj) {
    obj.tile.style.left = `${Math.floor(obj.position.x) * 15}vh`;
    obj.tile.style.top = `${Math.floor(obj.position.y) * 15}vh`;
}
function isSolvable(){
    let count = 0;
    for(i = 1; i <= 15; i++){
        for(j = i+1; j<= 16; j++){
            if(positions.indexOf(i) == 15){
                break;
            }
            if(positions.indexOf(i) > positions.indexOf(j)){
                count++;
            }
        }
    }
    count = count + empty.position.y + 1;
    return Boolean((count + 1) % 2)
}
function isSolved(){
    return positions.every((num, index) => (index + 1) == num)
}
shuffleButton.addEventListener('click', () => {
    shuffle(cells)
})
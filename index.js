/* YOUR CODE HERE! */
let boxContainer = document.getElementsByClassName('box-container')[0];
let boxes = document.getElementsByClassName('box');

function chooseRandomColor() {
    let maxColor = 0xFFFFFF;
    let randColor = Math.random() * maxColor;
    randColor = Math.floor(randColor);
    return '#' + randColor.toString(16);
}


function addEventListenerToBox(box) {
    let startX = 0;
    let startY = 0;

    function mouseMove(ev) {
        let deltaX = ev.clientX - startX;
        let deltaY = ev.clientY -  startY;
        startX = ev.clientX;
        startY = ev.clientY;
    
        box.style.top = (box.offsetTop + deltaY) + 'px';
        box.style.left = (box.offsetLeft + deltaX) + 'px';

    }

    box.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        if (ev.which !== 1) {
            return;
        }
        if (ev.shiftKey === true) {
            box.classList.toggle('box-large');
        }
        startX = ev.clientX;
        startY = ev.clientY;

        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', (ev) => {
            document.removeEventListener('mousemove', mouseMove);
        });

    });

    box.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
        box.style.backgroundColor = chooseRandomColor();
    });

    box.addEventListener('dblclick', (ev) => {
        if (ev.which !== 1) {
            return;
        }

        let old_id = parseInt(boxContainer.lastElementChild.textContent);

        if (ev.altKey === true) {
            if (old_id === 1) {
                return;
            }
            box.remove();
            return;
        }

        let new_box = document.createElement('div');
        new_box.classList.add('box');
        new_box.style.top = (box.offsetTop + box.clientHeight) + 'px';
        new_box.style.left = (box.offsetLeft + box.clientWidth) + 'px';

        new_box.textContent = `${old_id + 1}`;

        boxContainer.appendChild(new_box);
        addEventListenerToBox(new_box);
    })
}

let box1 = boxes[0];
addEventListenerToBox(box1);

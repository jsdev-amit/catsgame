import {
    $on,
    $delegate
} from "./helpers";

export class initCatGame {
    constructor() {
        this.domCache = {
            inputContainer: document.getElementById("catGrid"),
            outputContainer: document.getElementById("catGridResult"),
            gridTemplate: document.getElementById("gridTemplate"),
            resetGame: document.getElementById("resetGame"),
            imageGrid: document.querySelectorAll("#catGridResult .grid__img")
        };
        this.bindEvents();
        this.setInitialState();
    }

    setInitialState() {
        this.domCache.outputContainer.innerHTML = this.domCache.gridTemplate.innerHTML;
        this.state = {
            outputGrid: [
                [],
                [],
                [],
                []
            ],
            counter: -1
        };
    }

    bindEvents() {
        let self = this;
        $delegate(this.domCache.inputContainer, ".grid__item", "click", function(
            e
        ) {
            if (self.state.counter < 11) {
                self.state.counter++;
                self.updateOutputGrid(e.target.dataset, this.querySelector("img").src);
            }
        });

        $on(this.domCache.resetGame, "click", () => {
            this.setInitialState();
        });
    }

    updateOutputGrid(cat = {}, imgPath) {
        const {
            id
        } = cat;
        let row = parseInt(this.state.counter / 3);
        let col = this.state.counter % 3;
        this.state.outputGrid[row][col] = id;
        this.updateOutputView(imgPath);
    }

    updateOutputView(imgPath) {
        let template = '<img src="{{imgUrl}}" alt="cat" title="cat"/>';
        template = template.replace("{{imgUrl}}", imgPath);
        document.querySelectorAll("#catGridResult .grid__img")[
            this.state.counter
        ].innerHTML = template;
        if (this.state.counter == 11) {
            setTimeout(() => {
                this.chechDuplicate() ? alert("“YOU LOSE") : alert("“YOU WIN”");
            }, 10);
        }
    }

    chechDuplicate() {
        let isDuplicate = false;
        this.state.outputGrid.some(row => {
            if (isDuplicate == true) {
                return true;
            }
            let tempMap = {};
            row.some(val => {
                if (!tempMap[val]) {
                    tempMap[val] = 1;
                } else {
                    isDuplicate = true;
                }
            });
        });
        return isDuplicate;
    }
}

new initCatGame();
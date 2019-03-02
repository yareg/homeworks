class Warior {
    constructor(name, attackType, hp) {
        this.name = name;
        this.attackType = attackType;
        this.hp = hp;
    }

    attack(enemy, attackMethod, damage) {
        console.log(`${enemy.name} was attacked with ${attackMethod}`);
        const hp = enemy.hp;
        enemy.hp -= damage;
        console.log(`Had ${hp} HP before, now ${enemy.hp} \n`);
    }
}

class Monster extends Warior {
    constructor(name, hp) {
        super(name, 'clutches', hp);
    }

    attack(enemy) {
        const damage = Math.floor(Math.random() * 10) + 1;
        super.attack(enemy, this.attackType, damage);
    }
}

class Gladiator extends Warior {
    constructor(name, hp) {
        super(name, 'stabbing weapon', hp);
    }

    attack(enemy) {
        const damage = Math.floor(Math.random() * 10) + 12;
        super.attack(enemy, this.attackType, damage);
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    start() {
        while (this.player1.hp > 0 && this.player2.hp > 0) {
            this.player1.attack(this.player2);
            this.player2.attack(this.player1);
        }
        this.setWinner();
    }

    setWinner() {
        if (this.player1.hp > 0) {
            this.winner = this.player1.name;
        }
        else if (this.player2.hp > 0) {
            this.winner = this.player2.name;
        }
        else {
            this.winner = 'Both of them are dead';
        }
    }
}

const gladiator = new Gladiator('Arnold', 100);
const monster = new Monster('Archie', 300);
const game = new Game(gladiator, monster);

game.start();
console.log(game.winner);
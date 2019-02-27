class Knight {
    constructor() {
        this.attack = 8;
        this.armor = 3;
        this.health = 15;
        this.fields = 1;
        this.speed = 1;
    }
}
class Elf {
    constructor() {
        this.attack = 5;
        this.armor = 1;
        this.health = 10;
        this.fields = 3;
        this.speed = 3;
    }
}
class Dwarf {
    constructor() {
        this.attack = 6;
        this.armor = 2;
        this.health = 12;
        this.fields = 2;
        this.speed = 2;
    }
}
class Box {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
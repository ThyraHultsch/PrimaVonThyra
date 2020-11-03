"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    class Brick extends L05_BreakOut_Bricks.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        hit() {
            this.getParent().removeChild();
        }
    }
    L05_BreakOut_Bricks.Brick = Brick;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
// isPressedOne([f.KEYBOARD_CODE:ARROW_LEFT])
// Schläger machen
//referezen für die achens durchlöesen
// und fudge control
//# sourceMappingURL=Bricks.js.map
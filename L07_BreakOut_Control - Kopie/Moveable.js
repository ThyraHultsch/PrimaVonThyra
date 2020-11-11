"use strict";
var L07_BreakOut_Control;
(function (L07_BreakOut_Control) {
    var fc = FudgeCore;
    let Moveable = /** @class */ (() => {
        class Moveable extends L07_BreakOut_Control.GameObject {
            constructor(_name, _position, _size) {
                super(_name, _position, _size);
                this.speed = 15;
                this.velocity = fc.Vector3.ZERO();
                this.velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
                this.velocity.normalize(this.speed);
            }
            /**
             * move moves the game object and the collision detection reactangle
             */
            move() {
                let frameTime = fc.Loop.timeFrameGame / 1000;
                let distance = fc.Vector3.SCALE(this.velocity, frameTime);
                this.translate(distance);
            }
            translate(_distance) {
                this.mtxLocal.translate(_distance);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            }
            /**
             * collides returns if the moveable itself collides with the _target and if so
             * reflects the movement
             */
            checkCollision(_target) {
                let intersection = this.rect.getIntersection(_target.rect);
                if (intersection == null)
                    return false;
                if (intersection.size.x > intersection.size.y)
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
                else
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_X);
                return true;
            }
        }
        Moveable.REFLECT_VECTOR_X = fc.Vector3.X();
        Moveable.REFLECT_VECTOR_Y = fc.Vector3.Y();
        return Moveable;
    })();
    L07_BreakOut_Control.Moveable = Moveable;
})(L07_BreakOut_Control || (L07_BreakOut_Control = {}));
//# sourceMappingURL=Moveable.js.map
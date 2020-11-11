"use strict";
var L07_BreakOut_Control;
(function (L07_BreakOut_Control) {
    var fc = FudgeCore;
    let PowerUp = /** @class */ (() => {
        class PowerUp extends L07_BreakOut_Control.Moveable {
            constructor(_name, _position, _size) {
                super(_name, _position, _size);
                this.velocity = fc.Vector3.Y(-10);
                this.getComponent(fc.ComponentMesh).mesh = PowerUp.meshSphere;
            }
        }
        PowerUp.meshSphere = new fc.MeshSphere("Sphere", 5, 10);
        return PowerUp;
    })();
    L07_BreakOut_Control.PowerUp = PowerUp;
})(L07_BreakOut_Control || (L07_BreakOut_Control = {}));
//# sourceMappingURL=PowerUp.js.map
"use strict";
var L09_Doom_Übung;
(function (L09_Doom_Übung) {
    var fc = FudgeCore;
    class Wall extends GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L09_Doom_Übung.Wall = Wall;
})(L09_Doom_Übung || (L09_Doom_Übung = {}));
//# sourceMappingURL=Wall.js.map
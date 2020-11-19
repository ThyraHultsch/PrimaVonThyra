"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends fc.Node {
            constructor(_name, _size, _position, _rotation) {
                super(_name);
                this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
                this.mtxLocal.rotation = _rotation;
                let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(1));
            }
        }
        GameObject.meshQuad = new fc.MeshQuad();
        return GameObject;
    })();
    L08_Doom_Design.GameObject = GameObject;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=GameObjects.js.map
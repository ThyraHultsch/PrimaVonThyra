"use strict";
var L01FirstFudge;
(function (L01FirstFudge) {
    console.log("Hallo");
    var fc = FudgeCore;
    window.addEventListener("load", handleLoad);
    console.log(fc);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        let node = new fc.Node("Quad");
        let mesh = new fc.MeshQuad();
        let cmpMesh = new fc.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("RED")));
        let cmpMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        L01FirstFudge.viewport = new fc.Viewport();
        L01FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        fc.Debug.log(L01FirstFudge.viewport);
        L01FirstFudge.viewport.draw();
    }
})(L01FirstFudge || (L01FirstFudge = {}));
//# sourceMappingURL=Main.js.map
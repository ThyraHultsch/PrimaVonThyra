"use strict";
var pongÜbung;
(function (pongÜbung) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let ballMove = new fc.Vector3(0.1, -0.1, 0);
    let root;
    /* let right: boolean = true;
    let left: boolean; */
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        let breakout = createBreakout();
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        viewport = new fc.Viewport();
        viewport.initialize("Viewport", breakout, cmpCamera, canvas);
        fc.Debug.log(viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }
    function createBreakout() {
        root = new fc.Node("Root");
        root.addComponent(new fc.ComponentTransform());
        let quad = new fc.Node("Quad");
        let meshquad = new fc.MeshQuad();
        let cmpquad = new fc.ComponentMesh(meshquad);
        quad.addComponent(cmpquad);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("PINK")));
        let cmpMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        quad.addComponent(cmpMaterial);
        root.addChild(quad);
        return root;
    }
    function hndLoop(_event) {
        root.cmpTransform.local.translate(ballMove);
        if (root.mtxLocal.translation.x > 40 || root.mtxLocal.translation.x < -46) {
            ballMove.scale(-1);
        }
        else if (root.mtxLocal.translation.y < 34 || root.mtxLocal.translation.y < -34) {
            ballMove.scale(-1);
        }
        //root.mtxLocal.translate(ballMove);
        //console.log("funktioniert der bums hier?");
        viewport.draw();
    }
})(pongÜbung || (pongÜbung = {}));
//# sourceMappingURL=Main.js.map
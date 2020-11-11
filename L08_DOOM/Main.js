"use strict";
var Doom1;
(function (Doom1) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let wall;
    let floor;
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new fc.Node("Root");
        floor = new fc.Node("Floor");
        root.addChild(floor);
        let floor_quad = new fc.MeshQuad();
        let floor_mesh = new fc.ComponentMesh(floor_quad);
        floor.addComponent(floor_mesh);
        let floor_material = new fc.Material('RED');
        wall = new fc.Node("Wall");
        floor.addChild(wall);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(400);
        cmpCamera.pivot.rotateY(180);
        Doom1.viewport = new fc.Viewport();
        Doom1.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        Doom1.viewport.draw();
        console.log("läuf der bums?");
    }
})(Doom1 || (Doom1 = {}));
//# sourceMappingURL=Main.js.map
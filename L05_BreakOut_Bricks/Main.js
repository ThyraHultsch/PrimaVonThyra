"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // f.Debug.log(canvas);
        root = new f.Node("Root");
        ball = new L05_BreakOut_Bricks.Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
        root.addChild(ball);
        walls = new f.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallBottom", new f.Vector2(0, -12), new f.Vector2(40, 1)));
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L05_BreakOut_Bricks.viewport = new f.Viewport();
        L05_BreakOut_Bricks.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // f.Debug.log(viewport);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        // console.log("Tick");
        ball.move();
        L05_BreakOut_Bricks.viewport.draw();
        hndCollision();
    }
    function hndCollision() {
        for (let wall of walls.getChildren())
            ball.checkCollision(wall);
    }
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Main.js.map
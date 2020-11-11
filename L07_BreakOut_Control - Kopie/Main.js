"use strict";
var L07_BreakOut_Control;
(function (L07_BreakOut_Control) {
    var fc = FudgeCore;
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAY"] = 0] = "PLAY";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 1] = "GAMEOVER";
    })(GAMESTATE || (GAMESTATE = {}));
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let paddle;
    let bricks;
    let wallBottom;
    let gameState = GAMESTATE.PLAY;
    let score = 0;
    let powerUp;
    let root;
    let control = new fc.Control("PaddleControl", 20, 0 /* PROPORTIONAL */);
    control.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new fc.Node("Root");
        ball = new L07_BreakOut_Control.Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        root.addChild(ball);
        paddle = new L07_BreakOut_Control.Moveable("Paddle", new fc.Vector2(0, -10), new fc.Vector2(5, 1));
        root.addChild(paddle);
        walls = new fc.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L07_BreakOut_Control.GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Control.GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Control.GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(40, 1)));
        wallBottom = new L07_BreakOut_Control.GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(40, 1));
        wallBottom.removeComponent(wallBottom.getComponent(fc.ComponentMaterial));
        walls.appendChild(wallBottom);
        bricks = createBricks(24);
        root.addChild(bricks);
        powerUp = new L07_BreakOut_Control.PowerUp("PowerUp", fc.Vector2.Y(10), fc.Vector2.ONE());
        root.addChild(powerUp);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L07_BreakOut_Control.viewport = new fc.Viewport();
        L07_BreakOut_Control.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function createBricks(_amount) {
        let bricks = new fc.Node("Bricks");
        let x = -15;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }
            bricks.addChild(new L07_BreakOut_Control.GameObject(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1)));
            x += 4;
        }
        return bricks;
    }
    function hndLoop(_event) {
        if (gameState == GAMESTATE.GAMEOVER) {
            return;
        }
        ball.move();
        L07_BreakOut_Control.viewport.draw();
        control.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        let posPaddle = paddle.mtxLocal.translation;
        let mutator = paddle.mtxLocal.getMutator();
        paddle.velocity = fc.Vector3.X(control.getOutput());
        paddle.move();
        if (paddle.checkCollision(walls.getChildrenByName("WallLeft")[0]) ||
            paddle.checkCollision(walls.getChildrenByName("WallRight")[0]))
            paddle.mtxLocal.mutate(mutator); //paddle.mtxLocal.translation = posPaddle;
        powerUp.move();
        hndCollision();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            if (ball.checkCollision(wall))
                if (wall == wallBottom)
                    gameState = GAMESTATE.GAMEOVER;
            displayScore(true);
        }
        for (let brick of bricks.getChildren()) {
            if (ball.checkCollision(brick)) {
                bricks.removeChild(brick);
                score++;
                displayScore();
            }
        }
        ball.checkCollision(paddle);
        if (paddle.checkCollision(powerUp)) {
            root.removeChild(powerUp);
            //paddle.setSize
            console.log("POWER UP !!!!");
        }
    }
    function displayScore(_gameOver = false) {
        let output = document.querySelector("h2#Score");
        output.textContent = "Score:" + score;
        if (_gameOver)
            output.innerHTML += "<br>Gameover";
    }
})(L07_BreakOut_Control || (L07_BreakOut_Control = {}));
//# sourceMappingURL=Main.js.map
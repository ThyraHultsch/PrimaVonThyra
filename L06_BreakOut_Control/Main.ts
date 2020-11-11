namespace L06_BreakOut_Control {
    import fc = FudgeCore;

    enum GAMESTATE {
        PLAY, GAMEOVER
    }

    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball: Moveable;
    let walls: fc.Node;
    let paddle: Moveable;
    let bricks: fc.Node;
    let wallBottom: GameObject;
    let gameState: GAMESTATE = GAMESTATE.PLAY;
    let score: number = 0;


    export let viewport: fc.Viewport;
    let root: fc.Node;

    let control: fc.Control = new fc.Control("PaddleControl", 20, fc.CONTROL_TYPE.PROPORTIONAL);
    control.setDelay(100);





    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);

        root = new fc.Node("Root");

        ball = new Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        root.addChild(ball);

        paddle = new Moveable("Paddle", new fc.Vector2(0, -10), new fc.Vector2(5, 1));
        root.addChild(paddle);

        walls = new fc.Node("Walls");
        root.addChild(walls);

        walls.addChild(new GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 30)));
        walls.addChild(new GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 30)));
        walls.addChild(new GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(40, 1)));
        wallBottom = new GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(40, 1));

        wallBottom.removeComponent(wallBottom.getComponent(fc.ComponentMaterial));
        walls.appendChild(wallBottom);

        bricks = createBricks(24);
        root.addChild(bricks);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }





    function createBricks(_amount: number): fc.Node {
        let bricks: fc.Node = new fc.Node("Bricks");
        let x: number = -15;
        let y: number = 10;

        for (let i: number = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }

            bricks.addChild(new GameObject(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1)));
            x += 4;
        }

        return bricks;
    }






    function hndLoop(_event: Event): void {


        if (gameState == GAMESTATE.GAMEOVER) {
            return;
        }
        ball.move();
        viewport.draw();

        control.setInput(
            fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
        );

        let posPaddle: fc.Vector3 = paddle.mtxLocal.translation;
        let mutator: fc.Mutator = paddle.mtxLocal.getMutator();

        paddle.velocity = fc.Vector3.X(control.getOutput());
        paddle.move();
        if (
            paddle.checkCollision(<GameObject>walls.getChildrenByName("WallLeft")[0]) ||
            paddle.checkCollision(<GameObject>walls.getChildrenByName("WallRight")[0])
        ) paddle.mtxLocal.mutate(mutator); //paddle.mtxLocal.translation = posPaddle;

        hndCollision();
    }






    function hndCollision(): void {
        for (let wall of walls.getChildren()) {

            if (ball.checkCollision(<GameObject>wall))
                if (wall == wallBottom)
                    gameState = GAMESTATE.GAMEOVER;
                    
        }


        for (let brick of bricks.getChildren() as GameObject[]) {
            if (ball.checkCollision(brick)){
                bricks.removeChild(brick);
                score++;
                displayScore();
            }
                
        }

        ball.checkCollision(paddle);
    }

    function displayScore(_gameOver: boolean = false): void {
        let output: HTMLHeadingElement = document.querySelector("h2#Score");
        output.textContent = "Score:" + score;

        if (_gameOver)
            output.innerHTML += "<br>Gameover";
    }
}
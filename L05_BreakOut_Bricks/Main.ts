namespace L05_BreakOut_Bricks {
  import f = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: f.Node;

  export let viewport: f.Viewport;
  let root: f.Node;

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // f.Debug.log(canvas);

    root = new f.Node("Root");

    ball = new Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
    root.addChild(ball);

    walls = new f.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
    walls.addChild(new GameObject("WallBottom", new f.Vector2(0, -12), new f.Vector2(40, 1)));


    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // f.Debug.log(viewport);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {
    // console.log("Tick");
    ball.move();
    viewport.draw();

    hndCollision();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren()) 
      ball.checkCollision(<GameObject>wall);
  }
}
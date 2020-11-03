namespace pongÜbung {

    import fc = FudgeCore;
    window.addEventListener("load", hndLoad);

    let viewport: fc.Viewport;
  
    let ballMove: fc.Vector3 = new fc.Vector3(0.1, -0.1, 0);
    let root: fc.Node;

    /* let right: boolean = true;
    let left: boolean; */

    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);

        let breakout: fc.Node = createBreakout();
        

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", breakout, cmpCamera, canvas);
        fc.Debug.log(viewport);

       

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30 );

    }

    
    function createBreakout(): fc.Node {

        root = new fc.Node("Root");
        root.addComponent(new fc.ComponentTransform());

        let quad: fc.Node = new fc.Node("Quad");

        let meshquad: fc.MeshQuad = new fc.MeshQuad();
        let cmpquad: fc.ComponentMesh = new fc.ComponentMesh(meshquad);
        quad.addComponent(cmpquad);
        
        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("PINK")));
        let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        quad.addComponent(cmpMaterial);

        root.addChild(quad);

        return root;

    }

    function hndLoop (_event: Event): void {


        root.cmpTransform.local.translate(ballMove);
        
        if (root.mtxLocal.translation.x > 40 || root.mtxLocal.translation.x < -46) {
            ballMove.scale(-1);
        } else if (root.mtxLocal.translation.y < 34 || root.mtxLocal.translation.y < -34) {
            ballMove.scale(-1);
        }

        //root.mtxLocal.translate(ballMove);


        //console.log("funktioniert der bums hier?");
        viewport.draw();
    }
}
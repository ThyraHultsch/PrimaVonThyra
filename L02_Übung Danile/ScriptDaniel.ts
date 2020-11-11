namespace Breakout_Move {

    import fc = FudgeCore;

    window.addEventListener("load", hndLoad);
    //window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;
    let root: fc.Node;
    let ball: fc.Node;
    let velocity: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed: number = 3;
    velocity.normalize(speed);

    
    function hndLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);

        root = new fc.Node("Root");
       

        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());

        let meshQuad: fc.MeshQuad = new fc.MeshQuad();
        let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);

        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);

        root.addChild(ball);



        let cmdCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmdCamera.pivot.translateZ(40);
        cmdCamera.pivot.rotateY(180);
        


        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmdCamera, canvas);
        //fc.Debug.log(viewport);

        
        
        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30 );
      
       
    }

    function hndLoop(_event: Event): void {

        //console.log("TICK");
        let frameTime: number = fc.Time.game.getElapsedSincePreviousCall() / 1000 ;
        let copyVelocity: fc.Vector3 = velocity.copy;
        copyVelocity.scale(frameTime);
        ball.mtxLocal.translate(copyVelocity);
        viewport.draw();
        
    }

   /* Ball nehmen und übern Bildschirm fliegen lassen, Raumbegrenzung machen -> abprallen lassen
   geschwindigkeitsvektor definieren  */

   //fc.Vector3


   /* Randbegrenzung, REctangle klasse, BSP angucken, Pong Code angucken, 2. Vektor ist Lot -> Reflect, Gedanken
   um den WInkel nach Kollision machen, Geometrie betrachten, Zeichnung, Skizzen, Coden, Graphen aufräumen, Knoten für Border machen und 
   darin wären 4 Knoten für rechts oben unten usw 
   Nicht alles in den Root knoten werfen, Dom strukturen nutzen, nicht doppeln 
   TIPP: Schnittmenge vom Rechteck, ist Rechteck breiter als hoch? */

}
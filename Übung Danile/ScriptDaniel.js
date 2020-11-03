"use strict";
var Breakout_Move;
(function (Breakout_Move) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let root;
    let ball;
    let velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed = 3;
    velocity.normalize(speed);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        root = new fc.Node("Root");
        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());
        let meshQuad = new fc.MeshQuad();
        let cmpQuad = new fc.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.addChild(ball);
        let cmdCamera = new fc.ComponentCamera();
        cmdCamera.pivot.translateZ(40);
        cmdCamera.pivot.rotateY(180);
        Breakout_Move.viewport = new fc.Viewport();
        Breakout_Move.viewport.initialize("Viewport", root, cmdCamera, canvas);
        //fc.Debug.log(viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        //console.log("TICK");
        let frameTime = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let copyVelocity = velocity.copy;
        copyVelocity.scale(frameTime);
        ball.mtxLocal.translate(copyVelocity);
        Breakout_Move.viewport.draw();
    }
    /* Ball nehmen und übern Bildschirm fliegen lassen, Raumbegrenzung machen -> abprallen lassen
    geschwindigkeitsvektor definieren  */
    //fc.Vector3
    /* Randbegrenzung, REctangle klasse, BSP angucken, Pong Code angucken, 2. Vektor ist Lot -> Reflect, Gedanken
    um den WInkel nach Kollision machen, Geometrie betrachten, Zeichnung, Skizzen, Coden, Graphen aufräumen, Knoten für Border machen und
    darin wären 4 Knoten für rechts oben unten usw
    Nicht alles in den Root knoten werfen, Dom strukturen nutzen, nicht doppeln
    TIPP: Schnittmenge vom Rechteck, ist Rechteck breiter als hoch? */
})(Breakout_Move || (Breakout_Move = {}));
//# sourceMappingURL=ScriptDaniel.js.map
"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new fc.Node("Root");
    let avatar = new fc.Node("Avatar");
    let avatarVelocity;
    let cntKeyHorizontal = new fc.Control("Keyboard", 1, 0 /* PROPORTIONAL */, true);
    let cntKeyVertical = new fc.Control("Keyboard", 4, 0 /* PROPORTIONAL */, true);
    let control = new fc.Control("AvatarControl", 1, 0 /* PROPORTIONAL */);
    control.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        createLevel();
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
        // cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        avatar.addComponent(cmpCamera);
        avatar.addComponent(new fc.ComponentTransform());
        avatar.mtxLocal.translate(fc.Vector3.Z(15));
        avatar.mtxLocal.rotate(fc.Vector3.Y(180));
        root.appendChild(avatar);
        L08_Doom_Design.viewport = new fc.Viewport();
        L08_Doom_Design.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        hndAvatar();
        L08_Doom_Design.viewport.draw();
    }
    function createLevel() {
        let meshQuad = new fc.MeshQuad("Quad");
        let txtFloor = new fc.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(20));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));
        root.appendChild(floor);
        let txtWall = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
        // let wall: ƒaid.Node = new ƒaid.Node("Wall", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), mtrWall, meshQuad);
        // wall.mtxLocal.scale(ƒ.Vector3.ONE(2));
        // wall.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(1));
        /* let wall: Wall = new Wall(fc.Vector2.ONE(2), fc.Vector3.Y(1), fc.Vector3.ZERO(), mtrWall);
        root.appendChild(wall); */
        //Außenwand hinten
        let pos = new fc.Vector3(-9, 1, -10);
        for (let i = 0; i < 10; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
            root.appendChild(wall);
            pos.x += 2;
        }
        //Außenwand links 
        pos = new fc.Vector3(-10, 1, -9);
        for (let i = 0; i < 10; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.Y(90), mtrWall);
            root.appendChild(wall);
            pos.z += 2;
        }
        //Vorne Rechts 2. Wand innen
        pos = new fc.Vector3(3, 1, 4);
        for (let i = 0; i < 3; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
            root.appendChild(wall);
            pos.x += 2;
        }
        //Vorne Rechts 1. Wand innen
        pos = new fc.Vector3(2, 1, 5);
        for (let i = 0; i < 2; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.Y(90), mtrWall);
            root.appendChild(wall);
            pos.z += 2;
        }
        //Außenwand rechts  
        pos = new fc.Vector3(10, 1, -9);
        for (let i = 0; i < 10; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.Y(-90), mtrWall);
            root.appendChild(wall);
            pos.z += 2;
        }
        //Vorne Rechts 
        pos = new fc.Vector3(6, 1, 10);
        for (let i = 0; i < 3; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
            root.appendChild(wall);
            pos.x += 2;
        }
        //Außenwand vorne 
        pos = new fc.Vector3(-9, 1, 10);
        for (let i = 0; i < 6; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
            root.appendChild(wall);
            pos.x += 2;
        }
        //wand vorne 
        pos = new fc.Vector3(-7, 1, 8);
        for (let i = 0; i < 5; i++) {
            let wall = new L08_Doom_Design.Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
            root.appendChild(wall);
            pos.x += 2;
        }
        //let wall: Wall = new Wall(fc.Vector2.ONE(2), pos, fc.Vector3.ZERO(), mtrWall);
        //root.appendChild(wall);
    }
    function hndKeyboardControls() {
        cntKeyVertical.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN]));
        cntKeyHorizontal.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        avatarVelocity = fc.Vector3.Z(-cntKeyVertical.getOutput());
        let frameTime = fc.Loop.timeFrameGame / 500;
        let distance = fc.Vector3.SCALE(avatarVelocity, frameTime);
        translate(distance);
        rotate(cntKeyHorizontal.getOutput());
    }
    //Steuerung 
    function translate(_distance) {
        avatar.mtxLocal.translate(_distance);
    }
    function rotate(_degree) {
        avatar.mtxLocal.rotateY(_degree);
    }
    function hndAvatar() {
        hndKeyboardControls();
        //hndCollision();
    }
    /* function hndCollision(): void {
  
    } */
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Main.js.map
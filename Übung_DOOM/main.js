"use strict";
var L09_Doom_Übung;
(function (L09_Doom_Übung) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let cntKeyHorizontal = new fc.Control("Keyboard", 1, 0 /* PROPORTIONAL */, true);
    let cntKeyVertical = new fc.Control("Keyboard", 4, 0 /* PROPORTIONAL */, true);
    let cmpCamera;
    let playGroundSize = 20;
    let unit = 2;
    let avatarVelocity;
    let root;
    let avatar;
    let walls;
    let meshQuad = new fc.MeshQuad("Quad");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new fc.Node("Root");
        avatar = new fc.Node("Avatar");
        walls = new fc.Node("walls");
        avatar.addComponent(new fc.ComponentTransform());
        root.addChild(avatar);
        root.addChild(walls);
        root.appendChild(createFcaidNode("Floor", "../DoomAssets/DEM1_5.png", fc.Matrix4x4.ROTATION_X(-90), playGroundSize, playGroundSize / unit));
        createArena();
        cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateY(1.5);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        avatar.addComponent(cmpCamera);
        L09_Doom_Übung.viewport = new fc.Viewport();
        L09_Doom_Übung.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        hndAvatar();
        L09_Doom_Übung.viewport.draw();
    }
    // Controls 
    function hndKeyboardControls() {
        cntKeyVertical.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])
            + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN]));
        cntKeyHorizontal.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        avatarVelocity = fc.Vector3.Z(-cntKeyVertical.getOutput());
        let frameTime = fc.Loop.timeFrameGame / 1000;
        let distance = fc.Vector3.SCALE(avatarVelocity, frameTime);
        translate(distance);
        rotate(cntKeyHorizontal.getOutput());
    }
    //ws
    function translate(_distance) {
        avatar.mtxLocal.translate(_distance);
    }
    // drehen
    function rotate(_degree) {
        avatar.mtxLocal.rotateY(_degree);
    }
    // Objekte aufstellen für vermeideung doppeltem Code
    function createFcaidNode(_name, _texture, _transforme, _size, _number) {
        let txtNode = new fc.TextureImage(_texture);
        let mtrNode = new fc.Material("mtr" + _name, fc.ShaderTexture, new fc.CoatTextured(null, txtNode));
        let node = new fcaid.Node(_name, _transforme, mtrNode, meshQuad);
        node.mtxLocal.scale(fc.Vector3.ONE(_size));
        node.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(_number));
        return node;
    }
    //Außenbereich
    function createArena() {
        let hight = unit / 2;
        let pos = new fc.Vector3(-11, hight, -10);
        let mrt;
        for (let i = 0; i < playGroundSize / unit; i++) {
            pos.x += unit;
            mrt = fc.Matrix4x4.TRANSLATION(pos);
            walls.appendChild(createFcaidNode(`NWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
        }
        pos.x += unit / 2;
        pos.z += unit / 2;
        for (let i = 0; i < playGroundSize / unit; i++) {
            mrt = fc.Matrix4x4.TRANSLATION(pos);
            mrt.multiply(fc.Matrix4x4.ROTATION_Y(-90));
            walls.appendChild(createFcaidNode(`EWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
            pos.z += unit;
        }
        pos.x -= unit / 2;
        pos.z -= unit / 2;
        for (let i = 0; i < playGroundSize / unit; i++) {
            mrt = fc.Matrix4x4.TRANSLATION(pos);
            mrt.multiply(fc.Matrix4x4.ROTATION_Y(180));
            walls.appendChild(createFcaidNode(`SWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
            pos.x -= unit;
        }
        pos.x += unit / 2;
        pos.z -= unit / 2;
        for (let i = 0; i < playGroundSize / unit; i++) {
            mrt = fc.Matrix4x4.TRANSLATION(pos);
            mrt.multiply(fc.Matrix4x4.ROTATION_Y(90));
            walls.appendChild(createFcaidNode(`WWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
            pos.z -= unit;
        }
        let txtWall = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
        let wall = new L09_Doom_Übung.Wall(fc.Vector2.ONE(2), fc.Vector3.Y(1), fc.Vector3.ZERO(), mtrWall);
        root.appendChild(wall);
    }
    function hndAvatar() {
        let tempPos = avatar.mtxLocal.translation;
        hndKeyboardControls();
        for (let wall of walls.getChildren()) {
            if (checkCollision(wall)) {
                tempPos.x += wall.mtxLocal.getZ().x * 0.001;
                tempPos.z += wall.mtxLocal.getZ().z * 0.001;
                avatar.mtxLocal.translation = tempPos;
            }
        }
    }
    //collision an einer Ebene Der Wand und nicht die Wand selber 
    function checkCollision(_target) {
        // fc.Debug.log(_target.mtxWorld.translation);
        // fc.Debug.log(_target.mtxLocal.getZ());
        // fc.Debug.log(avatar.mtxWorld.translation);
        let distance = (avatar.mtxWorld.translation.x - _target.mtxWorld.translation.x) * _target.mtxLocal.getZ().x + (avatar.mtxWorld.translation.y - _target.mtxWorld.translation.y) * _target.mtxLocal.getZ().y + (avatar.mtxWorld.translation.z - _target.mtxWorld.translation.z) * _target.mtxLocal.getZ().z;
        //fc.Debug.log(distance);
        if (distance < unit + 0.3) {
            return true;
        }
        return false;
    }
})(L09_Doom_Übung || (L09_Doom_Übung = {}));
//# sourceMappingURL=main.js.map
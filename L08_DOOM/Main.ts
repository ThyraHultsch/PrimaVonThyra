namespace L08_Doom_Design {
    import fc = FudgeCore;
    import fcaid = FudgeAid;
  
    window.addEventListener("load", hndLoad);
  
    export let viewport: fc.Viewport;
    let root: fc.Node;
  
    function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      root = new fc.Node("Root");
  
      let meshQuad: fc.MeshQuad = new fc.MeshQuad("Quad");
      
      let txtFloor: fc.TextureImage = new fc.TextureImage("../DoomAssets/DEM1_5.png");
      let mtrFloor: fc.Material = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
      let floor: fcaid.Node = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
      floor.mtxLocal.scale(fc.Vector3.ONE(20));
      floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));
  
      root.appendChild(floor);
      
      let txtWall: fc.TextureImage = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
      let mtrWall: fc.Material = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
      let wall: fcaid.Node = new fcaid.Node("Wall", fc.Matrix4x4.TRANSLATION(fc.Vector3.Y(1)), mtrWall, meshQuad);
      wall.mtxLocal.scale(fc.Vector3.ONE(2));
      wall.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(1));
      
      root.appendChild(wall);
  
      let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
      cmpCamera.pivot.translate(fc.Vector3.ONE(7));
      cmpCamera.pivot.lookAt(fc.Vector3.ZERO());
      cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
  
      viewport = new fc.Viewport();
      viewport.initialize("Viewport", root, cmpCamera, canvas);
      viewport.draw();
    }
  }
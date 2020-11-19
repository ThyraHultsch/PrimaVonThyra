namespace L08_Doom_Design {
    import fc = FudgeCore;
  
    export class GameObject extends fc.Node {
      private static readonly meshQuad: fc.MeshQuad = new fc.MeshQuad();
     
  
      public constructor(_name: string, _size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3) {
        super(_name);
        this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
        this.mtxLocal.rotation = _rotation;
  
        let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(GameObject.meshQuad);
        this.addComponent(cmpQuad);
        cmpQuad.pivot.scale(_size.toVector3(1));
        
      }
    }
  }
  
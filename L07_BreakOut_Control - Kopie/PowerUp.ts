namespace L07_BreakOut_Control {
    import fc = FudgeCore;
  
    export class PowerUp extends Moveable {

        private static readonly meshSphere: fc.MeshSphere = new fc.MeshSphere("Sphere", 5, 10);
      
        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
            super(_name, _position, _size);
      
            this.velocity = fc.Vector3.Y(-10);

            this.getComponent(fc.ComponentMesh).mesh = PowerUp.meshSphere;
    }
  }
} 
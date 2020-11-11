namespace L05_BreakOut_Bricks {
  import f = FudgeCore;

  export class Brick extends GameObject {
    

    public rect: f.Rectangle;

    public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
      super(_name, _position, _size);

      
    }

    public hit(): void {
      this.getParent().removeChild();
    }
  }
}



// isPressedOne([f.KEYBOARD_CODE:ARROW_LEFT])

// Schläger machen
//referezen für die achens durchlöesen
// und fudge control
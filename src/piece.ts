import { Cell, Position } from "./board";
import { PlayerType } from "./player";
import lionImage from "./images/lion.png";
import elephantImage from "./images/elephant.png";
import giraffeImage from "./images/giraffe.png";
import chickenImage from "./images/chicken.png";

export class MoveResult {
  constructor(private killedPiece: Piece) {}

  getKilled() {
    return this.killedPiece;
  }
}

export interface Piece {
  ownerType: PlayerType;
  currentPosition: Position;
  move(from: Cell, to: Cell): MoveResult;
  render(): string;
}

abstract class DefaultPiece implements Piece {
  constructor(
    public readonly ownerType: PlayerType,
    public currentPosition: Position
  ) {}

  move(from: Cell, to: Cell): MoveResult {
    if (!this.canMove(to.position)) {
      throw new Error("Can not move!");
    }

    const moveResult = new MoveResult(
      to.getPiece() != null ? to.getPiece() : null
    );

    to.put(this);
    from.put(null);
    this.currentPosition = to.position;

    return moveResult;
  }

  abstract canMove(position: Position): boolean;
  abstract render();
}

export class Lion extends DefaultPiece {
  canMove(position: Position) {
    const canMove =
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col) ||
      (position.col === this.currentPosition.col + 1 &&
        position.row === this.currentPosition.row) ||
      (position.col === this.currentPosition.col - 1 &&
        position.row === this.currentPosition.row) ||
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col + 1) ||
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col - 1) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col + 1) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col - 1);
    return canMove;
  }

  render() {
    return `<img class="piece ${this.ownerType}" src="${lionImage}" width="90%" height="90%"/>`;
  }
}

export class Elephant extends DefaultPiece {
  canMove(position: Position) {
    const canMove =
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col + 1) ||
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col - 1) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col + 1) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col - 1);
    return canMove;
  }

  render() {
    return `<img class="piece ${this.ownerType}" src="${elephantImage}" width="90%" height="90%"/>`;
  }
}

export class Giraffe extends DefaultPiece {
  canMove(position: Position) {
    const canMove =
      (position.row === this.currentPosition.row + 1 &&
        position.col === this.currentPosition.col) ||
      (position.row === this.currentPosition.row - 1 &&
        position.col === this.currentPosition.col) ||
      (position.col === this.currentPosition.col + 1 &&
        position.row === this.currentPosition.row) ||
      (position.col === this.currentPosition.col - 1 &&
        position.row === this.currentPosition.row);
    return canMove;
  }

  render() {
    return `<img class="piece ${this.ownerType}" src="${giraffeImage}" width="90%" height="90%"/>`;
  }
}

export class Chicken extends DefaultPiece {
  canMove(position: Position) {
    return (
      this.currentPosition.row +
        (this.ownerType === PlayerType.UPPER ? +1 : -1) ===
      position.row
    );
  }

  render() {
    return `<img class="piece ${this.ownerType}" src="${chickenImage}" width="90%" height="90%"/>`;
  }
}

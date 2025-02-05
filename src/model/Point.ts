export class Point {
  constructor(
      public id: number,
      public name: string,
  ) {}

  static create(id: number): Point {
      return new Point(id, `Point ${id}`);
  }
}
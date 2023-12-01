export interface Shape {
  type: "collect" | "avoid" | "change";
  color: "green" | "red" | "mix";
  shape: "circle" | "square" | "rectangle";
  onClick(): void;
}

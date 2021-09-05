import { AbbrIndex } from "../abbr-index";

describe("AbbrIndex", () => {
  it("normal usage", () => {
    const index = new AbbrIndex([
      "margin",
      "border-radius",
      "margin-top",
      "margin-bottom",
    ]);
    expect(index.getItem(["b", "r"])).toEqual(["border-radius"]);
    expect(index.getItem(["m", "t"])).toEqual(["margin-top"]);
    expect(index.getItem(["m", "b"])).toEqual(["margin-bottom"]);
    expect(index.getItem(["m", "b", "w"])).toEqual([]);
    expect(index.getItem(["m"])).toEqual([]);
  });
});

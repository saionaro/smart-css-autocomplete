import { toAlphabetic, getColonData } from "../utils";

describe("utils", () => {
  describe("toAlphabetic", () => {
    it("1 === a", () => {
      expect(toAlphabetic(1)).toEqual("a");
    });

    it("2 === aa", () => {
      expect(toAlphabetic(2)).toEqual("aa");
    });

    it("4 === aaaa", () => {
      expect(toAlphabetic(4)).toEqual("aaaa");
    });
  });

  describe("getColonData", () => {
    it("normal prefix", () => {
      expect(getColonData("margin")).toEqual({
        colon: false,
        semicolon: false,
      });
    });

    it("prefix plus colon", () => {
      expect(getColonData("margin:")).toEqual({
        colon: true,
        semicolon: false,
      });
    });

    it("prefix plus colon and semicolon", () => {
      expect(getColonData("margin: ;")).toEqual({
        colon: true,
        semicolon: true,
      });
    });

    it("empty", () => {
      expect(getColonData("")).toEqual({
        colon: false,
        semicolon: false,
      });
    });

    it("just a semicolon", () => {
      expect(getColonData(";")).toEqual({
        colon: false,
        semicolon: true,
      });
    });

    it("semicolon and colon", () => {
      expect(getColonData(":;")).toEqual({
        colon: true,
        semicolon: true,
      });
    });
  });
});

import { toAlphabetic, getColonData, lookupWord } from "../utils";

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

  const getParts = (row: string): [string, string] =>
    row.split("|") as [string, string];

  describe("getColonData", () => {
    it("normal prefix", () => {
      expect(getColonData(...getParts("margin|"))).toEqual({
        colon: false,
        semicolon: false,
      });
    });

    it("prefix plus colon", () => {
      expect(getColonData(...getParts("margin|:"))).toEqual({
        colon: true,
        semicolon: false,
      });
    });

    it("prefix plus colon and semicolon", () => {
      expect(getColonData(...getParts("margin|:;"))).toEqual({
        colon: true,
        semicolon: true,
      });
    });

    it("empty", () => {
      expect(getColonData(...getParts("|"))).toEqual({
        colon: false,
        semicolon: false,
      });
    });

    it("just a semicolon", () => {
      expect(getColonData(...getParts("|;"))).toEqual({
        colon: false,
        semicolon: true,
      });
    });

    it("semicolon and colon", () => {
      expect(getColonData(...getParts("|:;"))).toEqual({
        colon: true,
        semicolon: true,
      });
    });

    it("don't count semicolon in next prop", () => {
      expect(getColonData(...getParts("mar| padding: 12px;"))).toEqual({
        colon: false,
        semicolon: false,
      });
    });

    it("count colon and semicolon in current prop", () => {
      expect(getColonData(...getParts("mar|padding: 12px;"))).toEqual({
        colon: true,
        semicolon: true,
      });
    });
  });

  describe("lookupWord", () => {
    it("normal usage", () => {
      expect(lookupWord("word")).toEqual("word");
    });

    it("semicolon", () => {
      expect(lookupWord("wwef;word")).toEqual("word");
    });

    it("whitespace", () => {
      expect(lookupWord("wwef word")).toEqual("word");
    });

    it("bracket open", () => {
      expect(lookupWord("{ word")).toEqual("word");
    });

    it("bracket close", () => {
      expect(lookupWord("} word")).toEqual("word");
    });
  });
});

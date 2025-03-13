import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTrosTest", () => {
  test("regular items degrade in quality by 1 before sell date", () => {
    const items: Item[] = [new Item("Ring of Cleansening Code", 10, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(19);
  });

  test("regular items degrade in quality by 2 after sell date", () => {
    const items: Item[] = [new Item("Ring of Cleansening Code", -1, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(18);
  });

  test("quality cannot be negative", () => {
    const items: Item[] = [new Item("Ring of Cleansening Code", 5, 0)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(0);
  });

  test("Good Wine increases in quality over time", () => {
    const items: Item[] = [new Item("Good Wine", 5, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(11);
  });

  test("Good Wine increases in quality twice as fast after sell date", () => {
    const items: Item[] = [new Item("Good Wine", -1, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(12);
  });

  test("quality cannot exceed 50", () => {
    const items: Item[] = [new Item("Good Wine", 5, 50)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(50);
  });

  test("B-DAWG Keychain never changes quality", () => {
    const items: Item[] = [new Item("B-DAWG Keychain", 5, 80)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(80);
    expect(app.items[0].sellIn).toBe(5);
  });

  test("Backstage passes increase in quality by 1 when more than 10 days left", () => {
    const items: Item[] = [new Item("Backstage passes for Re:Factor", 11, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(21);
  });

  test("Backstage passes increase in quality by 2 when 10 days or less left", () => {
    const items: Item[] = [new Item("Backstage passes for Re:Factor", 10, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(22);
  });

  test("Backstage passes increase in quality by 3 when 5 days or less left", () => {
    const items: Item[] = [new Item("Backstage passes for Re:Factor", 5, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(23);
  });

  test("Backstage passes quality drops to 0 after concert", () => {
    const items: Item[] = [new Item("Backstage passes for Re:Factor", 0, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(0);
  });

  test("smelly items degrade twice as fast", () => {
    const items: Item[] = [new Item("Duplicate Code", 5, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toBe(18);
  });
});

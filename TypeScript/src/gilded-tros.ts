import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private readonly MAX_QUALITY = 50;
  private readonly MIN_QUALITY = 0;
  private readonly SMELLY_ITEMS = [
    "Duplicate Code",
    "Long Methods",
    "Ugly Variable Names",
  ];

  private updateBackstagePassQuality(item: Item): number {
    let quality = item.quality + 1;

    if (item.sellIn < 11) quality += 1;
    if (item.sellIn < 6) quality += 1;
    if (item.sellIn < 1) return 0;

    return Math.min(quality, this.MAX_QUALITY);
  }

  private updateGoodWineQuality(item: Item): number {
    const increase = item.sellIn < 0 ? 2 : 1;
    return Math.min(item.quality + increase, this.MAX_QUALITY);
  }

  private updateRegularItemQuality(item: Item): number {
    const isSmelly = this.SMELLY_ITEMS.includes(item.name);
    const baseDecrease = item.sellIn < 0 ? 2 : 1;
    const decrease = isSmelly ? baseDecrease * 2 : baseDecrease;
    return Math.max(item.quality - decrease, this.MIN_QUALITY);
  }

  public updateQuality(): void {
    this.items.forEach((item) => {
      switch (item.name) {
        case "B-DAWG Keychain":
          // Quality never changes
          break;

        case "Good Wine":
          item.quality = this.updateGoodWineQuality(item);
          break;

        case "Backstage passes for Re:Factor":
        case "Backstage passes for HAXX":
          item.quality = this.updateBackstagePassQuality(item);
          break;

        default:
          item.quality = this.updateRegularItemQuality(item);
      }

      // Update sellIn for all items except B-DAWG Keychain
      if (item.name !== "B-DAWG Keychain") {
        item.sellIn--;
      }
    });
  }
}

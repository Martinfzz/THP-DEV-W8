var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Downgrade by 1 the quality and sellIn for normal object", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Upgrade by 1 the quality and sellIn for Aged Brie and Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Upgrade by 3 the quality of Aged Brie and Backstage passes when there is 5 days or less remaining", function () {
    listItems.push(new Item("Aged Brie", 5, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10));
    listItems.push(new Item("Aged Brie", 3, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 23 },
      { sellIn: 4, quality: 13 },
      { sellIn: 2, quality: 23 },
      { sellIn: 2, quality: 13 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Upgrade by 2 the quality of Aged Brie and Backstage passes when there is 10 days or less remaining", function () {
    listItems.push(new Item("Aged Brie", 10, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10));
    listItems.push(new Item("Aged Brie", 7, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 22 },
      { sellIn: 9, quality: 12 },
      { sellIn: 6, quality: 22 },
      { sellIn: 6, quality: 12 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Sulfuras quality and sellIn do not change", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 15, 80));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 10, 80));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 5, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 15, quality: 80 },
      { sellIn: 10, quality: 80 },
      { sellIn: 5, quality: 80 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quality can not be above 50", function () {
    listItems.push(new Item("Normal object", 10, 60));
    listItems.push(new Item("Aged Brie", 3, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 2, quality: 50 },
      { sellIn: 2, quality: 50 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("When sellIn is under 0, the quality downgrade two time faster", function () {
    listItems.push(new Item("Normal object", -5, 10));
    listItems.push(new Item("Normal object", 0, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -6, quality: 8 },
      { sellIn: -1, quality: 8 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quality is never negative", function () {
    listItems.push(new Item("Normal object", 10, 0));
    listItems.push(new Item("Normal object", 10, -2));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: 9, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Backstage quality equal 0 when sellIn is less or equal to 0", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -10, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -11, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


});
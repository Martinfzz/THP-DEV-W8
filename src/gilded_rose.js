class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[], specialItems){
    this.items = items;
    this.specialItems = {
      brie: 'Aged Brie',
      backstage: 'Backstage passes to a TAFKAL80ETC concert',
      sulfuras : 'Sulfuras, Hand of Ragnaros'
    }
  }

  updateQuality() {
    this.items.map((element) => {
      if (element.name != this.specialItems.brie && element.name != this.specialItems.backstage && element.name != this.specialItems.sulfuras) {
        if (element.sellIn >= 0) {
          if (element.quality < 50 && element.quality > 0) {
            element.name.toLowerCase().includes("conjured") ? element.quality = element.quality - 2 : element.quality = element.quality - 1;
          } else if (element.quality >= 50) {
            element.quality = 50;
          } else {
            element.quality = 0;
          }
        } else {
          element.name.toLowerCase().includes("conjured") ? element.quality = element.quality - 4 : element.quality = element.quality - 2
        }
      } else if (element.quality < 50 && (element.name == this.specialItems.backstage || element.name == this.specialItems.brie)) {
        if (element.sellIn >= 11) {
          element.quality = element.quality + 1;
        } else if (element.sellIn < 11 && element.sellIn >= 6) {
          element.quality = element.quality + 2;
        } else {
          element.quality = element.quality + 3;
        }
        if (element.quality < 0) {
          element.quality = 0;
        }
      }
      element.name != this.specialItems.sulfuras ? element.sellIn = element.sellIn - 1 : element.quality = 80;
      if (element.sellIn < 0) {
        if (element.name == this.specialItems.brie) {
          element.quality = element.quality + 1;
        }
        if (element.name == this.specialItems.backstage) {
          element.quality = 0;
        }
      }
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}

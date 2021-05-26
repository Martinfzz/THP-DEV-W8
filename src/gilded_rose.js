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
      if (element.name != this.specialItems.brie && element.name != 'Backstage passes to a TAFKAL80ETC concert' && element.name != 'Sulfuras, Hand of Ragnaros') {
        if (element.quality < 50 && element.quality > 0) {
          element.quality = element.quality - 1;
        } else if (element.quality >= 50) {
          element.quality = 50;
        } else {
          element.quality = 0;
        }
      } else {
        if (element.quality < 50) {
          if (element.name == 'Backstage passes to a TAFKAL80ETC concert' || element.name == this.specialItems.brie) {
            if (element.sellIn >= 11) {
              element.quality = element.quality + 1;
            } else if (element.sellIn < 11 && element.sellIn >= 6) {
              element.quality = element.quality + 2;
            } else {
              element.quality = element.quality + 3;
            } 
          }
        }
      }
      if (element.name != 'Sulfuras, Hand of Ragnaros') {
        element.sellIn = element.sellIn - 1;
      }
      if (element.sellIn < 0) {
        if (element.name != 'Aged Brie') {
          if (element.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (element.quality > 0) {
              if (element.name != 'Sulfuras, Hand of Ragnaros') {
                element.quality = element.quality - 1;
              }
            }
          } else {
            element.quality = element.quality - element.quality;
          }
        } else {
          if (element.quality < 50) {
            element.quality = element.quality + 1;
          }
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

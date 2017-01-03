import FilterableList from '../../../src/submodules/blogger/classes/FilterableList.js';

describe("Filterable List", () => {
  let filterableList, items, propertyFilters;

  beforeEach(() => {
    items = [{ name: "name1", id: 1 }, { name: "name2", id: 2 }, { name: "name11", id: 3}];
    propertyFilters = ["name"];
    filterableList = new FilterableList({items, propertyFilters});
  })

  describe("#getFilteredItems", () => {
    it("returns all of the items when all filtersValues are empty", () => {
      let filteredList = filterableList.getFilteredItems();
      expect(filteredList).toEqual(items);
    });

    it("returns all items matching the filter when filterValues are not empty", () => {
      filterableList.updateList({name: "name1"});

      let filteredList = filterableList.getFilteredItems()
      expect(filteredList.length).toEqual(2);
      expect(filteredList).toContain(items[0]);
      expect(filteredList).toContain(items[2]);
    });

    it("returns no values when no items match any of the filter values", () => {
      filterableList.updateList({name: "MATCHLESS"});
      expect(filterableList.getFilteredItems()).toEqual([]);
    });
  });
});

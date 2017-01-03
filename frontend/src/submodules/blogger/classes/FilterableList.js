export default class FilterableList {
  constructor(params) {
    this.items = params.items;
    this.filteredItems = params.items;

    this.propertyFilters = {};
    params.propertyFilters.forEach((property) => this.propertyFilters[property] = "");
  }

  updateList(newFilterValues) {
    this._setFilters(newFilterValues);
    this._updateFilteredItems();
  }

  _setFilters(propertyToValues) {
    for(let property in propertyToValues) {
      this.propertyFilters[property] = propertyToValues[property];
    }
  }

  _updateFilteredItems() {
    this.filteredItems = [];

    this.items.forEach((item) => {
      for(let property in this.propertyFilters) {
        if(item[property].match(this.propertyFilters[property])) {
          this.filteredItems.push(item);
        }
      }
    });
  }

  getFilteredItems() {
    return this.filteredItems;
  }
}

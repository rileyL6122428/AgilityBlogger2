export default class FilteredListFactory {
  constructor(params) {
    this.filterPropertyName = params.filterBy;
    this.filterValue = "";
    this.items = params.items;
  }

  getFilteredList() {
    let filteredItems = [];
    this.items.forEach((item) => {
      if(item[this.filterPropertyName].match(this.filterValue))
        filteredItems.push(item);
    });
    return filteredItems;
  }
}

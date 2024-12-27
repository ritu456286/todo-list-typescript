import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: DOMList = new ListTemplate();
  ul: HTMLUListElement;
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((itemObj) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = itemObj.id; //here we are using get id() function
      check.tabIndex = 0;
      check.checked = itemObj.checked;
      li.append(check);

      check.addEventListener("change", () => {
        itemObj.checked = !itemObj.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = itemObj.id;
      label.textContent = itemObj.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(itemObj.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}

function getJSON(callback){
  const xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open('GET', '../scripts/json/groceries.json', true);
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState ==  4 && xhttp.status == 200){
      callback(xhttp.response);
    }
  };
  xhttp.send(null);
}

getJSON((response) => {
  const groceryList = JSON.parse(response);

  let listItem = groceryList.map((items) => {
    return `
    <li class="groceryItem" tabindex="0">
        <div class="qty">Qty: ${items.qty}</div>
        <div class="middleContent">
          <div class="item">${items.item}</div>
          <hr/>
          <div class=brandTypes> ${items.brand} ${items.type}</div>
        </div>
        <div class="productCategory">${items.category}</div>
    </li>
    `
  }).join('');
  document.querySelector("#groceryListContainer").innerHTML = listItem;

});
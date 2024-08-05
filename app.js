const title=document.getElementById('title');
const price=document.getElementById('price');
const taxes=document.getElementById('taxes');
const ads=document.getElementById('ads');
const discount=document.getElementById('discount');
const total=document.getElementById('total');
const count=document.getElementById('count');
const catagory=document.getElementById('catagory');
const headerB=document.getElementById('headerB');
const btnC=document.querySelector(".btn-create");
const outputs=document.querySelector(".outputs");
let mode="create";
let tmp;
let searchMood = "title";
let dataPro;
//get total
function getTotal() {
  if (price.value !="") {
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background="#040";
  }
  else{
    total.innerHTML="";
    total.style.background="#f10d";
  }
}
outputs.style.display="none"
//create proudct
if (localStorage.proudct!=null) {
  dataPro = JSON.parse(localStorage.proudct);
}
else{
  dataPro=[];
}
btnC.onclick=()=>{
  if(title.value === ""){
    alert("you must add title to create new proudct");
  }else{
    outputs.style.display="block";
    headerB.style.display="none";
    const newPro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    catagory:catagory.value.toLowerCase(),
  }
    if(mode === "create"){
    if (newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
  }
    else{dataPro.push(newPro)};
  }
    else{
    dataPro[tmp] = newPro;
    mode="create";
    btnC.innerText="Create";
    count.style.display="block";
  }
//save localstorage  
    localStorage.setItem('proudct', JSON.stringify(dataPro));
    clearData()
    showData()
  }
  
};
//clear data
function clearData() {
  title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  total.innerHTML="";
  count.value="";
  catagory.value="";
  total.style.background="#f10d";
}
//read
function showData() {
  let table="";
  for (let i = 0; i < dataPro.length; i++) {
    
    table+=`
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
  }
  const tbody=document.getElementById('tbody').innerHTML=table;
  const deleteAll=document.getElementById('deleteAll');
  if(dataPro.length > 0){
    deleteAll.innerHTML=`
    <button onclick="deleteAllData()">Delete All(${dataPro.length})</button>
    `
  }else{deleteAllData.innerHTML='';}
}
showData()
//count
//delete
function deleteData(i) {
  dataPro.splice(i,1);
  localStorage.proudct=JSON.stringify(dataPro);
  showData()
}
function deleteAllData() {
  localStorage.clear();
  dataPro.splice(0);
  showData()
  outputs.style.display="none";
  headerB.style.display="none";
  mode="create";
  btnC.innerText="Create";
  count.style.display="block";
  clearData()
}
function showOutputs() {
  outputs.style.display="block";
  headerB.innerText="DeleteAll";
  headerB.onclick=()=>{outputs.style.display="none";headerB.style.display="none";deleteAllData()};
}
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display="none";
  catagory.value=dataPro[i].catagory;
  btnC.innerText="update";
  getTotal();
  mode="update";
  tmp=i;
  scroll({
    top:0,
    behvaior:'smooth'
  })
}
//search

function Search(id){
  let search = document.getElementById('search');
  if (id === "Search-t") {
    searchMood = "title";
  }else{
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus()
  search.value = "";
  showData();
}
function searchData(value){
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++ ) {
      if(dataPro[i].title.includes(value.toLowerCase())){
        table+=`
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].catagory}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `
      }
    }
  } else{
    for (let i = 0; i < dataPro.length; i++ ) {
      if(dataPro[i].catagory.includes(value.toLowerCase())){
        table+=`
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].catagory}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `
      }
    }
  }
  document.getElementById('tbody').innerHTML=table;
}
//clean data
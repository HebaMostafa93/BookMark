var siteName = document.querySelector("#siteName")
var siteUrl = document.querySelector("#siteUrl")
var boxModel = document.querySelector(".box-info")
var closeBtn = document.querySelector("#closeBtn")

var bookmarkList =[]
if(localStorage.getItem("data") != null){
    bookmarkList = JSON.parse(localStorage.getItem("data"))
    display()
}
function submitFn() {
    if(validName() == true && validUrl() == true && uniqueName() != true ) {
        bookMark = {
            name : siteName.value ,
            url : siteUrl.value ,
        }
        bookmarkList.push(bookMark)
        localStorage.setItem("data" , JSON.stringify(bookmarkList))
        display()
        clearForm()
    }
    else{
        boxModel.classList.replace("d-none" , "d-block")
    }
}

function display() {
    var temp = []
    for ( var i=0; i<bookmarkList.length ; i++ ) {
        temp+= `<tr class="table-tr">
        <td>${i+1}</td>
        <td>${bookmarkList[i].name}</td>
        <td> <a class="btn btn-visit" href="${bookmarkList[i].url}" target="_blank" ><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteFn(${i})" class=" btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>`
    }
    document.getElementById("tableData").innerHTML = temp
}

function clearForm(){
    siteName.value =""
    siteUrl.value =""
}

function deleteFn(index) {
    bookmarkList.splice(index ,1)
    localStorage.setItem("data" , JSON.stringify(bookmarkList))
    display()
}
// ---------------------Validation Functions------------------------
function validName() {
    var regexName = /^\w{3,}(\s+\w+)*$/
    if(regexName.test(siteName.value) == true) {
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        return true;
    }
    else{
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        return false;
    }
    
}

function validUrl() {
    var regexUrl = /^(https:\/\/)(w{3}\.)\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    if(regexUrl.test(siteUrl.value) == true) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        return true;
    }
    else{
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        return false;
    }
}

function uniqueName() {
    for (var i = 0; i < bookmarkList.length; i++) {
        var res = bookmarkList[i].name.toLowerCase().includes(siteName.value.toLowerCase())
        if (res == true) {
            document.getElementById("uniqueNameAlert").classList.replace("d-none" , "d-block")
            return true;
        }
    }
    document.getElementById("uniqueNameAlert").classList.replace("d-block" , "d-none")
}

siteName.addEventListener("keyup" , validName)
siteUrl.addEventListener("keyup" , validUrl)
siteName.addEventListener("keyup",uniqueName)

// ---------------------Close Model Function----------------------------

function closeModel() {
    boxModel.classList.add("d-none")
}
closeBtn.addEventListener("click",closeModel)

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModel();
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModel();
    }
  });


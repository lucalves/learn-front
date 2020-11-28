var list = [
    {"desc" : "rice", "amount" : "1", "value" : "5.40"},
    {"desc" : "beer", "amount" : "12", "value" : "1.99"},
    {"desc" : "meat", "amount" : "1", "value" : "15.00"}
];

function getTotal(list) {
    var total = 0;

    for (var key in list) {
        total += list [key].amount * list[key].value;
    }

    totalAmount = list[key.amount];

    document.getElementById("totalValue").innerHTML = formatValue(total);
    return total;
}

function setList(list) {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';

    for (var key in list) {
        table += '<tr><td>'+ formatDescription(list[key].desc) + '</td><td>' + list[key].amount + '</td><td>' + 
        formatValue(list[key].value) + '</td><td> <button class="btn btn-default" onclick="setUpdate('+key+')">Edit</button> <button class="btn btn-default" onclick="deleteData('+key+')">Delete</button></td></tr>';
    }

    table += '</tbody>';

    document.getElementById("listTable").innerHTML = table;

    getTotal(list);
    saveListStorage(list);
}

function formatDescription(desc) {
    var str = desc.toLowerCase();

    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";

    str = str.replace(".", ",");
    str = "$ " + str;

    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function addData() {
    if(!validator()) {
        return;
    }

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc" : desc , "amount" : amount , "value" : value});
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];

    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="' + id + '">';
}

function resetForm() {
    document.getElementById("desc").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("value").value = '';
    document.getElementById("btnUpdate").style.display = 'none';
    document.getElementById("btnAdd").style.display = 'inline-block';

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("error").style.display = "none";
}

function updateData() {
    if(!validator()) {
        return;
    }

    var id = document.getElementById("idUpdate").value;

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

function deleteData(id) {
    if (confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrayAuxIni = list.slice(0, id);
            var arrayAuxEnd = list.slice(id + 1);

            list = arrayAuxIni.concat(arrayAuxEnd);
        }
        setList(list);
    } 
}

function validator() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    document.getElementById("error").style.display = "none";
    var error = '';

    if (desc === "") {
        error += '<p>Fill out description!</p>';
    }
    
    if (amount === "") {
        error += '<p>Fill out a quantity!</p>';
    } else if (amount != parseInt(amount)) {
        error += '<p>Fill out a valid amount!</p>';
    }

    if (value === "") {
        error += '<p>Fill out a value!</p>';
    } else if (value != parseFloat(value)) {
        error += '<p>Fill out a valid value!</p>';
    }

    if (error != "") {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("error").style.color = "white";
        document.getElementById("error").style.padding = "10px";
        document.getElementById("error").style.margin = "10px";
        document.getElementById("error").style.borderRadius = "13px";

        document.getElementById("error").innerHTML = '<h3>Error: </h3>' + error;
        return 0;
    } else {
        return 1;
    }
}

function deleteList() {
    if(confirm("Delete the list?")) {
        list = [];
        setList(list);
    }
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var verifyList = localStorage.getItem("list");

    if (verifyList) {
        list = JSON.parse(verifyList);
    }

    setList(list);
}

initListStorage();
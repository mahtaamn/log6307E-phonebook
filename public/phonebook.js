/*function for searching by names*/
function search_function() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search_input");
  filter = input.value.toUpperCase();
  table = document.getElementById("my_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/*function for adding o deleting rows by user*/
function add_row_function() {
  var table = document.getElementById("my_table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);
  var cell4 = row.insertCell(-1);
  var cell5 = row.insertCell(-1);

  cell1.innerHTML = name_input.value;
  cell2.innerHTML = id_input.value;
  cell3.innerHTML = email_input.value;
  cell4.innerHTML = phone_input.value;
  cell5.innerHTML = country_input.value;
}

function delete_row_function() {
  document.getElementById("my_table").deleteRow(-1);
}

/*function for sorting the table by header*/
function sort_table(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("my_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


function onLoadBody() {
  showUsers();
}


function showUsers() {
  // Creating the XMLHttpRequest object

  var request = new XMLHttpRequest();

  // Instantiating the request object
  request.open("GET", "http://localhost:3000/users");

  // Defining event listener for readystatechange event
  request.onreadystatechange = function () {
    console.log("111");
    // Check if the request is compete and was successful
    if (this.readyState === 4 && this.status === 200) {
      // Inserting the response from server into an HTML element
      console.log("this.responseText", this.responseText);
      var data = JSON.parse(this.responseText);
      console.log("data:", data);

      var tableData = '';
      var k = 0;

      for (let i = 0; i < data.length; i++) {
        console.log("i:", i);
        k++;
        tableData += '<tr>';

        for (const [key, value] of Object.entries(data[i])) {
          console.log(key, value);

          tableData += '<td>' + value + '</td>';

        }

        tableData += '</tr>';
        console.log("tableData", tableData);
      }
      //document.getElementById("result").innerHTML = this.responseText;
      var myTable = document.getElementById('tableLable');
      myTable.insertAdjacentHTML("afterend", tableData);
    }
  };


  //request.open("GET", "ajax_info.txt", true);
  request.send();

}



function addUser() {
  console.log("1111");
  // var request = new XMLHttpRequest();

  // request.open("POST", "http://localhost:3000/createUser");

  // request.onreadystatechange = function () {
  //   console.log("111");
  //   // Check if the request is compete and was successful
  //   if (this.readyState === 4 && this.status === 200) {
  //     // Inserting the response from server into an HTML element
  //     console.log("this.responseText", this.responseText);
  //     var data = JSON.parse(this.responseText);
  //     console.log("data:", data);

  //   }
  // };

  // request.send();



  let post2 = {
    "name": name_input.value,
    "number": phone_input.value,
    "email": email_input.value,
    "nationality": country_input.value
  };
  let post = JSON.stringify(post2)

  const url = "http://localhost:3000/createUser"
  let xhr = new XMLHttpRequest()

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Post successfully created!")
      const container = document.getElementById('my_table');

      container.innerHTML = ' <tr id="tableLable"> <th onclick="sort_table(1)">ID</th><th onclick="sort_table(0)">Name</th><th onclick="sort_table(3)">Phone number</th><th onclick="sort_table(2)">Email</th><th onclick="sort_table(4)">Country</th></tr>';
      //container.innerHTML='';
      showUsers();
    }
  }

}

function deleteUser() {

  var selectedTable = document.getElementById('my_table');
  var myrows = selectedTable.getElementsByTagName("tr");
  var lastrow = myrows[myrows.length -1];
  var mycells = lastrow.getElementsByTagName("td");
  console.log(mycells);
  var lastcell = mycells[0];
  console.log(lastcell);

  var idLast = lastcell.innerHTML;
  console.log(idLast);

  let post2 = {
    "id": idLast
  };
  let post = JSON.stringify(post2)

  const url = "http://localhost:3000/deleteUser"
  let xhr = new XMLHttpRequest()

  xhr.open('DELETE', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Post successfully created!")
      const container = document.getElementById('my_table');

      container.innerHTML = ' <tr id="tableLable"> <th onclick="sort_table(1)">ID</th><th onclick="sort_table(0)">Name</th><th onclick="sort_table(3)">Phone number</th><th onclick="sort_table(2)">Email</th><th onclick="sort_table(4)">Country</th></tr>';
      showUsers();
    }
  }

}
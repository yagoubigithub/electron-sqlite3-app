const electron = window.require("electron");
const { ipcRenderer } = electron;

$(document).ready(function () {
  //get data

  ipcRenderer.send("user", {});

  ipcRenderer.once("user", function (event, data) {
    displayUsers(data);
  });

  $("#addForm").submit(function (e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    ipcRenderer.send("user:add", { username, password });

    ipcRenderer.once("user:add", function (event, data) {
        displayUsers(data);
        $("#addForm").trigger("reset");

    });
  });
});

function displayUsers(users) {
  let html = "";
  users.map((user) => {
      const { username, password, id } = user
    html =
      html +
      `<tr> 
       <form onsubmit="update(event,${id})">
    <td>
  
    <input type="text" id="username-input-${id}" value=" ${username}"/>
    </td>
    <td>
    <input type="text" id="password-input-${id}" value=" ${password}"/>
   
    </td>
  
    <td> 
    <button  onclick="delete_(${id})">delete</button>
    <button type="submit" onclick="update(event,${id})">update</button>
    </td>

    <form>
    </tr>`;
  });

  $("#data-container").html(html);
}

function delete_(id){
    console.log(id)
    ipcRenderer.send("user:delete", {id});

    ipcRenderer.once("user:delete", function (event, data) {
      displayUsers(data);
    });
}

function update(e,id) {
    e.preventDefault()
    const username = $("#username-input-"+id).val()
    const password = $("#password-input-"+id).val()
    ipcRenderer.send("user:update", {id,username,password});

    ipcRenderer.once("user:update", function (event, data) {
      displayUsers(data);
    });
}
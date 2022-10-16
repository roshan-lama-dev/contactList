const listElm = document.getElementById("list");

const apiUrl = "https://randomuser.me/api/?results=20&";

let userArray = [];

// fetch is the inbuilt functioj webapi
// .then converts the json into object

// critical rendering
// web api
// Call back queue
const fetchUsers = (gender) => {
  fetch(apiUrl + gender)
    .then((response) => response.json())
    .then((data) => {
      userArray = data.results;

      //   invode and pass parameter
      //   display is invoked inside the fetchusers beause we need to show the user
      display(userArray);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const fetchUsers = async () => {
//   const response = await fetch(apiUrl);
//   const data = response.json();
//   userArray.push(data.results);
// };

fetchUsers();

const display = (users) => {
  let str = "";

  users?.map((item, index) => {
    str += `<div class="card" style="width: 18rem;">
    <img src="${item.picture.large}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.name.title} ${item.name.first} ${
      item.name.last
    }</h5>
      <p>
      <ul class="list-unstyled">
    <li class="mt-3 overflow-hidden"><i class="fa-regular fa-envelope"></i> ${
      item.email
    }</li>
    <li class="mt-2"><i class="fa-solid fa-location-dot"></i> ${
      item.location.street.name
    }, ${item.location.city}, ${item.location.country}, ${
      item.location.postcode
    }</li>
    <li class="mt-2" ><i class="fa-solid fa-phone"></i> ${item.phone}</li>
    <li class="mt-2"><i class="fa-solid fa-calendar-days"></i> ${item.dob.date.substr(
      0,
      10
    )}</li>
    
</ul>
      </p>
    </div>
  </div>`;
  });
  listElm.innerHTML = str;
  document.getElementById("userCount").innerText = users.length;
};

// Capturing the input key from the user.
// useing on keyup
// create a functino and get the value using .value and then
const handleOnSearch = (e) => {
  console.log("Onlypess");
  const value = e.value;
  const filteredUser = userArray.filter((user, index) => {
    const name = user.name.first + user.name.last;
    return name.toLowerCase().includes(value.toLowerCase());
  });

  display(filteredUser);
};

const keyHandleOnSearch = (e) => {
  const value = e.value;
  //   concactinating because of the api requirements
  const query = "gender=" + value;
  console.log(value);
  console.log("Key is pressed");
  fetchUsers(query);
};

// to do change the ui of the page
// add on click the card function and display all the details of the person

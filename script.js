console.log("JS file connected");

// GET students
function getStudents() {
  fetch("https://your-backend-url.onrender.com")
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("studentList");
      list.innerHTML = "";

      data.forEach(student => {
       const li = document.createElement("li");
li.innerHTML = `
  ${student.name} - ${student.age}
  <button onclick="deleteStudent(${student.id})">Delete</button>
`;
list.appendChild(li);
      });
      data.forEach(student => {
  const li = document.createElement("li");
  li.innerHTML = `
    ${student.name} - ${student.age}
    <button onclick="editStudent(${student.id}, '${student.name}', ${student.age})">Edit</button>
    <button onclick="deleteStudent(${student.id})">Delete</button>
  `;
  list.appendChild(li);
});
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
function editStudent(id, name, age) {
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;

  window.editId = id; // remember which student to update
}

function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  let url = "http://localhost:3000/students";
  let method = "POST";

  // if edit mode
  if (window.editId) {
    url = `http://localhost:3000/students/${window.editId}`;
    method = "PUT";
  }

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age })
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      window.editId = null; // clear edit mode
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      getStudents();
    })
    .catch(err => console.error(err));
}

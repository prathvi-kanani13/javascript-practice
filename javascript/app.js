//  1. Environment
console.log("Running in Browser:", typeof window !== "undefined");

//  2. Variables & Data Types
let users = [];
const MAX_USERS = 5;
const outputBox = document.getElementById("output");

// Helper: log to page
function log(message) {
  outputBox.textContent += message + "\n";
}

//  3. Scopes + Create User
function createUser() {
  if (users.length >= MAX_USERS) {
    alert("User limit reached!");
    return;
  }

  //  4. Primitives vs Reference
  const userName = prompt("Enter user name:");
  const role = { type: "admin" };

  //  5. Regular vs Arrow
  function generateId() {
    return Math.floor(Math.random() * 1000);
  }

  const logWelcome = (name) => log(`Welcome, ${name}!`);

  const user = {
    id: generateId(),
    name: userName,
    role,
  };

  users.push(user);
  logWelcome(userName);
}

//  6. Object Properties & Methods
const userManager = {
  getUserCount() {
    return users.length;
  },
  greetAllUsers() {
    users.forEach(u => log(`Hello, ${u.name}`));
  }
};

//  7. Object & Array Destructuring
function listUsers() {
  outputBox.textContent = ""; // clear output
  if (users.length === 0) {
    log("No users.");
    return;
  }

  users.forEach(({ id, name, role }) => {
    log(`ID: ${id}, Name: ${name}, Role: ${role.type}`);
  });
}

//  8. Spread & Rest
function addManyUsers(...newUsers) {
  users = [...users, ...newUsers];
}

// Button: Add 2 sample users
function addSampleUsers() {
  addManyUsers(
    { id: 101, name: "Alice", role: { type: "tester" } },
    { id: 102, name: "Bob", role: { type: "manager" } }
  );
  log("Sample users added.");
}

//  9. setTimeout
function simulateLogout() {
  log("You will be logged out in 3 seconds...");
  setTimeout(() => {
    log("Logged out.");
  }, 3000);
}

//  10. Fetch API +  11. JSON
function fetchFakeAPI() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.json())
    .then(data => {
      log("Fetched user from API: " + data.name);
    })
    .catch(err => log("Fetch error: " + err.message));
}
fetchFakeAPI();

//  12. Error Handling
function safeUserAdd() {
  try {
    let name = prompt("Enter user:");
    if (!name) throw new Error("Name cannot be empty!");
    createUser(name); // original createUser doesn't take param
  } catch (err) {
    log("Error: " + err.message);
  }
}

//  13. Higher-order Functions + Closures
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const loginCounter = createCounter();
log("Login #" + loginCounter()); // 1
log("Login #" + loginCounter()); // 2

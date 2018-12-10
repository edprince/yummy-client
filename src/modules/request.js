const url = "http://localhost:8080/api/v1/";
const axios = require("axios");
const config = {
  headers: {}
};

/*
 * Requests all recipes data
 * @param {object} options - specifics to search for (title, author... etc.)
 */
export function getAllRecipes(options, order=null, searchTerm=null) {
  let urlExtension = "?fields=";
  urlExtension = urlExtension += buildUrl(options, searchTerm, order);

  return new Promise((resolve, reject) => {
    axios.get(url + "all" + urlExtension).then(response => {
      resolve(response.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

function buildUrl(options=[], searchTerm=null, order) {
  let url = "";

  options.forEach(option => {
    url += "," + option;
  });

  if (searchTerm) {
    url += options && searchTerm ? "&" : "?";
    url += "search=" + searchTerm;
  }

  if (order) {
    url += "&order=" + order;
  }

  return url;
}

/*
 * Request data for a specific recipe
 * @param {string} id - id of the recipe
 */
export function getRecipe(id) {
  return new Promise((resolve, reject) => {
    axios.get(url + "recipe?id=" + id).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
}

/*
 * Request for all comments related to a recipe
 * @param {string} id - id of the recipe commenting on
 */
export function getComments() {
  return new Promise((resolve, reject) => {
    axios.get(url + "comment").then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
}

/*
 * Requests for comment to be added to recipe
 * @param {object} comment - contains recipe id, user id and content
 */
export function comment(comment) {
  const urlExtension = `comment/${comment.id}/${comment.uid}/${comment.content}`;
  const data = {
    id: comment.id,
    uid: comment.uid,
    content: comment.content
  };

  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, data, config).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

/*
 * Request for user to be added to database
 * @param {object} user - has username, email and password
 * @param {function} callback
 */
export function register(user) {
  const urlExtension = `register/${user.email}/${user.username}/${user.password}`;

  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, comment).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

export function saveRecipe(recipe) {
  const urlExtension = `save/${recipe._id}/` + getUserId();
  const jwt = getJwtToken();
  config.headers = {
    Authorization: "Bearer " + jwt
  };

  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Sends request to add recipe to database
 * @param {object} recipe - contains recipe attributes (title, photo etc.)
 */
export function addRecipe(recipe) {
  const urlExtension = "recipe";
  const jwt = getJwtToken();
  config.headers = {
    Authorization: "Bearer " + getJwtToken()
  };

  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, recipe, config).then(response => {
      resolve(response);
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

/**
 * Sends request to log user in
 * @param {object} user - contains username, password
 */
export function login(user) {
  const urlExtension = "login";
  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, user).then(response => {
      localStorage.setItem("jwt", response.data.token);
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

function getJwtToken() {
  return localStorage.getItem("jwt");
}

function getUserId() {
  return localStorage.getItem("userId");
}

/*
 * Throws error if response is not valid
 * @param {object} response - response form a fetch request
function handleError(response) {
  console.log("Handling");
  if (!response.ok) {
    console.log("Throwing new error");
    throw new Error(response.statusText);
  }
  return response;
}
*/

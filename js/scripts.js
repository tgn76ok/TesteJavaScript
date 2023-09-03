const url = "https://swapi.dev/api/people/";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Load post
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

// Get all posts
var radio = document.querySelector('.manual-btn')
var cont = 1

function proximo() {
  if( cont < 8  ){
    cont++;
    url1 = url +`/?page=${cont}`
    getAllPosts(url1);
}else{
  alert("nao tem mais itens")
}
}





var num
async function getAllPosts(url) {


  const response = await fetch(url);

  console.log(response);

  const data = await response.json();

  console.log(data["results"]);

  loadingElement.remove();

  data["results"].map((post) => {
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const title = document.createElement("h2");
    const massa = document.createElement("p");
    const autura = document.createElement("p");
    const skin = document.createElement("p");
    const olho = document.createElement("p");
    const ano = document.createElement("p");
    const sexo = document.createElement("p");
    // const link = document.createElement("a");

    div.classList.add("cardbackground")
    div1.classList.add("CARD")
    div2.classList.add("parteCards")
    

    massa.classList.add("comapoText")
    ano.classList.add("comapoText")
    autura.classList.add("comapoText")
    olho.classList.add("comapoText")
    skin.classList.add("comapoText")
    sexo.classList.add("comapoText")

    title.innerText = post.name;
    massa.innerText = "PESO :" +post.mass+"KG";
    ano.innerText = "NASCIMENTO :" +post.birth_year
    autura.innerText = "ALTURA :" +post.height+" CM"
    skin.innerText = "PELE :" +post.fair
    olho.innerText = "OLHO :" +post.eye_color
    sexo.innerText = "GENERO :" +post.gender


    // body.innerText = post.skin_color;
    // link.innerText = "Ler";
    // link.setAttribute("href", `/post.html?id=${post.id}`);
    

    div.appendChild(title);
    div.appendChild(massa);
    div.appendChild(ano);
    div.appendChild(autura);
    div.appendChild(skin);
    div.appendChild(olho);
    div.appendChild(sexo);

    div1.appendChild(div)
    div2.appendChild(div1)
    // div.appendChild(link);
    postsContainer.appendChild(div2);
  });
}

// Get individual post
async function getPost(id) {
  const [responsePost, responseComments] = await Promise.all([
    fetch(`${url}/${id}`),
    fetch(`${url}/${id}/comments`),
  ]);

  const dataPost = await responsePost.json();

  const dataComments = await responseComments.json();

  loadingElement.classList.add("hide");
  postPage.classList.remove("hide");

  const title = document.createElement("h1");
  const body = document.createElement("p");

  title.innerText = dataPost.title;
  body.innerText = dataPost.body;

  postContainer.appendChild(title);
  postContainer.appendChild(body);

  dataComments.map((comment) => {
    createComment(comment);
  });
}

function createComment(comment) {
  const div = document.createElement("div");
  const email = document.createElement("h3");
  const commentBody = document.createElement("p");

  email.innerText = comment.email;
  commentBody.innerText = comment.body;

  div.appendChild(email);
  div.appendChild(commentBody);
  commentsContainer.appendChild(div);
}

// Insert a comment
async function postComment(comment) {
  const response = await fetch(url, {
    method: "POST",
    body: comment,
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  createComment(data);
}



if (!postId) {
  getAllPosts(url)
} else {
  getPost(postId);

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let comment = {
      email: emailInput.value,
      body: bodyInput.value,
    };

    comment = JSON.stringify(comment);

    postComment(comment);
  });
}

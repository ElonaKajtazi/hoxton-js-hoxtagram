// solution goes here
// Instructions
// - Use this template as a starting point. Make sure you download it into your laptop https://codesandbox.io/s/day-14-hoxtagram-i-template-sibgn(old link in JS. use this one instead => ) https://codesandbox.io/s/hoxtagram-i-crud-template-tbc7mb ✅
// - Set up your json-server using the files in the db folder; You must start the server on your local machine, using this exact command from the terminal on the root of your project folder:  json-server --watch db/db.json --routes db/routes.json  ✅
// - Dynamically render the posts using the card HTML portion that you'll find commented in the index.html file. ✅
// - Render the comments for the posts and the likes, too. (note the heart button is useless. For now 😉) ✅
// - Try to use the same CSS classes to achieve the desired look. ✅
//- Have the like button adding 1 like to the respective counter each time you click it ✅
//- Have the comments form to add another comment to the respective post

// Tips
// - Make some requests to your server and inspect the response, so you can check the data structure before start coding ✅
// - Feel free to use hardcoded values to take care of the visuals, before connecting your front end to the server ✅
// - Help yourselves by building helper functions, a la getImages() ✅

//Creating the types
type CommentData = {
  imageId: number;
  content: string;
  id: number;
};
type Image = {
  id: number
  title: string
  likes: number
  image: string
  comments: CommentData[]
};
type State = {
  images: Image[];
};

//Creating the state
let state: State = {
  images: [],
};

// getting the data from the server
function getImagesFromServer() {
  fetch("http://localhost:5000/images")
    .then((resp) => resp.json())
    .then((getImagesFromServer) => {
      state.images = getImagesFromServer.reverse();
      render();
    });
}

function updateImage(image) {
  let imageCopy = { ...image };
  delete imageCopy.comments;

  return fetch(`http://localhost:5000/images/${image.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageCopy),
  }).then((resp) => resp.json());
}

function createComment(content: string, imageId: number) {
  fetch("http://localhost:3333/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      imageId,
    }),
  })
    .then((resp) => resp.json())
    .then(() => {
      getImagesFromServer();
    });
}
function deleteImage(imageId: number) {
  fetch(`http://localhost:3333/images/${imageId}`, {
    method: "DELETE",
  }).then(() => getImagesFromServer());
}
function renderComment(comment: CommentData, listEl: HTMLUListElement) {
  let liEl = document.createElement("li");
  liEl.textContent = comment.content;
  listEl.append(liEl);
}

function renderCommentForm(imageId: number, articleEl: HTMLElement) {
  let formEl = document.createElement("form");
  formEl.className = "comment-form";
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    createComment(inputEl.value, imageId);
  });

  let inputEl = document.createElement("input");
  inputEl.className = "comment-input";
  inputEl.type = "text";
  inputEl.name = "comment";
  inputEl.placeholder = "Add a comment...";

  let buttonEl1 = document.createElement("button");
  buttonEl1.className = "comment-button";
  buttonEl1.type = "submit";
  buttonEl1.textContent = "Post";

  formEl.append(inputEl, buttonEl1);
  articleEl.append(formEl);
}
function renderImage(image: Image, sectionEl: HTMLElement) {
  let articleEl = document.createElement("article");
  articleEl.className = "image-card";

  let topSection = document.createElement("div");
  topSection.className = "image__top-section";

  let titleh2El = document.createElement("h2");
  titleh2El.className = "title";
  titleh2El.textContent = image.title;

  let deletePostButton = document.createElement("button");
  deletePostButton.className = "image__top-section";
  deletePostButton.textContent = "❌";
  deletePostButton.addEventListener("click", () => {
    deleteImage(image.id);
  });
  topSection.append(titleh2El, deletePostButton);

  let imageEl = document.createElement("img");
  imageEl.className = "image";
  imageEl.src = image.image;

  let divEl = document.createElement("div");
  divEl.className = "likes-section";

  let spanEl = document.createElement("span");
  spanEl.className = "likes";
  spanEl.textContent = `${image.likes}  likes`;
  let buttonEl = document.createElement("button");
  buttonEl.className = "like-button";
  buttonEl.textContent = "♥";

  buttonEl.addEventListener("click", function () {
    image.likes++;
    updateImage(image);
    render();
  });

  let listEl = document.createElement("ul");
  listEl.className = "comments";

  // looping through the comments and creating the comments
  for (let comment of image.comments.slice(-5)) {
    renderComment(comment, listEl);
  }

  divEl.append(spanEl, buttonEl);

  articleEl.append(topSection, imageEl, divEl, listEl);

  renderCommentForm(image.id, articleEl);

  sectionEl.append(articleEl);
}

function render() {
  let sectionEl = document.querySelector<HTMLElement>(".image-container");
  if (sectionEl === null) return;
  sectionEl.textContent = "";

  for (let image of state.images) {
    renderImage(image, sectionEl);
  }
}

getImagesFromServer();

render();

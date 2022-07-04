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
  id: number;
  title: string;
  likes: number;
  image: string;
  comments: CommentData[];
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
    .then((images) => {
      state.images = images;
      render();
      console.log(images);
    });
}

function updateImage(image: Image) {
  return fetch(`http://localhost:5000/images/${image.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  }).then((resp) => resp.json());
}

// function addAComment() {
//   return fetch("http://localhost:5000/comments", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       imageId: state.images[0].id,
//       content: "",
//     }),
//   }).then((resp) => resp.json());
// }

// // rendering the images
function renderImages() {
  let sectionEl = document.querySelector<HTMLElement>(".image-container");
  if (sectionEl === null) return;
  sectionEl.textContent = "";

  let articleEl = document.createElement("article");
  articleEl.className = "image-card";
  // looping through the images and creating the cards
  for (let image of state.images) {
    let titleh2El = document.createElement("h2");
    titleh2El.className = "title";
    titleh2El.textContent = image.title;

    let imageEl = document.createElement("img");
    imageEl.className = "image";
    imageEl.src = image.image;

    let divEl = document.createElement("div");
    divEl.className = "likes-section";

    let spanEl = document.createElement("span");
    spanEl.className = "likes";
    spanEl.textContent = image.likes + " likes";

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
    for (let comment of image.comments) {
      let liEl = document.createElement("li");
      liEl.textContent = comment.content;
    //   let deleteButtonEl = document.createElement("button");
    //   deleteButtonEl.textContent = "X";
    //   liEl.appendChild(deleteButtonEl);
      listEl.append(liEl);
    }

    divEl.append(spanEl, buttonEl);

    let formEl = document.createElement("form");
    formEl.className = "comment-form";
    // formEl.addEventListener("submit", function (event) {
    //   event.preventDefault();
    //   addAComment();
    //   render();
    // });
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

    articleEl.append(titleh2El, imageEl, divEl, buttonEl, listEl, formEl);
  }
  //   <form class="comment-form">
  //   <input
  //     class="comment-input"
  //     type="text"
  //     name="comment"
  //     placeholder="Add a comment..."
  //   />
  //   <button class="comment-button" type="submit">Post</button>
  // </form>

  sectionEl.append(articleEl);
}

// rendering everything
function render() {
  renderImages();
}
render();
getImagesFromServer();

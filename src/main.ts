// solution goes here
// This is what a post looks like
// {
//   "id": 1,
//   "title": "Coder dog",
//   "likes": 7,
//   "image": "./assets/coder-dog.png",
//   "comments": [
//     {
//       "id": 1,
//       "content": "What a cute dog!",
//       "imageId": 1
//     },
//     {
//       "imageId": 1,
//       "content": "Funny dog!!",
//       "id": 4
//     },
//     {
//       "imageId": 1,
//       "content": "Hes a good boy!!",
//       "id": 5
//     }
//   ]
// }
type CommentData = {
  imageId: number;
  content: string
  id: number
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

let state: State = {
  images: [],
};
function getImagesFromServer() {
  fetch("http://localhost:5000/images")
    .then((resp) => resp.json())
    .then((images) => {
      state.images = images;
      render();
    });
}

function renderImages() {
  let sectionEl = document.querySelector(".image-container");
  if (sectionEl === null) return;
  sectionEl.textContent = "";
  let articleEl = document.createElement("article");
  articleEl.className = "image-card";
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
    let listEl = document.createElement("ul");
    listEl.className = "comments";
    let liEl = document.createElement("li");
    liEl.textContent = image.comments[0].content;
    let liEl2 = document.createElement("li");
    liEl2.textContent = image.comments[1].content;
    let liEl3 = document.createElement("li");
    // liEl3.textContent = image.comments[2].content;
    articleEl.append(titleh2El, imageEl, divEl, buttonEl, listEl);
    listEl.append(liEl, liEl2, liEl3);
    divEl.append(spanEl, buttonEl);
  }
  sectionEl.append(articleEl);

  //     <article class="image-card">
  //     <h2 class="title">Title of image goes here</h2>
  //     <img src="./assets/image-placeholder.jpg" class="image" />
  //     <div class="likes-section">
  //       <span class="likes">0 likes</span>
  //       <button class="like-button">♥</button>
  //     </div>
  //     <ul class="comments">
  //       <li>Get rid of these comments</li>
  //       <li>And replace them with the real ones</li>
  //       <li>From the server</li>
  //     </ul>
  //   </article>
}
function render() {
  // console.log('current state:', JSON.stringify(state, null, 2))
  renderImages();
}
render();
getImagesFromServer();

function postComment(){

  const input = document.getElementById("commentInput");
  const wrapper = document.getElementById("commentsWrapper");

  const text = input.value.trim();

  if(text === ""){
    if (window.UIVERSE_DEBUG) alert("Please write a comment first.");
    return;
  }

  const card = document.createElement("div");
  card.className = "comment-card";

  card.innerHTML = `

    <div class="comment-top">

      <div class="comment-profile">

        <img
          src="https://i.pravatar.cc/100?img=32"
          alt=""
        >

        <div>
          <h3>You</h3>
          <span>Just now</span>
        </div>

      </div>

      <button class="more-btn">
        ⋮
      </button>

    </div>

    <p class="comment-text">
      ${text}
    </p>

    <div class="comment-footer">

      <button onclick="likeComment(this)">
        ❤️ <span>0</span>
      </button>

      <button>
        💬 Reply
      </button>

      <button>
        🔗 Share
      </button>

    </div>

  `;

  wrapper.prepend(card);

  input.value = "";

}

function likeComment(button){

  const span = button.querySelector("span");

  let count = parseInt(span.innerText);

  count++;

  span.innerText = count;

}
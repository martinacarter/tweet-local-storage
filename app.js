let tweet = document.getElementById("tweet");
let tweetList = document.getElementById("tweets");

//add tweet
document.getElementById("tweetForm").addEventListener("submit", (e) => {
  addTweet(tweet.value);
  Storage.saveTweet(tweet.value);
  tweet.value = "";

  e.preventDefault();
});

document.getElementById("tweets").addEventListener("click", (e) => {
  if (e.target.id === "delete") {
    Storage.removeTweet(
      e.target.parentElement.parentElement.children[1].textContent
    );
    deleteTweet(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }
  e.preventDefault();
});

class Storage {
  static getTweets() {
    let tweets;
    if (localStorage.getItem("tweets") === null) {
      tweets = [];
    } else {
      tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweets;
  }

  static displayTweets() {
    const tweets = Storage.getTweets();
    tweets.forEach((tweet) => {
      addTweet(tweet);
    });
  }
  static saveTweet(tweet) {
    const tweets = Storage.getTweets();
    tweets.push(tweet);

    localStorage.setItem("tweets", JSON.stringify(tweets));
  }
  static removeTweet(tweetValue) {
    const tweets = Storage.getTweets();
    tweets.forEach((tweet, index) => {
      if (tweet === tweetValue) {
        tweets.splice(index, 1);
      }
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }
}
//dom load event
document.addEventListener("DOMContentLoaded", Storage.displayTweets);

function addTweet(tweet) {
  let tweetItem = document.createElement("li");
  tweetItem.className = "list-group-item";
  tweetItem.innerHTML = `
    <div class="row">
      <div class="col-2">
        <img src="https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=3ef46b07bb19f68322d027cb8f9ac99f" alt="profile-pic" style="border-radius: 50px;">
      </div>
      <div class="col-10">
        <p><b>Andrew</b> @andrewnotjackson 1s <i class="bi bi-trash float-right" id="delete"></i></p>
        <p>${tweet}</p>
        <span><i class="bi bi-chat mr-5"></i><i class="bi bi-heart mx-5"></i><i class="bi bi-upload mx-5"></i></span>
      </div>
    </div>`;
  tweetList.prepend(tweetItem);
}

function deleteTweet(tweetListItem) {
  tweetListItem.remove();
}

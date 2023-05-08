window.addEventListener("DOMContentLoaded", () => {
    let count = 0
    const counter = document.querySelector("#counter")
    const decrement = document.querySelector("#minus")
    const increment = document.querySelector("#plus")
    const heart = document.querySelector("#heart")
    const likes = document.querySelector(".likes")
    const pauseButton = document.querySelector("#pause")
    const submitButton = document.querySelector("#submit")
    const input = document.querySelector("#comment-input")
    const comments = document.querySelector(".comments")
    const buttons = [decrement, increment, heart, submitButton]

    decrement.addEventListener("click", thatDecrement)
    increment.addEventListener("click", thatIncrement)
    heart.addEventListener("click", thatLike)
    pauseButton.addEventListener("click", thatPause)
    submitButton.addEventListener("click", thatSubmit)

    function thatCount() {
        count = count + 1
        counter.innerText = count
    }
    let interval = setInterval(thatCount, 1000)

    function thatDecrement() {
        count = count - 1
        counter.innerText = count
    }

    function thatIncrement() {
        count = count + 1
        counter.innerText = count
    }

    function thatLike() {
        const currentCount = parseInt(counter.innerText);
        const existingLi = document.querySelector(`#like-${currentCount}`);
        let likeCount = 1
        if (existingLi) {
            likeCount = parseInt(existingLi.dataset.likeCount) + 1;
            existingLi.dataset.likeCount = likeCount;
            existingLi.innerHTML = `${currentCount} has been liked ${likeCount} times`;
        } else {
            const liked = document.createElement("li");
            liked.id = `like-${currentCount}`;
            liked.dataset.likeCount = 1;
            liked.innerHTML = `${currentCount} has been liked ${likeCount} time`;
            likes.appendChild(liked);
        }
    }

    function thatPause() {
        let isRunning;
        if (pauseButton.innerText === "pause") {
            clearInterval(interval)
            pauseButton.innerText = "restart"
            for (let button of buttons) {
                button.setAttribute("disabled", "disabled")
            }
            isRunning = false
        } else if (pauseButton.innerText === "restart") {
            count = 0
            counter.innerText = count
            pauseButton.innerText = "pause"
            for (let button of buttons) {
                button.removeAttribute("disabled", "disabled")
            }
            if (!isRunning) {
                interval = setInterval(thatCount, 1000)
                isRunning = true
            }
        }
    }

    function thatSubmit(e) {
        e.preventDefault()
        if (input.value.trim() !== "") {
            let comment = document.createElement("p")
            comment.innerText = input.value
            comments.appendChild(comment)
        }
    }

});

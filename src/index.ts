const data = {
    "currentUser": {
        "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [
        {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "user": {
                "image": {
                    "png": "./images/avatars/image-amyrobson.png",
                    "webp": "./images/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
            },
            "replies": []
        },
        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-ramsesmiron.png",
                            "webp": "./images/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-juliusomo.png",
                            "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        },
        {
            "id": 5,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 6,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-ramsesmiron.png",
                            "webp": "./images/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 7,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-juliusomo.png",
                            "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        }
    ]
}


const templates = {
    "comment_container": document.getElementById("comment_container"),
    "reply_container": document.getElementById("reply_container"),
    "vote_container": document.getElementById("vote_container"),
    "comment_box": document.getElementById("comment_box"),
    "main_comment_input": document.getElementById("main_comment_input"),
    "main_comment_reply_input": document.getElementById("main_comment_reply_input"),
    "reply_to_reply_comment": document.getElementById("reply_to_reply_comment"),
    "update_reply_comment": document.getElementById("reply_to_reply_comment"),
    "modal": document.getElementById("modal"),
    "reply_box": document.getElementById("reply_box"),
    "container": document.querySelector(".container")

}





function create_level_one_Comments(comment) {

    let comment_container = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
    let vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    let comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");

    vote_container.querySelector(".votes").textContent = comment.score
    comment_container.appendChild(vote_container)

    comment_box.querySelector(".profile_pic").src = comment.user.image.png
    comment_box.querySelector(".user_name").textContent = comment.user.username
    comment_box.querySelector(".post_date").textContent = comment.createdAt
    comment_box.querySelector(".comment").textContent = comment.content


    comment_container.appendChild(vote_container)
    comment_container.appendChild(comment_box)

    comment_container.id = comment.id
    comment_container = container_level_eventListener(comment_container)

    templates.container.appendChild(comment_container)


    // Checks if comment has replied, yes then clones template and appends to DOM for each reply.
    // container --> comment_container --> reply_container --> reply_box , reply_box ....

    if (comment.replies) {


        let reply_container = templates.reply_container.content.cloneNode(true).querySelector(".reply_container");

        comment.replies.map((element) => {


            let reply_box = templates.reply_box.content.cloneNode(true).querySelector(".reply_box");

            [vote_container, comment_box] = create_level_two_comments(element)
            reply_box.appendChild(vote_container)
            reply_box.appendChild(comment_box)

            reply_box.id = element.id

            reply_box = container_level_eventListener(reply_box)
            reply_container.querySelector(".reply_column").appendChild(reply_box)


        });

        templates.container.appendChild(reply_container)


    }



}


function create_level_two_comments(reply) {

    let vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    let comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");

    vote_container.querySelector(".votes").textContent = reply.score

    comment_box.querySelector(".profile_pic").src = reply.user.image.png
    comment_box.querySelector(".user_name").textContent = reply.user.username
    comment_box.querySelector(".post_date").textContent = reply.createdAt
    comment_box.querySelector(".comment").textContent = reply.content

    return [vote_container, comment_box]

}


// Loops through each comment and for each reply constructs DOM.

data.comments.map(create_level_one_Comments);




function container_level_eventListener(container) {

    container.addEventListener("click", (event) => {


        if (event.currentTarget.className == "reply_box") {

            let main_comment_id = parseInt(event.currentTarget.closest(".reply_container").previousSibling.id);
            let reply_id = parseInt(event.currentTarget.id);

            let main_comment_index = data.comments.findIndex(ele => ele.id == main_comment_id)
            console.log(main_comment_index)
            if (data.comments[main_comment_index].replies) {

                let reply_comment_index = data.comments[main_comment_index].replies.findIndex(ele => ele.id == reply_id);
                console.log(reply_comment_index)

                console.log(data.comments[main_comment_index].replies[reply_comment_index])


                data.comments[main_comment_index].replies[reply_comment_index].score += 1;




            }


        }
        else if (event.currentTarget.className == "comment_container") {
            console.log(event.currentTarget.id)
        }

    }, true)

    return container

}

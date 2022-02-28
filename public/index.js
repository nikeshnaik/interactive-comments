var data = {
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
        }
    ]
};
var templates = {
    "comment_container": document.getElementById("comment_container"),
    "reply_container": document.getElementById("reply_container"),
    "vote_container": document.getElementById("vote_container"),
    "comment_box": document.getElementById("comment_box"),
    "main_comment_input": document.getElementById("main_comment_input"),
    "main_comment_reply_input": document.getElementById("main_comment_reply_input"),
    "reply_to_reply_comment": document.getElementById("reply_to_reply_comment"),
    "update_reply_comment": document.getElementById("reply_to_reply_comment"),
    "modal": document.getElementById("modal"),
    "container": document.getElementsByClassName("container")
};
// window.onload = function () {
//     let comment_container_first_child = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
//     let main_comment_input = templates.main_comment_input.content.cloneNode(true).querySelector(".input_reply_container");
//     main_comment_input.getElementsByTagName("img")[0].src = "./images/avatars/image-amyrobson.png"
//     main_comment_input.getElementsByTagName("textarea")[0].value = ""
//     // main_comment_input.getElementsByTagName("a")[0].addEventListener('click', () => {
//     // console.log("kasjhdkfh")
//     // })
//     comment_container_first_child.appendChild(main_comment_input)
//     templates.container[0].appendChild(comment_container_first_child)
// }
// parent -> main, reply -> child of parent
function CurrentUser(type) {
    if (type === void 0) { type = "parent"; }
    var reply = "";
    if (type == "parent") {
        var comment_container = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
        var main_comment_input = templates.main_comment_input.content.cloneNode(true).querySelector(".input_reply_container");
        main_comment_input.getElementsByTagName("img")[0].src = data.currentUser.image.png;
        main_comment_input.getElementsByTagName("textarea")[0].value = "";
        comment_container.appendChild(main_comment_input);
        templates.container[0].appendChild(comment_container);
    }
    else if (type == "child") {
        var reply_container = templates.reply_container.content.cloneNode(true).querySelector(".reply_container");
        var main_comment_reply_input = templates.main_comment_reply_input.content.cloneNode(true).querySelector(".input_reply_container");
        main_comment_reply_input.getElementsByTagName("img")[0].src = data.currentUser.image.png;
        main_comment_reply_input.getElementsByTagName("textarea")[0].value = "";
        reply_container.getElementsByClassName("reply_box")[0].appendChild(main_comment_reply_input);
        templates.container[0].appendChild(reply_container);
    }
}
function checkIf_reply_exist() {
}
CurrentUser("parent");
CurrentUser("child");
CurrentUser("child");

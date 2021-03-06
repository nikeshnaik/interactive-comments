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
};
var templates = {
    "comment_container": document.getElementById("comment_container"),
    "reply_container": document.getElementById("reply_container"),
    "vote_container": document.getElementById("vote_container"),
    "comment_box": document.getElementById("comment_box"),
    "main_comment_input": document.getElementById("main_comment_input"),
    "main_comment_reply_input": document.getElementById("main_comment_reply_input"),
    "replyingToSpan": document.getElementById("replyingToSpan"),
    "reply_to_reply_comment": document.getElementById("reply_to_reply_comment"),
    "update_reply_comment": document.getElementById("reply_to_reply_comment"),
    "modal": document.querySelector("#modal"),
    "reply_box": document.getElementById("reply_box"),
    "container": document.querySelector(".container"),
    "update_comment_button": document.getElementById("update_comment_template"),
    "update_reply_comment_edit": document.getElementById("update_reply_comment")
};
var delete_main_comment_id = null;
var delete_reply_id = null;
function create_level_one_Comments(comment) {
    var comment_container = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
    var vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    var comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");
    vote_container.querySelector(".votes").textContent = comment.score;
    comment_container.appendChild(vote_container);
    comment_box.querySelector(".profile_pic").src = comment.user.image.png;
    comment_box.querySelector(".user_name").textContent = comment.user.username;
    comment_box.querySelector(".post_date").textContent = comment.createdAt;
    comment_box.querySelector(".comment").textContent = comment.content;
    if (comment.user.username == data.currentUser.username) {
        comment_box.querySelector(".self-indicator").style.display = 'block';
    }
    comment_container.appendChild(vote_container);
    comment_container.appendChild(comment_box);
    comment_container.id = comment.id;
    comment_container = container_level_eventListener(comment_container);
    templates.container.appendChild(comment_container);
    // Checks if comment has replied, yes then clones template and appends to DOM for each reply.
    // container --> comment_container --> reply_container --> reply_box , reply_box ....
    if (comment.replies.length > 0) {
        var reply_container_1 = templates.reply_container.content.cloneNode(true).querySelector(".reply_container");
        comment.replies.map(function (element) {
            var _a;
            var reply_box = templates.reply_box.content.cloneNode(true).querySelector(".reply_box");
            _a = create_level_two_comments(element), vote_container = _a[0], comment_box = _a[1];
            reply_box.appendChild(vote_container);
            reply_box.appendChild(comment_box);
            reply_box.id = element.id;
            reply_box = container_level_eventListener(reply_box);
            reply_container_1.querySelector(".reply_column").appendChild(reply_box);
        });
        templates.container.appendChild(reply_container_1);
    }
}
function create_level_two_comments(reply) {
    var vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    var comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");
    vote_container.querySelector(".votes").textContent = reply.score;
    comment_box.querySelector(".profile_pic").src = reply.user.image.png;
    comment_box.querySelector(".user_name").textContent = reply.user.username;
    comment_box.querySelector(".post_date").textContent = reply.createdAt;
    comment_box.querySelector(".comment").textContent = reply.content;
    if (reply.user.username == data.currentUser.username) {
        comment_box.querySelector(".self-indicator").style.display = 'block';
    }
    return [vote_container, comment_box];
}
// Loops through each comment and for each reply constructs DOM.
function container_level_eventListener(container) {
    container.addEventListener("click", function (event) {
        if (event.currentTarget.className == "reply_box") {
            //  Get Main Commnent ID and Reply ID by bubbling up event from DOM
            var main_comment_id_1 = parseInt(event.currentTarget.closest(".reply_container").previousSibling.id);
            var reply_id_1 = parseInt(event.currentTarget.id);
            // Find main comment index of that object in data JSON
            var main_comment_index = data.comments.findIndex(function (ele) { return ele.id == main_comment_id_1; });
            if (data.comments[main_comment_index].replies) {
                // Find reply comment index of that object in data JSON
                var reply_comment_index = data.comments[main_comment_index].replies.findIndex(function (ele) { return ele.id == reply_id_1; });
                // Since Upvote div --> Votes Number -->  Downvote div are all in sequence, we can use below logic
                // if upvote, get its next nextsibling and update data and assign update vote to element
                if (event.target.className == "upvote") {
                    data.comments[main_comment_index].replies[reply_comment_index].score += 1;
                    event.target.nextElementSibling.textContent = data.comments[main_comment_index].replies[reply_comment_index].score;
                }
                // if downvote, get its next previousSibling and update data and assign update vote to element
                else if (event.target.className == "downvote") {
                    data.comments[main_comment_index].replies[reply_comment_index].score -= 1;
                    event.target.previousElementSibling.textContent = data.comments[main_comment_index].replies[reply_comment_index].score;
                }
                else if (event.target.className == "input_button") {
                    var replingyToUser = event.currentTarget.querySelector(".comment_input").firstElementChild;
                    var incoming_comment = event.currentTarget.querySelector(".comment_input").lastElementChild;
                    var reply_box = Replace_input_with_reply_box(replingyToUser, incoming_comment);
                    // persist the change in Data
                    var reply_column = event.currentTarget.parentElement;
                    reply_column.replaceChild(reply_box, event.currentTarget);
                    var replyingTo = reply_column.parentElement.previousElementSibling.querySelector(".user_name").textContent;
                    var main_comment_id_2 = reply_box.closest(".reply_container").previousElementSibling.id;
                    var main_comment_index_1 = data.comments.findIndex(function (ele) { return ele.id == main_comment_id_2; });
                    var reply_object = {
                        "id": reply_box.id,
                        "content": replingyToUser.textContent + " " + incoming_comment.textContent,
                        "createdAt": "Today",
                        "score": 0,
                        "replyingTo": replyingTo,
                        // need to update with reply username
                        "user": {
                            "image": {
                                "png": data.currentUser.image.png,
                                "webp": data.currentUser.image.webp
                            },
                            "username": data.currentUser.username
                        }
                    };
                    data.comments[main_comment_index_1].replies.push(reply_object);
                }
                else if (event.target.parentElement.className == "reply_btn") {
                    // Get existing reply_container
                    var existing_reply_container = event.currentTarget.parentElement.parentElement;
                    var replyingTo = "asdfasd";
                    // clone input reply box
                    var input_reply_box = addReply_container(replyingTo);
                    // get sibling of clicked reply button
                    var next_sibling = event.currentTarget.nextSibling;
                    // insert before it
                    existing_reply_container.querySelector(".reply_column").insertBefore(input_reply_box, next_sibling);
                }
                else if (event.target.className == "comment_input") {
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(event.target.childNodes[2], 0);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(event.target.childNodes[2]);
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(event.target.childNodes[2], 0);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                else if (event.target.parentElement.className == "edit_btn") {
                    var old_replingTo = event.currentTarget.querySelector(".replyingToUser");
                    var old_incoming_comment = event.currentTarget.querySelector(".incoming_comment");
                    var comment_text = event.currentTarget.querySelector(".comment_text");
                    edit_button(comment_text, old_incoming_comment, old_replingTo);
                }
                else if (event.target.parentElement.className == "delete_btn") {
                    document.getElementsByClassName("modal_container")[0].style.display = "flex";
                    delete_main_comment_id = event.currentTarget.parentElement.closest(".reply_container").previousElementSibling;
                    delete_reply_id = event.currentTarget.id;
                }
            }
        }
        else if (event.currentTarget.className == "comment_container") {
            var main_comment_id_3 = event.currentTarget.id;
            var main_comment_index = data.comments.findIndex(function (ele) { return ele.id == main_comment_id_3; });
            // Since Upvote div --> Votes Number -->  Downvote div are all in sequence, we can use below logic
            // if upvote, get its next nextsibling and update data and assign update vote to element
            if (event.target.className == "upvote") {
                data.comments[main_comment_index].score += 1;
                event.target.nextElementSibling.textContent = data.comments[main_comment_index].score;
            }
            // if downvote, get its next previousSibling and update data and assign update vote to element
            else if (event.target.className == "downvote") {
                data.comments[main_comment_index].score -= 1;
                event.target.previousElementSibling.textContent = data.comments[main_comment_index].score;
            }
            else if (event.target.parentElement.className == "reply_btn") {
                // Get existing reply_container
                var existing_reply_container = event.currentTarget.nextSibling;
                var reply_container = templates.reply_container.content.cloneNode(true).querySelector(".reply_container");
                // Get replying To username
                var replyingTo = event.currentTarget.querySelector(".user_name").textContent;
                // build input reply container and appened to existing reply_container or clone new one
                var input_reply_box = addReply_container(replyingTo);
                var next_sibling = event.currentTarget.nextSibling;
                if (existing_reply_container.className == "reply_container") {
                    reply_container = existing_reply_container;
                }
                reply_container.querySelector(".reply_column").appendChild(input_reply_box);
                // Insert before new comment
                templates.container.insertBefore(reply_container, next_sibling);
            }
            else if (event.target.id == "update_button") {
                console.log(event.target);
                console.log(event.currentTarget);
                var new_comment = event.currentTarget.querySelector(".comment").textContent;
                console.log(new_comment);
                Replace_input_with_comment_box(new_comment, true);
            }
            else if (event.target.className == "input_button") {
                var new_comment = event.currentTarget.querySelector(".comment_input").textContent;
                Replace_input_with_comment_box(new_comment);
            }
            else if (event.target.parentElement.className == "edit_btn") {
                var old_comment = event.currentTarget.querySelector(".comment");
                var comment_text = event.currentTarget.querySelector(".comment_text");
                edit_button(comment_text, old_comment, "");
            }
            else if (event.target.parentElement.className == "delete_btn") {
                document.getElementsByClassName("modal_container")[0].style.display = "flex";
                delete_main_comment_id = event.currentTarget;
            }
        }
    }, true);
    return container;
}
function Replace_input_with_reply_box(replyingToUser, incoming_comment) {
    // Reply Box replace
    var reply_box = templates.reply_box.content.cloneNode(true).querySelector(".reply_box");
    var vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    var comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");
    var update_comment_btns = templates.update_comment_button.content.cloneNode(true).querySelector(".update_comment");
    // replce old reply butn with reply update div
    var comment_nav = comment_box.querySelector(".comment_nav");
    var reply_btn = comment_nav.querySelector(".reply_btn");
    comment_nav.replaceChild(update_comment_btns, reply_btn);
    // end
    incoming_comment.contentEditable = false;
    vote_container.querySelector(".votes").textContent = 0;
    comment_box.querySelector(".profile_pic").src = data.currentUser.image.png;
    comment_box.querySelector(".user_name").textContent = data.currentUser.username;
    comment_box.querySelector(".post_date").textContent = "Today";
    comment_box.querySelector(".comment").appendChild(replyingToUser);
    comment_box.querySelector(".comment").appendChild(incoming_comment);
    comment_box.querySelector(".self-indicator").style.display = 'block';
    reply_box.appendChild(vote_container);
    reply_box.appendChild(comment_box);
    reply_ids += 1;
    reply_box.id = reply_ids;
    reply_box = container_level_eventListener(reply_box);
    return reply_box;
}
function addReply_container(replyingTo) {
    var input_reply_level_one = templates.main_comment_reply_input.content.cloneNode(true).querySelector(".input_reply_container");
    // let reply_container = templates.reply_container.content.cloneNode(true).querySelector(".reply_container");
    var reply_box = templates.reply_box.content.cloneNode(true).querySelector(".reply_box");
    var replingyToUser = templates.replyingToSpan.content.cloneNode(true).querySelector(".replyingToUser");
    replingyToUser.textContent = "@".concat(replyingTo);
    replingyToUser.contentEditable = false;
    var comment_text = templates.replyingToSpan.content.cloneNode(true).querySelector(".incoming_comment");
    comment_text.textContent = " ";
    comment_text.contentEditable = true;
    input_reply_level_one.querySelector("img").src = data.currentUser.image.png;
    input_reply_level_one.querySelector(".comment_input").appendChild(replingyToUser);
    input_reply_level_one.querySelector(".comment_input").appendChild(comment_text);
    input_reply_level_one.querySelector(".comment_input").setAttribute("data-username", replyingTo);
    reply_box.appendChild(input_reply_level_one);
    reply_ids += 1;
    reply_box.id = reply_ids;
    reply_box = container_level_eventListener(reply_box);
    return reply_box;
}
var reply_ids = 10;
data.comments.map(create_level_one_Comments);
starting_input_box();
document.getElementsByClassName("modal_container")[0].style.display = "none";
var delete_id = null;
function starting_input_box() {
    var comment_container = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
    //     <div class="input_reply_container">
    //     <img src="images/avatars/image-maxblagun.png" alt="profile_pic">
    //     <div contenteditable="true" class="comment_input">
    //     </div>
    //     <a href="#" class="input_button">Send</a>
    //   </div>
    var main_comment_input = templates.main_comment_input.content.cloneNode(true).querySelector(".input_reply_container");
    main_comment_input.querySelector("img").src = data.currentUser.image.png;
    comment_container.appendChild(main_comment_input);
    comment_container = container_level_eventListener(comment_container);
    templates.container.appendChild(comment_container);
}
function Replace_input_with_comment_box(new_comment, update) {
    if (new_comment === void 0) { new_comment = ""; }
    if (update === void 0) { update = false; }
    var comment_container = templates.comment_container.content.cloneNode(true).querySelector(".comment_container");
    var vote_container = templates.vote_container.content.cloneNode(true).querySelector(".vote_container");
    var comment_box = templates.comment_box.content.cloneNode(true).querySelector(".comment_box");
    reply_ids = reply_ids + 1;
    var main_comment = {
        "id": reply_ids,
        "content": new_comment,
        "createdAt": "Today",
        "score": 0,
        "user": {
            "image": {
                "png": data.currentUser.image.png,
                "webp": data.currentUser.image.webp
            },
            "username": data.currentUser.username
        },
        "replies": []
    };
    data.comments.push(main_comment);
    vote_container.querySelector(".votes").textContent = 0;
    comment_container.appendChild(vote_container);
    comment_box.querySelector(".profile_pic").src = data.currentUser.image.png;
    comment_box.querySelector(".user_name").textContent = data.currentUser.username;
    comment_box.querySelector(".post_date").textContent = "Today";
    comment_box.querySelector(".comment").textContent = new_comment;
    comment_box.querySelector(".self-indicator").style.display = 'block';
    comment_container.appendChild(vote_container);
    comment_container.appendChild(comment_box);
    var update_comment_btns = templates.update_comment_button.content.cloneNode(true).querySelector(".update_comment");
    // replce old reply butn with reply update div
    var comment_nav = comment_box.querySelector(".comment_nav");
    var reply_btn = comment_nav.querySelector(".reply_btn");
    comment_nav.replaceChild(update_comment_btns, reply_btn);
    comment_container.id = reply_ids;
    comment_container = container_level_eventListener(comment_container);
    if (update) {
        var penultimate_element = templates.container.lastElementChild.previousElementSibling;
        templates.container.replaceChild(comment_container, penultimate_element);
    }
    var last_element = templates.container.lastElementChild;
    templates.container.replaceChild(comment_container, last_element);
    starting_input_box();
}
function edit_button(comment_text, old_incoming_comment, old_replingTo) {
    var new_comment_text = templates.update_reply_comment_edit.content.cloneNode(true).querySelector(".comment_text");
    old_incoming_comment.contentEditable = true;
    old_replingTo.contentEditable = true;
    if (old_replingTo !== "") {
        new_comment_text.querySelector(".comment_input").appendChild(old_replingTo);
    }
    new_comment_text.querySelector(".comment_input").appendChild(old_incoming_comment);
    var parent_comment_text = comment_text.parentElement;
    parent_comment_text.replaceChild(new_comment_text, comment_text);
}
document.getElementsByTagName("body")[0].addEventListener("click", function (event) {
    if (event.target.id == "delete_button") {
        var main_comment_index = data.comments.findIndex(function (ele) { return ele.id == delete_main_comment_id.id; });
        var reply_id = data.comments.findIndex(function (ele) { return ele.id == delete_reply_id; });
        if (reply_id > 0) {
            data.comments[main_comment_index].replies.splice(reply_id, 1);
            var reply_box = document.getElementById(delete_reply_id).parentElement;
            reply_box.removeChild(document.getElementById(delete_reply_id));
        }
        else {
            data.comments.splice(main_comment_index, 1);
            var comment_box = document.getElementById(delete_main_comment_id.id);
            comment_box.parentElement.removeChild(comment_box);
        }
        document.getElementsByClassName("modal_container")[0].style.display = "none";
    }
    else if (event.target.id == "cancel") {
        document.getElementsByClassName("modal_container")[0].style.display = "none";
    }
});
//
// Todo
// 1. Change replyTo with reply username, this [Done]
// 1.5 add You to currentUser [Done]
// 2. Continue adding new templates in any order
//3. It seems we need to change comment_text logic from ground up, add eventlistener as you type to add elements. [Done with Range]

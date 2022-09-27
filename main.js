function saveBookmarkSourcePreference(link) {
    chrome.storage.local.set({"bookmarks-source-preference": link}, function () {
        console.log("updated source preference to " + link)
        $('#sync-status').text("saved new source")
    });
}

function getBookmarkSourcePreference(callback) {
    chrome.storage.local.get(["bookmarks-source-preference"], function (result) {
        callback(result["bookmarks-source-preference"])
    });
}

$('#btn-save').click(function () {
    const url = $('#pastebin-link').val()

    saveBookmarkSourcePreference(url)
})

// create an array of bookmarks at the id of nodeId
function createBookmarks(nodeId, bookmarks, success) {
    for (let j = 0; j < bookmarks.length; j++) {
        chrome.bookmarks.create({
            'parentId': nodeId,
            'title': bookmarks[j].title,
            'url': bookmarks[j].url,
        }, (bookmark) => {
            console.log("created", bookmark.title)
        })
    }

    success()
}

function recreateContainerFolder(node, bookmarks, success) {
    const nodes = node.children

    for (let i = 0; i < nodes.length; i++) {
        chrome.bookmarks.remove(nodes[i].id, () => {
            console.log("deleted", nodes[i].title)
        })
    }

    createBookmarks(node.id, bookmarks, success)
}

$('#btn-sync').click(function () {
    getBookmarkSourcePreference((link) => {
        chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            const nodes = bookmarkTreeNodes[0].children
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === "1") {
                    fetch(link, {cache: "no-store"}).then((res) => {
                        res.json().then((bookmarks) => {
                            recreateContainerFolder(nodes[i], bookmarks, () => {
                                $('#sync-status').text("updated bookmarks")
                            })
                        })
                    }).catch((err) => {
                        $('#sync-status').text("error syncing bookmarks")
                    })

                    break
                }
            }
        });

    })
});

function init() {
    // fetch preferences
    getBookmarkSourcePreference((link) => {
        $('#pastebin-link').val(link)
    })
}

document.addEventListener('DOMContentLoaded', function () {
    init()
});

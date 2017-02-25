document.addEventListener("DOMContentLoaded", function() {

    chrome.bookmarks.getTree(function(tree) {

        var rootNode = tree[0];
        sortFolder(rootNode);
    });

});



function sortFolder(parent) {
    var children = parent.children;

    if (children) {
        children = children.sort(function(a, b) {
            var atitle = a.title;
            var btitle = b.title;
            if (atitle < btitle) {
                return 1;
            }
            if (atitle > btitle) {
                return -1;
            }

            return 0;
        });

        children.forEach(function(ch, index) {
            ch.index = index;
        });
        children.forEach(function(c) {
            sortFolder(c);
        });


    }
}

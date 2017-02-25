chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.bookmarks.getTree(function(tree) {

        var rootNode = tree[0];
        sortFolder(rootNode);
    });

    function sortFolder(parent) {
        var children = parent.children;
        if (children) {
            //如果children存在，则parent是文件夹
            children.forEach(function(c) {
                //递归，对每一个子节点进行排序
                sortFolder(c);
            });

            //子节点内部排序完毕，对children进行排序
            children = children.sort(function(a, b) {
                var atitle = a.title;
                var btitle = b.title;
                var aIsFolder = a.children ? true : false;
                var bIsFolder = b.children ? true : false;

                //需要保证文件夹在文件的前面

                //如果a是文件夹，b不是文件夹，-1表示不变动
                if (aIsFolder && !bIsFolder) {
                    return -1;
                }
                //如果a不是文件夹，b是文件夹，1表示需要交换
                if (!aIsFolder && bIsFolder) {
                    return 1;
                }
                //ab都是文件夹或者都不是文件夹
                //比较title
                if (atitle < btitle) {
                    return -1;
                }
                if (atitle > btitle) {
                    return 1;
                }
                return 0;
            });

            //根节点的id是0
            //根节点的三个子节点是Bookmark Bar, Other Bookmarks, Mobile Bookmarks
            //根节点的这三个文件夹顺序不可以修改，需要跳过
            if (parent.id > 0) {
                children.forEach(function(ch, index) {
                    // console.log(ch.id, index);
                    chrome.bookmarks.move(ch.id, { 'index': index });
                });
            }

        } //if children exists
    } //sortFolder

});

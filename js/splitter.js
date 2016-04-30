$(function () 
{

    var splitterClassObj = ['.resizable1', '.resizable2', '.resizable3', '.resizable4'];

    for (var i=0; i<splitterClassObj.length; i++) {
        //condition for set resizable event from first to second last
        if (i < splitterClassObj.length - 1) {
            setResizable(splitterClassObj[i]);
        }

        //condition for set resizable max from first to second last
        if (i === splitterClassObj.length - 1) {
            setResizableMax();
        }
    }
});

/** function for set resizable event
 */
function setResizable(obj) {
    $(obj).resizable(
    {
        autoHide: true,
        handles: 'e',
        minWidth: '10',
        //maxWidth: '750',
        helper: "ui-resizable-helper",
        grid: [5,5],
        resize: function(e, ui) {
            //..
        },
        stop: function(e, ui) {
            var parent = ui.element.parent();

            var remainingSpace = parent[0].getBoundingClientRect().width - ui.element[0].getBoundingClientRect().width,
                currentWidthDiff = ui.size.width - ui.originalSize.width,
                divTwo = ui.element.next(),
                divTwoOrgWidth = divTwo[0].getBoundingClientRect().width,
                divTwoWidth = divTwoOrgWidth - currentWidthDiff;

                divTwo.width(divTwoWidth);

            setResizableMax(); //set max width dynamically after stop
        }
    });
}

/** function for set resizable max dynamically
 */
function setResizableMax() {
    var splitterClassObj = ['.resizable1', '.resizable2', '.resizable3', '.resizable4'],
        nextWidth = 0,
        max = 0,
        rightPadding = 10; // this rightPadding will be same as resizable minWidth

    for (var i=0; i<splitterClassObj.length; i++) {
        if (i < splitterClassObj.length - 1) {
            nextWidth = $(splitterClassObj[i]).next('.resizable').outerWidth();
            max = $(splitterClassObj[i]).outerWidth() + nextWidth - rightPadding;
            $(splitterClassObj[i]).resizable( "option", "maxWidth", max );
        }
    }
}
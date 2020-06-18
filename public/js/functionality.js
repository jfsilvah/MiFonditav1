$(document).ready(function () {

    $(".imgMenu").mouseenter(function(){
        var img=($(this).attr("data-foodId"))
        $(`.foodName[data-foodId="${img}"]`).css("color","black");
    }).mouseleave(function(){
        var img=($(this).attr("data-foodId"))
        $(`.foodName[data-foodId="${img}"]`).css("color","white");
    });
});
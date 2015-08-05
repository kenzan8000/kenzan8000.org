$(function(){
    // scroll
    $('.scroll-top').click(function() { $("html, body").animate({ scrollTop: 0 }, 200); });
    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $('[name="'+this.hash.substring(1)+'"]').offset().top }, 200);
    });
    // fun-project's overlay
    $(".fun-project").each(function() {
        var funProject = $(this);
        var body = funProject.find(".fun-project-body");
        var offsetX = funProject.width() * 0.2;
        body.css("padding-left", offsetX+"px");
        body.css("padding-right", offsetX+"px");
        var offsetY = (funProject.height() - body.find("div").height()) / 2;
        body.css("padding-top", offsetY+"px");
        body.css("padding-bottom", offsetY+"px");
    });
});

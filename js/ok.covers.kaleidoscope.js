var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.clear();
    crayon.style("default");

    crayon.fill("#27D1E7").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var author = OK.Covers.Utils.formatAuthorName(book.author.toUpperCase());

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + authorFontSize;
    var titleWidth = crayon.canvas.width * 0.8;

    var titleSections = OK.Covers.Utils.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    crayon.style("drawing");
    crayon.clip(function(context) {
      context.beginPath();
      context.rect(0, 0, 100, crayon.canvas.height);
      context.clip();
    })
    crayon.stroke("#FF0000", 50).fill(false).circle(crayon.canvas.width/2, crayon.canvas.height/2, crayon.canvas.width/2 - 25);

    crayon.save();
    crayon.translate(titleX, titleY);
    crayon.style("text");
    crayon.font("Arial", titleFontSize, "bold").fill("#FFFFFF").paragraph("left", 0.25, titleWidth, true).text(title.toUpperCase());
    crayon.font("Arial", titleFontSize*0.85, "normal").fill("#FFFFFF").paragraph("left", 0.25, titleWidth, true).text(subTitle.toUpperCase(), 0, titleFontSize/4);
    crayon.font("Arial", authorFontSize).fill("#222222").paragraph("left", 0.25, titleWidth, true).text(author, 0, authorFontSize/2);
    crayon.restore();

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Kaleidoscope",
    makeCover : makeCover
  };
})());

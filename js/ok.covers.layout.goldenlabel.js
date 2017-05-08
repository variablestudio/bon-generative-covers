var OK = OK || {};
var child_colour = "hsl(100, 50%, 50%)";

OK.Covers = OK.Covers || [];

OK.Covers.push((function () {
    var crayon;
    
    var style = {
        mainColor: "#FFFFFF"
    };

    function makeCover(book) {
        if (!crayon) {
            crayon = new Crayon(document.getElementById("cover"));
        }

        crayon.clear();
        crayon.style("default");
     
        crayon.fill("#FAFAF0").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

        style.mainColor = "#DEDEDE";
        var pattern = Math.round(Math.random()*5);
        switch(pattern)
        {
        //Pattern selector
        case 0:
        OK.Covers.Patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style);
        break;
        case 1:
        OK.Covers.Patterns.MarcinTiles(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, 32, 128, style);
        break;
        case 2:
        OK.Covers.Patterns.MarcinLines(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style);
        break;
        case 3:
        OK.Covers.Patterns.FractalTree(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, book.pageCount, style);
        break;
        case 4:
        OK.Covers.Patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style);
        break;
        case 5:
        var rand_mode = Math.round(Math.random()*2);
        var rand_cols = 5 + Math.round(Math.random()*7);  
        var rand_rows = rand_cols + 4;
        var cluster_size = (crayon.canvas.width)/rand_cols;
        var posx = 0;
        var posy = 0;//crayon.canvas.height - 50 - rand_rows*cluster_size;
        OK.Covers.Patterns.PixelGrid(crayon.context, posx, posy, rand_cols, rand_rows, cluster_size, rand_mode, style);
        break;
        }
        crayon.context.fillStyle = style.mainColor;
        crayon.context.fillRect(0, 258, 268, crayon.canvas.height - 268 - 50);
        
        
        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.06;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        var titleX = crayon.canvas.width * 0.07;
        var titleY = 268  + titleFontSize;
        var titleWidth = 258 * 0.70;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];

        title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
        
        crayon.translate(titleX, titleY);
    
        
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#000000").paragraph("left", 2.5, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
   
        
        crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill("#FFFFFF").paragraph("left", fonts.titleLine, titleWidth, true).text(title);
        crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill("#FFFFFF").paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);
  
        console.log(fonts.titleFamily);
        //crayon.context.font = "normal " + authorFontSize + "px BenchNine";
        //var randAuthor = Math.round(Math.random());
        
        
        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "GoldenLabel",
        makeCover: makeCover
    };
})());
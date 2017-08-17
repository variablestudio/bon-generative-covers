const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const patterns = require('./patterns')

var crayon
var style = {
  mainColor: '#FFFFFF'
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

    // crayon.fill('#FF9000').rect(0, 0, crayon.canvas.width, crayon.canvas.height);

  style.mainColor = '#DEDEDE'
  var pattern = Math.round(Math.random() * 5)
  switch (pattern) {
        // Pattern selector
    case 0:
      patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style)
      break
    case 1:
      patterns.MarcinTiles(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, 32, 128, style)
      break
    case 2:
      patterns.MarcinLines(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 3:
      patterns.FractalTree(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, book.pageCount, style)
      break
    case 4:
      patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 5:
      var randMode = Math.round(Math.random() * 2)
      var randCols = 5 + Math.round(Math.random() * 7)
      var randRows = randCols + 4
      var clusterSize = (crayon.canvas.width) / randCols
      var posx = 0
      var posy = 0// crayon.canvas.height - 50 - randRows*clusterSize;
      patterns.PixelGrid(crayon.context, posx, posy, randCols, randRows, clusterSize, randMode, style)
      break
  }
        // crayon.context.fillStyle = style.mainColor;
        // crayon.context.fillRect(0, 258, 268, crayon.canvas.height - 268 - 50);

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.02
  var titleFontSize = crayon.canvas.height * 0.04

  var titleX = crayon.canvas.width / 2
  var titleY = crayon.canvas.width * 0.08 + 160
  var titleWidth = crayon.canvas.width * 0.4

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  var numberOfSides = 6,
    // size =  250,
    Xcenter = crayon.canvas.width / 2,
    Ycenter = crayon.canvas.width / 2

// crayon.context.rotate(-60);
  function polygon (ctx, x, y, radius, sides, startAngle, anticlockwise) {
    if (sides < 3) return
    var a = (Math.PI * 2) / sides
    a = anticlockwise ? -a : a
    crayon.context.save()
    crayon.context.translate(x, y)
    crayon.context.rotate(startAngle)
    crayon.context.moveTo(radius, 0)
    for (var i = 1; i < sides; i++) {
      crayon.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i))
    }
    crayon.context.closePath()
    crayon.context.restore()
  }

  crayon.context.beginPath()
  polygon(crayon.context, crayon.canvas.width / 2, crayon.canvas.width / 2, 200, 6, -Math.PI / 2)
  crayon.context.fillStyle = '#FFFFFF'
  crayon.context.fill()
  crayon.context.stroke()
// crayon.context.rotate(60);

  crayon.translate(titleX, titleY)
  crayon.context.font = titleFontSize + 'pt Arial'
  crayon.context.textAlign = 'center'
  crayon.context.fillStyle = 'black'
      // crayon.context.fillText(title, 300, 200, 300);
    crayon.font('Arial', titleFontSize, 'bold').fill('#000000').paragraph('center', 0.25, titleWidth, true).text(title);
    crayon.font('Arial', titleFontSize*0.85, 'normal').fill('#000000').paragraph('center', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    crayon.font('Arial', authorFontSize, author.nameStyle).fill('#000000').paragraph('left', 0.25, titleWidth, false).text(author.name, 3, authorFontSize/2);
    crayon.font('Arial', authorFontSize, author.surnameStyle).fill('#000000').paragraph('right', -5.25, titleWidth, true).text(author.surname, -3, authorFontSize/2);

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Hip',
  makeCover: makeCover
}

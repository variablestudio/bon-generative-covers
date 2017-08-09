const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const chroma = require('chroma-js')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.style('default')

  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'

  var colorHSL = chroma.hex(niceBlue).hsl()
  niceBlue = chroma.hsl(Math.random() * 255, 0.68, colorHSL[2]).hex()

  crayon.fill(niceBlue).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  var step = crayon.canvas.width / 30 + crayon.canvas.width / 15 * Math.random()
  for (var i = 0; i < 2000; i += step) {
    var a = { x: 0, y: crayon.canvas.width / 30 + i }
    var b = { x: crayon.canvas.width / 30 + i, y: 0 }

    crayon.save()
    crayon.stroke('#FFFFFF').line(a.x, a.y, b.x, b.y).stroke(false)
    var k = Math.random()
    crayon.fill('#FFFFFF')
        .translate(a.x + (b.x - a.x) * k + 1, a.y + (b.y - a.y) * k + 1)
        .rotate(-45)
        .rect(0, 0, crayon.canvas.width / 30 + Math.random() * 400, crayon.canvas.width / 100)
    crayon.restore()
  }

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.06

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('ptsansbolditalic', titleFontSize).paragraph('left', 0.25).fill('#600768')

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  crayon.style('author').font('oxygenlight', authorFontSize).fill('#0000FF')
  var authorMeasurements = crayon.measureText(author)

  crayon.style('default').fill(paleYellow).rect(margins, margins, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2)

  crayon.style('title').text(titleLines, titleX, titleY)
  crayon.style('author').text(author, titleX, titleY + titleMeasurements.height)

  utils.addCover()
}

module.exports = {
  name: 'Minimal',
  makeCover: makeCover
}

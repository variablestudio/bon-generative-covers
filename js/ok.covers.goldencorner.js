const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.style('default')

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
  var numX = 2 + Math.floor(Math.random() * 10)
  var radius = (0.2 + 0.5 * Math.random())
  var radius2 = (0.1 + 0.4 * Math.random())
  var shape = Math.floor(Math.random() * 2)

  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 255)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, colorHSL[2]).hex()
  var lightColor = chroma.hsl(hue, 0.8, colorHSL[2] * 1.5).hex()

  crayon.fill(color).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  var stepX = crayon.canvas.width / (numX + 1)
  var stepY = stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 // square
    // if (shape == 1) r2 *= 0.25; //ellipse

  crayon.fill(lightColor).stroke(false)

  for (var x = 0; x <= crayon.canvas.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= crayon.canvas.height + stepY / 2; y += stepY) {
      crayon.save()
      crayon.translate(x, y)
      crayon.rotate(-45)
      crayon.scale(borderScale, borderScale)
      crayon.rect(-r, -r2, r * 2, r2 * 2)
        // if (shape == 1) crayon.ellipse(-r, -r2, r*2, r2*2);
      crayon.rotate(90)
      crayon.rect(-r, -r2, r * 2, r2 * 2)
        // if (shape == 1) crayon.ellipse(-r, -r2, r*2, r2*2);
      crayon.restore()
    }
  }

  crayon.fill(color).stroke(false)

  for (var x = 0; x <= crayon.canvas.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= crayon.canvas.height + stepY / 2; y += stepY) {
      crayon.save()
      crayon.translate(x, y)
      crayon.rotate(-45)
        // crayon.rect(-r, -r2, r*2, r2*2);
      crayon.ellipse(-r, -r2, r * 2, r2 * 2)
      crayon.rotate(90)
        // crayon.rect(-r, -r2, r*2, r2*2);
      crayon.ellipse(-r, -r2, r * 2, r2 * 2)
      crayon.restore()
    }
  }

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.05

  var shiftY = 50

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + 15
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('UbuntuCondensed', titleFontSize, 'normal').paragraph('left', 0.25).fill('#333333')

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  titleY += shiftY

  crayon.style('author').font('PTSans', authorFontSize).fill('#333333')
  var authorMeasurements = crayon.measureText(author)

    // crayon.style('default').fill(paleYellow).rect(margins, margins + shiftY, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height*1.5 + authorMeasurements.height + titleAscent/2 - shiftY);

  crayon.context.beginPath()
  crayon.context.moveTo(0, 0)
  crayon.context.lineTo(crayon.canvas.width, 0)
  crayon.context.lineTo(50, crayon.canvas.height * 0.665)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height)
  crayon.context.lineTo(0, crayon.canvas.height)
  crayon.context.lineTo(0, 0)
  crayon.context.closePath()
  crayon.context.fillStyle = color
  crayon.context.fill()

  crayon.style('title').text(titleLines, titleX, titleY)
  crayon.style('author').text(author, titleX, crayon.canvas.height - 40)

  utils.addCover()
}

module.exports = {
  name: 'GoldenCorner',
  makeCover: makeCover
}

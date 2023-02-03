(function (w, d) {
  'use strict'
  w.onload = function () {

  /**
 * Function appendChild helper
 * @param {...*} e
 */
  const append = function (e) {
    const arrg = arguments
    for (let i = 1; i < arrg.length; i++) e.appendChild(arrg[i])
  }

  /**
 * Function setAttribute helper
 * @param {...*} e
 */
  const atribute = function (e) {
    const arrg = arguments
    for (let i = 1; i < arrg.length; i += 2) e.setAttribute(arrg[i], arrg[i + 1])
  }

  /**
 * Function createElement helper
 * @param {string} e
 */
  const element = function (e) { return d.createElement(e) }

  // get config from window.IGConfig
  const getConfig = typeof w['IGConfig'] !== 'undefined' && w['IGConfig'] // eslint-disable-line

  //add link CSS to head
  const resource = element('link')
  atribute(resource, 'rel', 'stylesheet', 'href', 'css/gall7.min.css')
  append(d.getElementsByTagName('head')[0], resource)

  // create object of image gallery
  const IG = {}
  IG.folder = getConfig['folder'] || 'x/' // eslint-disable-line
  IG.extension = getConfig['extension'] || ''
  IG.imageContainer = getConfig['imageContainer'] || 'gall7' // eslint-disable-line
  IG.timer = isFinite(getConfig['delaySeconds']) ? getConfig['delaySeconds'] * 1000 : 1700 // eslint-disable-line
  IG.showButtonsOnPlay = typeof getConfig['showButtonsOnPlay'] === 'undefined' ? true : !!getConfig['showButtonsOnPlay'] // eslint-disable-line
  IG.showButtons = typeof getConfig['showButtons'] === 'undefined' ? true : !!getConfig['showButtons'] // eslint-disable-line
  IG.imagesArray = []// all elements array
  IG.isAutoPlayOn = false
  IG.isActive = false
  IG.indexOfImage = 0
  IG.timeOut = 0
  IG.clos = element('button')
  IG.ilef = element('button')
  IG.irig = element('button')
  IG.imag = element('div')
  IG.cent = element('div')
  IG.left = element('div')
  IG.rigt = element('div')
  IG.insi = element('div')
  IG.spin = element('div')

  atribute(IG.clos, 'id', 'clos7', 'class', 'bra brb rtm rtp opa', 'aria-label', 'Close', 'title', 'Press Esc to close')
  atribute(IG.ilef, 'id', 'ilef7', 'class', 'bra rtm opa trn')
  atribute(IG.irig, 'id', 'irig7', 'class', 'bra rtp opa trn')
  atribute(IG.cent, 'id', 'cent7', 'class', 'top lft w10 h10')
  atribute(IG.rigt, 'id', 'rigt7', 'class', 'top rgt hvr', 'aria-label', 'Next')
  atribute(IG.left, 'id', 'left7', 'class', 'top lft hvr', 'aria-label', 'Previous')
  atribute(IG.imag, 'id', 'imag7', 'class', 'hid')
  atribute(IG.spin, 'id', 'spn', 'class', 'hid')
  IG.insi.id = 'insi7'
  append(IG.rigt, IG.irig)
  append(IG.left, IG.ilef)
  append(IG.cent, IG.insi, IG.rigt, IG.left, IG.clos, IG.spin)
  append(IG.imag, IG.cent)
  append(d.body, IG.imag)// append document fragment to <body>

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.isAutoPlayOn = true
    if (this.showButtons) this.play.className = 'top lft bra brb opa acts7'

    this.timeOut = setTimeout(function () {
      this.right().show()
      // hide buttons if specified in config
      if (!this.showButtonsOnPlay) {
        this.left.className = this.rigt.className = this.clos.className = 'hid'
        if (this.showButtons) this.foot.className = this.onow.className = 'hid'
      }
      this.indexOfImage === this.imagesArray.length - 1 && this.clear()
    }.bind(this), this.timer)
  }

  // autoplay and image loaded helper to remove class 'loader'
  IG.loadComplete = function () {
    // remove class spn (loader)
    //if(this.imgs.complete && this.imgs.naturalHeight !== 0) 
    this.spin.className = 'hid'
    // if autoplay is set loop from images
    this.isAutoPlayOn && this.autoPlayLoop()
  }

  // downloads method
  IG.downloads = function () {
    // create link
    const a = element('a') 
    // this.onow.dataset.selected = fileName
    atribute(a, 'rel', 'noopener', 'download', this.imgs.src.split('/').pop(), 'href', this.imgs.src, 'target', '_blank')
    a.click()
    a.remove()
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.imagesArray.length - 1
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.imagesArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    return this
  }

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOut)
    this.isAutoPlayOn = false
    if (this.showButtons) {
      this.foot.className = this.onow.className = ''
      this.play.className = 'top lft bra brb opa'
    }
    if(!this.showButtonsOnPlay) 
    this.clos.className = 'bra brb rtm rtp opa'
    this.leftRigthBtnsShow()
    return this
  }

  // method on close
  IG.close = function () {
    this.imag.className = 'hid'
    this.isActive = false
    d.documentElement.style.overflow = 'visible'// back to initial state of overflow
  }

  // left right buttons show/check method
  IG.leftRigthBtnsShow = function () {
    this.left.className = this.indexOfImage === 0 ? 'hid' : 'top lft hvr'
    this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hid' : 'top rgt hvr'
  }

  // show image method to show image when loaded and recreating image element
  IG.show = function () {
    const index = this.imagesArray[this.indexOfImage]
    const imageSource = index.src
    const fileName = imageSource.split('/').pop()
    const arrayFileName = fileName.split(".")
    const fileNameWithExtension = arrayFileName[0] +'.'+(this.extension || arrayFileName[1])
    const fullNamePrefixed = arrayFileName === 'svg' ? imageSource : imageSource.replace(fileName, this.folder + fileNameWithExtension)
    
    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      document.documentElement.style.overflow = 'hidden'// hide scrollbar
      this.imag.className = ''
    }
    // show index and filename trying to load
    if (this.showButtons) {
      this.alts.innerText = arrayFileName[1] === 'svg' ? arrayFileName.join('.') : fileNameWithExtension
      this.fine.innerText = Number(this.indexOfImage) + 1
    }
    // if there is already image and src is same return and don't recreate
    if (this.imgs && (this.imgs.src === imageSource || this.imgs.src === fullNamePrefixed)) return false
     
    // if image exist remove and later recreate it
    this.imgs && this.insi.removeChild(this.imgs)
    // add spn class when loading image src
    this.spin.className = 'bor'
    // show lft right buttons and bottom information (file name and index)
    this.leftRigthBtnsShow()


    // create new image element
    if (arrayFileName[1] === 'svg') {
      this.imgs = index.cloneNode()
      // remove existing attributes of image element because it will not apply any styling
      // console.time()
      while(this.imgs.attributes.length > 0 && !this.imgs.getAttribute('src'))
      this.imgs.removeAttribute(this.imgs.attributes[0].name)
      // this.imgs.removeAttribute('class')
      // this.imgs.removeAttribute('id')
      // console.timeEnd()
    }

    else this.imgs = element('img')
    
    // set image alt attribute
    // atribute(this.imgs, 'alt', index.alt)
    
    // image onerror methods
    this.imgs.onerror = function (e) {
      // throw new Error('Image error: ' + e.message)
      e.target.onerror = null // escape from infinite loop
      e.target.src = imageSource // set same img source
    }
    
    // image onload methods
    this.imgs.onload = function (e) {
      this.loadComplete()
      //the real image loaded successfully file name
      const theRealFileName = this.imgs.src

      if(fullNamePrefixed !== theRealFileName) 
      this.alts.innerText = theRealFileName.split('/').pop()
    }.bind(this)

    // append image to div
    append(this.insi, this.imgs)

    // change source only if it's not svg
    if(arrayFileName[1] !== 'svg')
    // set image src if svg return full name else try to load big image
    this.imgs.src = fullNamePrefixed

  }

  // listen for clicked on image element and load show method
  IG.listenForIG = function (e) {
    const target = e.target
    if (target.tagName === 'IMG') {
      this.indexOfImage = this.imagesArray.indexOf(target) > -1 ? this.imagesArray.indexOf(target) : 0// set image index on click
      this.show()
      e.stopImmediatePropagation()
    }
  }

  // assign container elements with custom or (default = images-container) class or BODY (default = BODY)
  const container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')

  const containersArray = []
  for (let l = container.length - 1; l >= 0; l--) containersArray.push(container[l])

  // Loop from elements and add to array
  for (let i = containersArray.length - 1; i >= 0; i--) {
    const img = containersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) IG.imagesArray.push(img[j])
  }
  if (containersArray[0] && containersArray[0].tagName === 'BODY') d.body.onclick = function (e) { IG.listenForIG(e) }
  else for (let k = containersArray.length - 1; k >= 0; k--) containersArray[k].onclick = function (e) { IG.listenForIG(e) }

  // show download and autoplay buttons if (true = default)
    if (IG.showButtons) {
      IG.wdow = element('button')
      IG.play = element('button')
      IG.foot = element('div')
      IG.onow = element('div')
      IG.alts = element('span')
      IG.fine = element('span')
      IG.down = element('span')
      atribute(IG.play, 'id', 'play7', 'class', 'top lft bra brb opa')
      atribute(IG.down, 'id', 'down7', 'class', 'bor')
      atribute(IG.wdow, 'id', 'wdow7', 'class', 'top rgt bra rtm opa')
      IG.alts.id='alts7'
      IG.foot.id='foot7'
      IG.onow.id='onow7'
      IG.fine.id='stat7'
      append(IG.onow, IG.alts, IG.wdow)
      append(IG.imag, IG.onow, IG.foot)
      append(IG.foot, IG.play, d.createTextNode(IG.imagesArray.length + '('), IG.fine, d.createTextNode(')'))
      append(IG.wdow, IG.down)
      // atribute(IG.wdow, 'aria-label', 'Download')
      // atribute(IG.play, 'aria-label', 'Play')
    }

    /** @suppress {missingProperties} */
  const k = {
    'play7': function () { IG.isAutoPlayOn ? IG.clear() : IG.autoPlayLoop() }, // eslint-disable-line
    'left7': function () { IG.clear().lefts().show() }, // eslint-disable-line
    'rigt7': function () { IG.clear().right().show() }, // eslint-disable-line
    'clos7': function () { IG.clear().close() }, // eslint-disable-line
    'wdow7': function () { IG.clear().downloads() } // eslint-disable-line
  }
  // add methods for arrow keys to k object
  k[' '] = k['play7'] // eslint-disable-line
  k['ArrowLeft'] = k['left7'] // eslint-disable-line
  k['ArrowRight'] = k['rigt7'] // eslint-disable-line
  k['Escape'] = k['clos7'] // eslint-disable-line

  function switcher (e) {
    if (!IG.isActive || e.isComposing || e.key === 229) return
    // event key or target id
    const ev = e.key || e.target.id
    if (!k[ev]) return IG.clear()
    k[ev]()
    e.preventDefault()
    e.stopImmediatePropagation()
  }

  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript

  let startXPos
  let startYPos
  let startTime

  function touchStart (event) {
    startXPos = event.touches[0].pageX
    startYPos = event.touches[0].pageY
    startTime = new Date()
  }

  function touchEnd (event) {
    const endXPos = event.changedTouches[0].pageX
    const endYPos = event.changedTouches[0].pageY
    const endTime = new Date()
    const moveX = endXPos - startXPos
    const moveY = endYPos - startYPos
    const elapsedTime = endTime - startTime
    if (Math.abs(moveX) > 30 && Math.abs(moveY) < 30 && elapsedTime < 1000) {
      if (moveX < 0) k['rigt7']() // eslint-disable-line
      else k['left7']() // eslint-disable-line
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, { passive: true })
  IG.imag.addEventListener('touchend', touchEnd)
  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', switcher)
  // add click onclick event to image div (gallery window)
  IG.imag.onclick = switcher
}
})(window, document)

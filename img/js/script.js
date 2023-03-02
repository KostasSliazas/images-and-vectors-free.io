const header = document.getElementsByTagName('header')[0]
const docElem = ()=> document.documentElement.style.overflow = header.getAttribute('class') === 'active'?'hidden' : 'auto'
document.addEventListener('click', function (e) {
    if (e.target.id === "menu" && header.getAttribute('class') !== 'active')
      return header.setAttribute('class', 'active') || docElem()
    return header.removeAttribute('class') || docElem()
})
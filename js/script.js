const header = document.getElementsByTagName('header')[0]


const body = ()=> document.body.style.overflow = header.getAttribute('class') === 'active'?'hidden' : 'auto'
document.addEventListener('click', function (e) {
    if (e.target.id === "menu" && header.getAttribute('class') !== 'active')
      return header.setAttribute('class', 'active') || body()
    return header.removeAttribute('class') || body()

})
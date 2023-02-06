const header = document.getElementsByTagName('header')[0]
document.addEventListener('click', function (e) {
    if (e.target.id === "menu" && header.getAttribute('class') !== 'active')
      return header.setAttribute('class', 'active')
    return header.removeAttribute('class')
})
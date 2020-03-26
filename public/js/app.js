const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.innerHTML = '<img class="portrait-2" src="../img/hand-loader.gif" />'
    messageTwo.textContent = ''

    const response = await fetch('/weather?address=' + encodeURIComponent(location))
    const data = await response.json()
    if (data.error) {
        messageOne.textContent = data.error
    } else {
        messageOne.innerHTML = '<h2>Details:</h2>'
        messageTwo.innerHTML =
            `
                        <b>Location:</b> ${data.location}<br>
                        <b>Timezone:</b> ${data.timezone}<br>
                        <b>Summary:</b> ${data.summary}<br>
                        <b>Temperature:</b> ${data.temperature} &deg;C<br>
                        <b>Rainfall:</b> ${data.rainfall}%<br>
                    `
    }
})
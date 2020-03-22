const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.innerHTML = "<b>Loading...</b>"
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
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
    })
})
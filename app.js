const submitButtom = document.querySelector('#app form button');
const userNameField = document.querySelector('#app form input');
const content = document.querySelector('#app main');

const img = document.createElement('img')
const userNameTitle = document.createElement('h2')
const userNameLink = document.createElement('a')

const textContact = document.createElement('span')

const linkContact = document.createElement('a')

submitButtom.addEventListener('click', run)

function run(event) {
    event.preventDefault()

    let userName = userNameField.value

    userName = userName.replace(' ', '')
    userName = userName.replace('.', '')
    userName = userName.trim()

    axios
        .get(`https://api.github.com/users/${userName}`)
        .then(function (response) {
            if (response.data.erro) {
                throw new Error('Usuário inválido!')
            }
 
            content.innerHTML = ''
            userNameField.value = ''
            userNameTitle.innerHTML = ''
            userNameLink.innerHTML = ''

            img.src = `${response.data.avatar_url}`

            content.appendChild(img)

            const userNameText = document.createTextNode(response.data.login)
            userNameTitle.appendChild(userNameText)

            userNameLink.setAttribute('target', '_blank')
            userNameLink.setAttribute('title', `Ir para o pefil de ${response.data.name}`)
            userNameLink.href = `https://github.com/${userName}`
            userNameLink.appendChild(userNameTitle)
            content.appendChild(userNameLink)

            response.data.bio === null ? createLine('Bio: Não informada') : createLine(`Bio: ${response.data.bio}`)

            response.data.company === null ? createLine('Empresa: Não informada') : createLine(`Empresa: ${response.data.company}`)

            response.data.location === null ? createLine('Localização: Não informada') : createLine(`Localização: ${response.data.location}`)


            textContact.innerText = 'Contato: '

            linkContact.href = `${response.data.blog === '' ? 'https://github.com/' + userName : response.data.blog}`

            linkContact.setAttribute('target', '_blank')
            linkContact.setAttribute('title', `Entrar em contato com ${response.data.name}`)

            linkContact.innerText = `${response.data.blog === '' ? 'Ir para o perfil no GitHub' : response.data.blog}`

            textContact.appendChild(linkContact)

            content.appendChild(textContact)


            createLine(`Repositórios: ${response.data.public_repos}`)
            response.data.following ? spanText(`Seguindo: ${response.data.following}`) : spanText(`Seguindo: ${0}`)
            response.data.followers ? spanText(`Seguidores: ${response.data.followers}`) : spanText(`Seguidores: ${response.data.followers}`);
        })
        .catch(function (error) {
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}

function spanText(text) {
    const followSpan = document.createElement('span')
    const followText = document.createTextNode(text)

    followSpan.appendChild(followText)
    content.appendChild(followSpan)
}
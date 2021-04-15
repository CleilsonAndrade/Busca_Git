const submitButtom = document.querySelector('#app form button');
const userNameField = document.querySelector('#app form input');
const content = document.querySelector('#app main');

const img = document.createElement('img')
const userNameTitle = document.createElement('h2')
const userNameLink = document.createElement('a')
const userEmailLink = document.createElement('a')
const userEmailSpan = document.createElement('span')


submitButtom.addEventListener('click', run)

function run(event){
    event.preventDefault()

    let userName = userNameField.value

    userName = userName.replace(' ', '')
    userName = userName.replace('.', '')
    userName = userName.trim()

    axios
        .get(`https://api.github.com/users/${userName}`)
        .then(function(response) {
            console.log(response.data)
            if(response.data.erro){
                throw new Error('Usuário inválido!')
            }
            
            content.innerHTML = ''
            userNameField.value = ''
            userNameTitle.innerHTML = ''
            userNameLink.innerHTML = ''
            userEmailLink.innerHTML = ''
            userEmailSpan.innerHTML = ' '

            img.src = `${response.data.avatar_url}`

            content.appendChild(img)

            const userNameText = document.createTextNode(response.data.login)
            userNameTitle.appendChild(userNameText)
            userNameLink.setAttribute('target', '_blank')
            userNameLink.setAttribute('title', `Ir para o pefil de ${response.data.name}`)
            userNameLink.href = `https://github.com/${userName}`
            userNameLink.appendChild(userNameTitle)
            content.appendChild(userNameLink)

            !response.data.bio === 'null' ? createLine(`Bio: ${response.data.bio}`) : createLine(`Bio: Não informada`)

            !response.data.company === 'null' ? createLine(`Empresa: ${response.data.company}`) : createLine(`Empresa: Não informada`)
            
            !response.data.location === 'null' ? createLine(`Localização: ${response.data.company}`) : createLine(`Localização: Não informada`)

            
            let userEmail = response.data.blog == '' ? 'Não informado' : response.data.blog
            console.log(userEmail)

            const userEmailSpanText = document.createTextNode(`Contato: ${userEmail}`)
            
            userEmailSpan.appendChild(userEmailSpanText)

            userEmailSpan.appendChild(userEmailLink)

            content.appendChild(userEmailSpan)


            createLine(`Repositórios: ${response.data.public_repos}`)

            response.data.following ? spanText(`Seguindo: ${response.data.following}`) : spanText(`Seguindo: ${0}`)
            
            response.data.followers ? spanText(`Seguidores: ${response.data.followers}`) : spanText(`Seguidores: ${response.data.followers}`);
        })
        .catch(function(error){
            console.log(error)
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })
}

function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    
    line.appendChild(text)
    content.appendChild(line)
}

function spanText(text){
    const followSpan = document.createElement('span')
    const followText = document.createTextNode(text)
    
    followSpan.appendChild(followText)
    content.appendChild(followSpan)
}
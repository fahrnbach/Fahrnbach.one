import { validateEmail } from './emailValidate.js'


let emailBody = document.querySelector('.email-body')
let input = document.querySelector('.email-input')
input.addEventListener('mouseup', () => {
    input.value = ''
})

// !Notes
// repopulatePrompts() must be called BEFORE any injected string interpolation is expected to take place
// It seems that upon initialization an interpolated string in an object does not make a ref
// Likely due to the way that objects are stored eg: objects are reference types

let env = {
    typingSpeed: 30,
    helpButtonsDelay: 2500,
    promptDelay: 1000,
    multiplier: 1,
    opacityDelay: 100
}

let STATE = {
    entry: null,
    welcomePrompt: null,
    welcomeReply: null,
    collectedName: null,
    helpPrompt: null,
    helpButtons: null,
    optionsPrompt: null,
    collectedOption: null,
    emailPrompt: null,
    collectedEmail: null,
    emailReply: null,
    goodbyePrompt: null
}

STATE.entry = true

let STATE_POSITION = 0
STATE_POSITION++
let STATE_VALUE = {
    0: 'entry',
    1: 'welcomePrompt',
    2: 'welcomeReply',
    2: 'collectedName',
    3: 'helpPrompt',
    4: 'helpButtons',
    5: 'optionsPrompt',
    6: 'collectedOption',
    7: 'emailPrompt',
    8: 'collectedEmail',
    9: 'emailReply',
    10: 'goodbyePrompt'
}
function utilGetState() {
    // console.log(STATE_VALUE[STATE_POSITION])
}

let userEntry = null

let form = document.querySelector('.form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e)
    const formData = new FormData(form);
    const userEntry = formData.get('email');
    console.log(STATE_POSITION)
    switch(STATE_POSITION){
        case 2:
            responses.who = userEntry
            STATE.collectedName = true
            STATE_POSITION++
            responses.who = userEntry
            repopulatePrompts()
            addReplyWho(userEntry)
            setTimeout(() => {
                addPromptHelp(prompts.help)
            }, env.promptDelay);
            break
        case 9:
        let STATE_POSITION_INITIAL = STATE_POSITION
        let unsanitizedEmail = userEntry
        let maybeValidatedEmail = validateEmail(unsanitizedEmail)
        if (maybeValidatedEmail) {
            responses.where = maybeValidatedEmail
            STATE.emailCollected = true
            STATE_POSITION++
                console.log('sending email...')
            addReplyEmail(responses.where)
            STATE.emailReply = true
            //Send Email Logic
            repopulatePrompts()
            // addPromptGoodbye(responses.where)
            addPromptGoodbye(prompts.thank)
        } else {
            STATE_POSITION = STATE_POSITION_INITIAL
            addReplyInvalidEmail('Invalid Email')
            console.log('retry email')
        }
    }
    setTimeout(() => {
        addPromptHelpButtons()
    }, env.helpButtonsDelay * env.multiplier);
})
// console.log(welcomeText)
// let initalMessage = welcomeText.textContent
// welcomeText.textContent = ''

function scrollToBottom(delay=0) {
    setTimeout(() => {
        // console.log('hi')
        emailBody.scrollTop = emailBody.scrollHeight
    }, delay);
}

// let who = ''

let responses = {
    who: '',
    what: '',
    when: '',
    where: '',
    how: ''
}

let prompts

function repopulatePrompts() {
    prompts = {
        welcome: `Welcome! What's Your Name?`,
        help: `Nice to meet you ${responses.who},\nHow can I help you today?`,
        info: `Sure! Enter your email address below!\n`,
        info: `Sure! Enter your email below,\nand we will be in contact soon!\n `,
        book: `I'd be happy to help you book an appointment so we can chat soon! `,
        thank: `Thanks! Check your inbox :)` //!Magic Link,
    }
}
repopulatePrompts()


let hints = {
    name: `What's Your Name?`,
    help: `Nice to meet you ${responses.who},\nHow can I help you today?`,
    info: `Sure! Enter your email address below!\n`,
    info: `Sure! Enter your email below,\nand we will be in contact soon!\n `,
    book: `I'd be happy to help you book an appointment so we can chat soon! `
}

let magicLinks = {
    gmail: `https://mail.google.com/mail/u/0/#search/from%3A(jacob%40fahrnbach.one)`,
    
}

// let helpOptions = {
//     option1: 'Option1',
//     option2: 'Option2',
//     option3: 'Option3',
//     option4: 'Option4',
// }
let helpFunction1; let helpFunction2; let helpFunction3; let helpFunction4
let helpOptions = ['Email Me','Get More Info','Let\'s Work Together','Other']
let helpOptionsPrompt = {
    opt1: 'Sure Thing! Enter Your Email below, \n and I\'ll email you soon :)',
    opt2: 'Two',
    opt3: 'Three',
    opt4: 'Four',
}

let helpOption1 = () => {
    addPromptOptions(helpOptions[0])
    // STATE_POSITION = 4
}
let helpOption2 = () => {
    addPromptOptions(helpOptions[1])
    // STATE_POSITION = 4
}
let helpOption3 = () => {
    addPromptOptions(helpOptions[2])
    // STATE_POSITION = 4
}
let helpOption4 = () => {
    addPromptOptions(helpOptions[3])
    // STATE_POSITION = 4
}

function addPromptOptions(option) {
    switch(option) {
        case helpOptions[0]:
        addPromptReply(helpOptionsPrompt.opt1)
        break
        case helpOptions[1]: 
        addPromptReply(helpOptionsPrompt.opt1)
        break
        case helpOptions[2]:
        addPromptReply(helpOptionsPrompt.opt1)
        break
        case helpOptions[3]:
        addPromptReply(helpOptionsPrompt.opt1)
        break
    }
    responses.what = option
    console.log(responses.what)
}


////////////
let addPromptWelcome = function addPromptWelcome(resText = prompts.welcome) {
    if (!STATE.welcomePrompt) {
    let el = document.createElement('div')
    el.classList.add('email-prompt')
    emailBody.appendChild(el)
    typeChar(resText, el);
    scrollToBottom()
    input.value = hints.name
    STATE.welcomePrompt = true
    STATE_POSITION++
    }
}

function addPromptHelp(resText) {
    if (!STATE.helpPrompt) {
    let el = document.createElement('div')
    el.classList.add('email-prompt')
    emailBody.appendChild(el)
    typeChar(resText, el);
    scrollToBottom()
    STATE.helpPrompt = true
    STATE_POSITION++
    }
}

//room for adding detailed guides based on what they click here

function addPromptReply(resText) {
    if (!STATE.optionsPrompt) {
        STATE_POSITION++
        STATE.collectedOption = true
        responses.what = resText
        input.value = 'Enter Your Email'
        STATE.emailPrompt = true
        STATE_POSITION++
    let el = document.createElement('div')
    el.classList.add('email-prompt')
    emailBody.appendChild(el)
    typeChar(resText, el);
    scrollToBottom()
    STATE.optionsPrompt = true
    STATE_POSITION++
    }
}

function addPromptHelpButtons() {
    if (!STATE.helpButtons) {
    let option1 = document.createElement('div')
    let option2 = document.createElement('div')
    let option3 = document.createElement('div')
    let option4 = document.createElement('div')
    option1.addEventListener('pointerup', helpOption1)
    option2.addEventListener('pointerup', helpOption2)
    option3.addEventListener('pointerup', helpOption3)
    option4.addEventListener('pointerup', helpOption4)
    let options = [option1, option2, option3, option4]
    let optionsText = [...helpOptions]
    options.map((el) => {
            el.textContent = optionsText.shift()
            el.classList.add('email-prompt-button')
            emailBody.appendChild(el)
        });
        // styles
    for (let i=0; i < options.length; i++) {
        applyOpacity(i)
    }

    function applyOpacity(index) {
        setTimeout(() => {
            options[index].style.opacity = '1'
        }, env.opacityDelay * index);
    }

    // for (let option of options) {
    //     option.classList.add('email-prompt-button')
    //     option.textContent = helpOptions.option1
    //     emailBody.appendChild(option)
    // }
    STATE.helpButtons = true
    STATE_POSITION++
    }
}

function addPromptGoodbye(resText) {
    if (!STATE.goodbyePrompt) {
    let el = document.createElement('div')
    el.classList.add('email-prompt')
    emailBody.appendChild(el)
    typeChar(resText, el);
    scrollToBottom()
    STATE.goodbyePrompt = true
    STATE_POSITION++
    }
}

function addReplyWho(resText) {
    // console.log(resText + 'text')
    if (!STATE.welcomeReply) {
        responses.who = resText
        let el = document.createElement('div')
        el.classList.add('email-reply')
        el.innerText = resText
        emailBody.appendChild(el)
        // typeChar(resText, el);
        setTimeout(() => {
            el.style.opacity = '1'
        }, env.opacityDelay);
        scrollToBottom()
        STATE.welcomeReply = true
        STATE_POSITION++
    }
    // console.log('in responses.who')
    
}

function addReplyEmail(resText) {
    // console.log(resText + 'text')
    if (!STATE.goodbyePrompt) {
        let el = document.createElement('div')
        el.classList.add('email-reply')
        el.innerText = resText
        emailBody.appendChild(el)
        // typeChar(resText, el);
        setTimeout(() => {
            el.style.opacity = '1'
        }, env.opacityDelay);
        scrollToBottom()
        STATE.emailReply = true
        STATE_POSITION++
    }
    // console.log('in responses.who')
    
}

function addReplyInvalidEmail(resText) {
    // console.log(resText + 'text')
    if (!STATE.goodbyePrompt) {
        let el = document.createElement('div')
        el.classList.add('email-reply')
        el.innerText = resText
        emailBody.appendChild(el)
        // typeChar(resText, el);
        setTimeout(() => {
            el.style.opacity = '1'
        }, env.opacityDelay);
        scrollToBottom()
    }
    // console.log('in responses.who')
    
}

function typeChar(text, element){
    let characterArr = [...text]
    let updatedText = ''
    for (let i=0; i < characterArr.length; i++){
            setClock(i)
    }
    function setClock(index) {
        setTimeout(() => {
            // if characterArr[index] == ''
            // console.log(index)
            updatedText = updatedText.concat(characterArr[index])
            element.textContent = updatedText
        }, env.typingSpeed * env.multiplier * index);
        }
}

let testemail = validateEmail('ema.offone@outlook.com')
console.log(testemail)

addPromptWelcome();

// function typeWord() {
//     let wordArr = [...initalMessage.split(' ')]
//     console.log(wordArr)
//     let updatedText = ''
//     for (let i=0; i < wordArr.length; i++){
//             setClock(i)
//     }
//     function setClock(index) {
//         setTimeout(() => {
//             // if characterArr[index] == ''
//             // console.log(index)
//             updatedText = updatedText.concat(wordArr[index] + ' ')
//             welcomeText.textContent = updatedText
//         }, 200 * index);
//         }
// }


//TODO ypes each word character by character
// function typeWordChar() {
//     let wordArr = [...initalMessage.split(' ')]
//     console.log(wordArr)
//     let updatedText = ''
//     for (let i=0; i < wordArr.length; i++){
//             setClock(i, wordArr)
//     }
//     function setClock(index, word) {
//         typeChar2()
//         setTimeout(() => {
//             // if characterArr[index] == ''
//             // console.log(index)
//             updatedText = updatedText.concat(wordArr[index] + ' ')
//             welcomeText.textContent = updatedText
//         }, 200 * index);
//         }
// }

// typeWord()
// emailValidate.js

let okCharacters = {
    'a': true,
    'b': true,
    'c': true,
    'd': true,
    'e': true,
    'f': true,
    'g': true,
    'h': true,
    'i': true,
    'j': true,
    'k': true,
    'l': true,
    'm': true,
    'n': true,
    'o': true,
    'p': true,
    'q': true,
    'r': true,
    's': true,
    't': true,
    'u': true,
    'v': true,
    'w': true,
    'x': true,
    'y': true,
    'z': true,              
    'A': true,
    'B': true,
    'C': true,
    'D': true,
    'E': true,
    'F': true,
    'G': true,
    'H': true,
    'I': true,
    'J': true,
    'K': true,
    'L': true,
    'M': true,
    'N': true,
    'O': true,
    'P': true,
    'Q': true,
    'R': true,
    'S': true,
    'T': true,
    'U': true,
    'V': true,
    'W': true,
    'X': true,
    'Y': true,
    'Z': true,
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
    '0': true,
    '@': true,
    '.': true,
    '+': true,
}
let okDomains = {
    'com': true,
    'net': true,
    'org': true,
    'one': true,
}


function validateEmail(email) {
    try {

    if (email.length === 0) {
        console.log('no email provided')
        return false
    }
    if (typeof email[0] === 'number') {
        console.log('email shouldn\'t begin with number')
        return false
    }
    let initialEmail = email
    // console.log(validateCharacters(initialEmail))
    let safeLetters = validateCharacters(initialEmail)
    let safeEmail = safeLetters.join('').split(',').toString()
    let splitEmail = safeEmail.split('@')
    if (splitEmail.length > 2) {
        console.log('too many at signs')
        return false
    }
    let name = splitEmail[0]
    let dotCount = 0
    let atCount = 0
    let subdomain = name.split('.')
    let cleanName
    for (let char of name) {
        if (char === '.') {dotCount++}
        if (char === '@') {
            atCount++
            console.log('too many @ symbols')
            return false
        }
        if (dotCount > 1) {
            console.log(dotCount)
            console.log('more than one dot in name subdomain')
            return false
        }
        //more than one dot = false
    }

    if(name[0] === '@' || name[1] === '2' || 
        name[2] === '@' || name[name.length] === '@' || 
        name[name.length-1] === '@') {
            console.log(dotCount)
            console.log('at in wrong position')
            return false
        }

    if(name[0] === '.' || name[1] === '.' || 
        name[2] === '.' || name[name.length] === '.' || 
        name[name.length-1] === '.' || name[name.length-2] === '.') {
            console.log(dotCount)
            console.log('dot in wrong position')
            return false
        }
        // console.log(dotCount)

        
        if (dotCount < 2 && name.length > 2) {
            // name longer than 5 && no dots
            cleanName = name
    }
    
    for (let char in splitEmail[1]){
        if (char === '@') {
            console.log('too many at signs')
            return false
        }
    }
    let domainHost = splitEmail[1].split('.')
    // console.log(splitEmail[1].split('.'))
    if (domainHost.length > 2) {
        console.log('more than one dot in domainHost')
        return false
        // More than one dot no go
    }
   let host = domainHost[0]
   let cleanHost
//    !okHosts = []
    if (host < 5) {
        console.log('host too short')
        return false
        cleanHost = host
        // no trust short host names
    }
    if (host > 3) {
        cleanHost = host
    }
    // !if (host > 5 && okHosts[host]) {
    //     !cleanHost = host
    // !}

    let domain = domainHost[1]
    let cleanDomain

    if (!okDomains[domain]) {
        console.log('domain not supported')
        return false
    }
    if (okDomains[domain]) {
        cleanDomain = domain
    }

    let cleanDomainHost = host + '.' + domain;
    let sanitizedEmail = cleanName + '@' + cleanDomainHost
    return sanitizedEmail
} catch (err) {
    console.log(err)
}
}

function validateCharacters(stringToValidate) {
// let initialEmail = 'testemail@gmail.com'
let safeLetters = []
for (let letter of stringToValidate) {
    if (!okCharacters[letter]){
        console.log('dirty email')
        // validation failed
        return false
    } else if(okCharacters[letter]) {
        safeLetters.push(letter)
    }
}
return safeLetters
    
}

export {validateCharacters, validateEmail}
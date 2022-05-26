

// this are the two disks
let outerDisk = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789! #$%&()*+,-./:;<=>?@[]^_`{|}~"
let innerDisk = "g5o[)1zsd9hu2,+%<-~}!map /7e|i?tkc_^ynlj#=>`@x]&6:w8*;v$qb04f{(r.3"
let encryptedMessage = ''
let decryptedMessage = ''

// transaltes or "rotates" the outer disks to map with the inner one 
function map(keyLetter, outerDiskKey) {
    let counterForMap = 0
    let checkOuter = false
    let checkInner = false
    decryptionMap = new Map()
    encryptionMap = new Map()
        
    while (true) {
            
            if (outerDisk[0] !== outerDiskKey && checkOuter ===false) {
                outerDisk = outerDisk.concat(outerDisk[0])
                outerDisk = outerDisk.substring(1)
            }
            if(outerDisk[0]=== outerDiskKey) checkOuter = true
            if (innerDisk[0]!==keyLetter && checkInner === false) {
                innerDisk = innerDisk.concat(innerDisk[0])
                innerDisk = innerDisk.substring(1)
                }
            if(innerDisk[0] === keyLetter) checkInner = true
            if (checkOuter === true && checkInner === true){
                decryptionMap.set(
                    innerDisk[counterForMap],
                    outerDisk[counterForMap])
                encryptionMap.set(
                    outerDisk[counterForMap],
                    innerDisk[counterForMap])
                counterForMap++
                if(counterForMap === outerDisk.length){
                    break
                   
                }               
            }

            
        }
        // for access time convinience
        return decryptionMap,encryptionMap 
    }
    
// used in the encryption phase to change the key - letter map randomly returns random int
function getRandomInt(max) {
        return Math.floor(Math.random() * max);

      }
      


//encypts the message using the keyletter and returns String
function encrypt(message, keyLetter){
    
    message = message.toUpperCase()
    
    
    let initialChar
    while (true) {  
        initialChar =  outerDisk.charAt(getRandomInt(outerDisk.length))
        if (/^[a-z]+$/i.test(initialChar)) {
            break
        }
    }

    encryptedMessage += initialChar.toUpperCase() 
    map(keyLetter,initialChar)
    // for simplicity the shift in key - letter map happens in range of 1 - 10
    shift = getRandomInt(10)
    counter = 0
    while (true) {

        
       encryptedMessage += encryptionMap.get(message[counter])
       counter++
       shift --
       if (shift ==0) {
           let char
           while (true) {    
               char = outerDisk.charAt(getRandomInt(outerDisk.length))
              if (/^[a-z]+$/i.test(char)) {
                  break
              }
               
           }
        encryptedMessage += char.toUpperCase() 
        shift = getRandomInt(10)
        map(keyLetter,char)  
                 
       }
   
       if (counter == (message.length)) {
           break
       }

    }

    
    
    return encryptedMessage
}

// accepts the encrypted message by the above functions and returns the original message 
function decrypt(encryptedMessage, keyLetter) {
    counter = -1
    while (counter < encryptedMessage.length-1) {
        
        counter ++
        
        if (encryptedMessage[counter] === encryptedMessage[counter]
            .toUpperCase()
         && encryptedMessage[counter] !== ' ' && /^[a-z]+$/i.test(encryptedMessage[counter])) {
            map(keyLetter, encryptedMessage[counter])
            
            continue
        }
        else{
            decryptedMessage += decryptionMap.get(encryptedMessage[counter])
            
        }
        
    }
    return decryptedMessage
}




// DOM manipulation

let countEnc = 0
let prev
let previous_character 

let countDec = 0 


document.querySelector('.encrypt').addEventListener('click', function(){
    // the secrete key to exchange between parties
    const keyLetter = document.querySelector('.keyLetter').value
    prev = keyLetter
    
    previous_character = prev 
    console.log(previous_character)
   
    
    console.log(previous_character)
    if (previous_character !== keyLetter) {
        
        countEnc = 0
        encryptedMessage =''
        document.querySelector('.key-error').textContent = ''
    }
   else if (previous_character === keyLetter) {
    
        
        countEnc++
    }
    

    if (countEnc == 5) {
        encryptedMessage = 'please change the key to continue'
        document.querySelector('.key-error').textContent = encryptedMessage
       
    
        
        

    }

    //the messages
    const message = document.querySelector('.encryptInput').value

     if (encryptedMessage === '' && keyLetter.length ===1) {
        encryptedMessage = encrypt(message,keyLetter)
        
        document.querySelector('.message').textContent = encryptedMessage
        encryptedMessage = ''
     }
   
})

document.querySelector('.decrypt').addEventListener('click', function(){
    // the secrete key to exchange between parties
    const keyLetter = document.querySelector('.keyLetter').value
    
    //the message
    const message = document.querySelector('.encryptInput').value
    

    if (decryptedMessage === '' && keyLetter.length ===1) {
        decryptedMessage = decrypt(message,keyLetter)
        
        document.querySelector('.message').textContent = decryptedMessage
        if (countDec <=5) {
            
            decryptedMessage = ''
        }
    }
       
})


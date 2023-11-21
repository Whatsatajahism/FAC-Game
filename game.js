const textElement =  document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) { 
 const nextTextNodeId = option.nextText
 if (nextTextNodeId <= 0){
    return startGame()
 }
 state = Object.assign(state, option.setState)
 showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You awake to find yourself on a bed of forest leaves, the cool air blowing through the trees and brushing against your face. You have the sudden knowledge that you need to escape the forest. In your hand you have a purple apple. What do you do with it?',
        options: [
            {
                text: 'Take apple',
                setState: { apple: true},
                nextText: 2
            },
            {
                text: 'Leave apple',
                setState: { hunger: true},
                nextText: 3 /*i wonder if this should be text 3, and the apple takes you to text 4? check back*/
                
            }
        ]
    },
    {
        id: 2,
        text: 'You have taken the apple. Do you want to take a bite now, or share it with the cute squirrel that has appeared in front of you?',
        options: [
            {
                text: 'Take a single bite of the apple and share the rest',
                requiredState: (currentState) => currentState.apple,
                setState: {apple: true, knowledge: true},
                nextText: 3
            },
            {
                text: 'Eat the entire apple, looking directly at the squirrel while you do',
                requiredState: (currentState) => currentState.apple,
                setState: {apple: false, shame: true},
                nextText: 3
            },
            {
                text: 'Give the apple to the squirrel, ignoring your own hunger.',
                requiredState: (currentState) => currentState.apple,
                setState: {apple: false, map: true},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'You wander the forest and see a moss covered door. There is a symbol in the centre that you think must be important.',
        options: [
        {
            text: 'The squirrel you helped appears and shows you the secret switch to open the door. It seems to wink at you as it scurries away. You enter the door.',
            requiredState: (currentState) => currentState.knowledge,
            setState: {apple: true, knowledge: false},
            nextText: 4
        },
        {
            text: 'The symbol seems like something you recognise from a dream. You trust in your dream insticts and start an intricate dance choreo ending with you on your knees, in a breakdance position. The door heaves open. ',
            requiredState: (currentState) => currentState.map,
            nextText: 4
        },
        {
            text: 'You can see no way to open it and leave. You begin to think of how we are all connected, like underground mycellial roots, and feel immense shame at not helping the squirrel. As you turn away, you are attacked by a wolf and die. You will fertilise the soil, and any mycelium to come. You are free.',
            requiredState: (currentState) => currentState.shame,
            nextText: 8

        },
        {
            text: 'You stare at the door and begin to hallucinate food. You reach for what you believe is a vegan burger, but is actually poisonous moss. You sadly die after your first bite.',
            requiredState: (currentState) => currentState.hunger,
            nextText: 8
        }

        ]

    },
    {
        id: 4,
        text: 'You walk down a stone passage, the only light coming from lit torches that appear every 100 steps. You hear whispers, they seem to be asking who you are. What do you do?',
        options: [
            {
                text: 'You remember a memory from childhood. You played freely, uncaring of gender norms you skipped, danced, played ball games. You speak out loud, but with force, "I am free." ',
                setState: { noBinary: true },
                nextText: 5
            },
            {
                text: 'You remember the apple in your pocket and think of the joy that cooking brought you. You say quietly, "I am a chef!", and smile. ',
                requiredState: (currentState) => currentState.apple,
                setState: { chef: true},
                nextText: 5
            },
            {
                text: 'You stay quiet. You were told never to listen to voices you could not attach to a being.',
                setState:  {sceptical: true},
                nextText: 5
            },
            {
                text: 'You think about your dreams again, and how within them you are a dancer by night, explorer by day. You shout at the top of your lungs "I AM MULTI-FACETED!" ',
                setState: { vanguard: true },
                nextText: 5
            }
        ]

    },
    {
        id: 5,
        text: 'You eventually see a light at the end of the passage and run towards it. You exit this winding cave and see a sprawling city filled with life ahead of you. As you make your way towards it you pause.',
        options: [
            {
                text: 'Now that you have remembered your life of freedom, you have realised you cannot return to the limits of this city. You want to be one with the trees, the rivers, the mountains. You turn your back on the city and choose freedom on your own terms.',
                requiredState: (currentState) => currentState.noBinary,
                nextText: 6
            },
            {
                text: 'You have been thinking of recipes for the last few hours. You think you can open a community kitchen in this city and you smile, striding towards a new career path.',
                requiredState: (currentState) => currentState.chef,
                nextText: 7
            },
            {
                text: 'You walk towards the city slowly, weighed down by hesitancy. You stop noticing the way you are walking, and the next time you look up, you realise you have returned to the forest once again.',
                requiredState: (currentState) => currentState.sceptical,
                nextText: 8
            },
            {
                text: 'You have been thinking of dance routines and treasure non-stop on your journey. You make your way directly to a bar to find your dance crew and live out your travelling dreams.',
                requiredState: (currentState) => currentState.vanguard,
                nextText: 9
            }
        ]

    },
    {
        id: 6,
        text: 'Freedom looks good on you. Remember to question the ways that you live within gender binaries in your own life. I believe in you.🥰',
        options: [
            {
                text: 'Restart?',
                nextText: -1
            }
        ]

    },
    {
        id: 7,
        text: 'The community kitchen is a hit! People from all walks of life step through your doors, and you expand the business to teach young people how to cook, while reminding them to follow their dreams. Life is good. You have completed the game! 🥳',
        options: [
            {
                text: 'Restart?',
                nextText: -1
            }
        ]

    },
    {
        id: 8,
        text: 'It seems you have not escaped the forest today.',
        options: [
            {
                text: 'Restart?',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'Who knew dancing and treasure hunting would be such a lucrative business! You are rich! But, most importantly, you are happy. You have completed the game! 🥳',
        options: [
            {
                text: 'Restart?',
                nextText: -1
            }
        ]
    }
]

startGame();

let deck = [];
const tipos = [ 'C', 'D', 'H', 'S'];
const especiales = [ 'A', 'J', 'Q', 'K' ];

let puntosJugador = 0,
    puntosComputadora = 0;

//referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#Jugador-cartas');
const divCartasComputador = document.querySelector('#Computadora-cartas');
const puntosHTML = document.querySelectorAll('small');


//esta función crea un nuevo deck (una nueva baraja)
const crearDeck = () => {

    for( let i = 2; i <= 10; i++) {
        for( let tipo of tipos ){
            deck.push( i + tipo);
        }

    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo );
        }
    }

    //console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;

};


crearDeck();


//esta función me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay más cartas en el deck'
    }
    const carta = deck.pop();

    return carta;
};

//pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor )) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

};

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
            
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora
            
        //<img class="carta" src="assets/cartas/2C.png"> 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputador.append(imgCarta);

        if( puntosMinimos > 21 ) {
            break;
        }
        

    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21));

    setTimeout(() => {

        if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
        } else if (puntosMinimos > 21) {
                alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Nadie gana');
        }
    }, 10 );
    

}



//eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador
    
    //<img class="carta" src="assets/cartas/2C.png"> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    if( puntosJugador > 21 ) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugador);

    } else if ( puntosJugador === 21 ) {
        console.warn('21, Ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    }
});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );


})



btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];

    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputador.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})


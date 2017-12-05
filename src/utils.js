export const centerGameObjects = ( objects ) => {
    objects.forEach( function( object ) {
        object.anchor.setTo( 0.5 );
    } );
}

export const random = ( min = 0, max = 1 ) => {
    return Math.random() * ( max - min ) + min;
}

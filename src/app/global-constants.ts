/* eslint-disable max-len */
export const GLOBAL_CONSTANTS = {
    rowLength: 8,
    columnLength: 8,
    moveIcons: ['play-outline', 'play-forward-outline'],
    faceIcons: { south: 'arrow-back', west: 'arrow-up', north: 'arrow-forward', east: 'arrow-down' },
    faceArray: ['South', 'West', 'North', 'East'],
    colorIcons: { icon: 'radio-button-on-outline', black: 'black-pawn', white: 'white-pawn' },
    error: {
        invalidPlace: 'First place the pawn.',
        invalidMove: 'Invalid move. Pawn will fall of board.',
    },
    success: {
        validPlace: 'The place command executed successfully.',
        validMove: 'The move command executed successfully.',
        validLeft: 'The left command executed successfully.',
        validRight: 'The right command executed successfully.',
        validReport: 'The report command executed successfully.',
    },
    aboutCommands: [
        {
            heading: 'PLACE X,Y,F,C',
            info: 'PLACE will put the pawn on the board in position X, Y, facing NORTH, SOUTH, EAST or WEST and Colour(White or Black)',
        },
        {
            heading: 'MOVE X',
            info: 'MOVE will move the pawn one unit forward in the direction it is currently facing. The first time that the pawn moves it can move 1 or 2 squares.',
        },
        {
            heading: 'LEFT',
            info: 'LEFT will rotate the pawn -90 degrees without changing the position of the pawn.',
        },
        {
            heading: 'RIGHT',
            info: 'RIGHT will rotate the pawn -90 degrees without changing the position of the pawn.',
        },
        {
            heading: 'REPORT',
            info: 'REPORT will announce the X,Y,F and C of the pawn. This can be in any form, but standard output is sufficient.',
        },
    ]
};

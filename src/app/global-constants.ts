/* eslint-disable max-len */
export const GLOBAL_CONSTANTS = {
    rowLength: 8,
    columnLength: 8,
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

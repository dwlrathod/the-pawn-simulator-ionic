export enum Face {
    south = 'South',
    west = 'West',
    north = 'North',
    east = 'East',
    none = 'None',
};

export enum Color {
    black = 'Black',
    white = 'White',
    none = 'None',
}

export enum Command {
    place = 'PLACE',
    move = 'MOVE',
    left = 'LEFT',
    right = 'RIGHT',
    report = 'REPORT'
}

export enum ExecutionStatus {
    error = 'ERROR',
    success = 'SUCCESS'
}

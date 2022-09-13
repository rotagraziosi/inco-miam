export interface SnackbarInformations {
    message: string;
    type: SnackbarType;
}

export interface SnackbarComponentInformations extends SnackbarInformations {
    visible: boolean;
}

export enum SnackbarType {
    error = 'error',
    warning = 'warning',
    info = 'info',
    success = 'success'
}   
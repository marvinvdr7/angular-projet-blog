import { FormGroup } from '@angular/forms';

// Contrainte de validité personnalisée
export function PasswordsMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // Si il n'y à pas d'erreurs de validator sur le champ "confirmation du mot de passe" et que les passwords sont ok, on ne va pas plus loin
        if (matchingControl.errors && !matchingControl.errors.passwordsMatch) {
            return;
        }

        // Définir une erreur sur matchingControl (confirmation du mot de passe) si la validation échoue
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordsMatch: true });
        } else {
            // Sinon on remet les erreurs a null
            matchingControl.setErrors(null);
        }
    }
}
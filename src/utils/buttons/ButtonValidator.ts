
export default interface ButtonValidator {
    hasDuplicateTitles(): boolean;
    hasEmptyInputs(): boolean;
    hasInvalidUrlButtons(): boolean;
    hasDuplicateOrders(): boolean;
    hasButtonLimitReached(): boolean;
}

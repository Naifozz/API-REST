export async function livreValidation(livre) {
    const errors = [];
    if (!livre.title || livre.title.length < 3) {
        errors.push("Title must be at least 3 characters");
    }
    if (!livre.content || livre.content.length < 10) {
        errors.push("Content must be at least 10 characters");
    }
    if (!livre.ISBN || livre.ISBN.length < 13) {
        errors.push("ISBN is required and must be 13 numbers");
    }
    return errors.length > 0 ? errors : null;
}

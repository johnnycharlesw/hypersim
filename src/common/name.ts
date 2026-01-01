class Name {
    prefixes: string[];
    firstName: string;
    middleName: string;
    lastName: string;
    suffixes: string[];
    constructor(prefixes: string[], firstName: string, middleName: string, lastName: string, suffixes: string[]) {
        this.prefixes = prefixes;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.suffixes = suffixes;
    }

    getFullName() {
        let fullName = "";
        if (this.prefixes.length > 0) {
            fullName += this.prefixes.join(" ");
        }
        if (this.firstName.length > 0) {
            fullName += " " + this.firstName;
        }
        if (this.middleName.length > 0) {
            fullName += " " + this.middleName;
        }
        if (this.lastName.length > 0) {
            fullName += " " + this.lastName;
        }
        if (this.suffixes.length > 0) {
            fullName += " " + this.suffixes.join(" ");
        }
        return fullName;
    }

    getInitials() {
        let initials = "";
        if (this.firstName.length > 0) {
            initials += this.firstName.charAt(0);
        }
        if (this.middleName.length > 0) {
            initials += this.middleName.charAt(0);
        }
        if (this.lastName.length > 0) {
            initials += this.lastName.charAt(0);
        }
        return initials.toUpperCase();
    }
}

export {Name};
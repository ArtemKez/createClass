class User {
    constructor({name, surname}) {
        this._name = name;
        this._surname = surname;
    }

    isWord(string) {
        return string && string.length >= 2 && /^[a-zA-Z]{2,}$/.test(string);
    }

    get surnameWithInitials() {
        return `${this._surname} ${this._name[0]}.`;
    }

    get name() {
        return this._name;
    }

    set name(new_name) {
        if (!this.isWord(new_name)) {
            throw new Error('the minimum length of the name is 2 characters and it must only consist of letters')
        }
        this._name = new_name;
    }

    get surname() {
        return this._surname;
    }

    set surname(new_surname) {
        if (!this.isWord(new_surname)) {
            throw new Error('the minimum length of the surname is 2 characters and it must only consist of letters')
        }
        this._surname = new_surname;
    }

    get fullName() {
        return `${this._name} ${this._surname}`;
    }

    set fullName(fullname) {
        const [name, surname] = fullname.split(' ');
        if (!this.isWord(name) || !this.isWord(surname)) {
            throw new Error('the minimum length of the name and surname is 2 characters and it must only consist of letters')
        }
        this._name = name;
        this._surname = surname;
    }
}

class Student extends User {
    constructor({name, surname, year}) {
        super({name, surname});
        this._year = year;
    }

    get year() {
        return this._year;
    }

    set year(thisYear) {
        if (/^\d{4}$/.test(thisYear)) {
            this._year = thisYear;
        }
    }

    get course() {
        return (new Date().getFullYear() - this._year);
    }
}

class Group {
    #students

    constructor(name, ...students) {
        this.name = name;
        this.#students = students;
    }

    get students() {
        return this.#students;
    }

    set students(new_students) {
        this.#students = new_students;
    }

    addStudent(student) {
        if (this.isExistsStudent(student)) {
            throw new Error(`Student ${student.fullName} already exists in group`);
        }
        this.#students.push(student);
    }

    isExistsStudent(student) {
        if (!student instanceof Student) {
            throw new Error('Student must be instance of Student class');
        }

        return this.#students.some(value => {
            return value.name === student.name
                && value.surname === student.surname
                && value.year === student.year;
        });
    }

    removeStudent(student) {
        if (!this.isExistsStudent(student)) {
            throw new Error(`Student ${student.fullName} is not exists in group`);
        }
        this.#students = this.#students.filter(value => {
            return value.name !== student.name
                || value.surname !== student.surname
                || value.year !== student.year;
        })
    }

    showStudents() {
        for (let i = 0; i < this.#students.length; i++) {
            console.log(this.#students[i].surnameWithInitials);
        }
    }
}

const student1 = new Student({
    name: 'Vasya',
    surname: 'Pupkin',
    year: 2019
})
const student2 = new Student({
    name: 'Petya',
    surname: 'Zadov',
    year: 2019
})
const student3 = new Student({
    name: 'john',
    surname: 'Uick',
    year: 2019
})
const student4 = new Student({
    name: 'Jim',
    surname: 'Reynor',
    year: 2019
})
const group = new Group('group1', student1, student2, student3);
group.showStudents()
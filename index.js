class User {
    constructor(name, surname,) {
        this.name = name;
        this.surname = surname;
    }

    fullName() {
        return `${this.name} ${this.surname}`
    }

    surnameWithInitials() {
        return `${this.surname} ${this.name[0]}.`
    }

}

class Student extends User {
    constructor(name, surname, year) {
        super(name, surname)
        this.year = year
    }

    getCourse() {
        return (new Date().getFullYear() - this.year)
    }
}

class Group {
    #students

    constructor(name, ...students) {
        this.name = name
        this.#students = students
    }

    showStudents() {
        for (let i = 0; i < this.#students.length; i++) {
            console.log(this.#students[i].surnameWithInitials())
        }
    }
}

const student1 = new Student('user1', 'sUser1', 2019)

const student2 = new Student('user1', 'sUser2', 2020)

const group = new Group('group1', student1, student2)
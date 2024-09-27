'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.courses = seedData.courses;
    this.users = seedData.users;
    this.events = seedData.events;  // Adding events to seed data
    this.journals = seedData.journals;  // Adding journals to seed data
    this.conferences = seedData.conferences;  // Adding conferences to seed data
    this.books = seedData.books;
    this.patents = seedData.patents;
    this.enableLogging = enableLogging;
    this.context = new Context('fsjstd-restapi.db', enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context
      .retrieveValue(`
        SELECT EXISTS (
          SELECT 1 
          FROM sqlite_master 
          WHERE type = 'table' AND name = ?
        );
      `, tableName);
  }

  createUser(user) {
    return this.context
      .execute(`
        INSERT INTO Users
          (firstName, lastName, emailAddress, password, affiliation, areasOfInterest, homepage, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password,
      user.affiliation,
      user.areasOfInterest,
      user.homepage,
      user.createdAt,
      user.updatedAt); 
  }

  createCourse(course) {
    return this.context
      .execute(`
        INSERT INTO Courses
          (userId, title, description, estimatedTime, materialsNeeded, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      course.userid,
      course.title,
      course.description,
      course.estimatedTime,
      course.materialsNeeded);
  }

  createEvent(event) {
    return this.context
      .execute(`
        INSERT INTO Events
          (userId, title, description, eventType, participationType, eventDate, location, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      event.userid,
      event.title,
      event.description,
      event.eventType,
      event.participationType,
      event.eventDate,
      event.location);
  }

  createJournal(journal) {
    return this.context
      .execute(`
        INSERT INTO Journals
          (userId, title, authors, publicationDate, journal, volume, issue, pages, publisher, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      journal.userid,
      journal.title,
      journal.authors,
      journal.publicationDate,
      journal.journal,
      journal.volume,
      journal.issue,
      journal.pages,
      journal.publisher);
}

    // Function to create a single conference record
      createConference(conference) {
        return this.context
          .execute(`
            INSERT INTO Conferences
              (userId, title, authors, publicationDate, conference, volume, issue, pages, createdAt, updatedAt)
            VALUES
              (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
          `,
          conference.userid,
          conference.title,
          conference.authors,
          conference.publicationDate,
          conference.conference,
          conference.volume,
          conference.issue,
          conference.pages);
      }

      createBook(book) {
        return this.context
          .execute(`
            INSERT INTO Books
              (userId, title, authors, publicationDate, volume, pages, createdAt, updatedAt)
            VALUES
              (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
          `,
          book.userid,
          book.title,
          book.authors,
          book.publicationDate,
          book.volume,
          book.pages);
      }

      createPatent(patent) {
        return this.context
          .execute(`
            INSERT INTO Patents
              (userId, title, inventors, publicationDate, patentOffice, patentNumber, applicationNumber, createdAt, updatedAt)
            VALUES
              (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
          `,
          patent.userid,
          patent.title,
          patent.inventors,
          patent.publicationDate,
          patent.patentOffice,
          patent.patentNumber,
          patent.applicationNumber);
      }

  async hashUserPasswords(users) {
    const usersWithHashedPasswords = [];

    for (const user of users) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      usersWithHashedPasswords.push({ ...user, password: hashedPassword });
    }

    return usersWithHashedPasswords;
  }

  async createUsers(users) {
    for (const user of users) {
      await this.createUser(user);
    }
  }

  async createCourses(courses) {
    for (const course of courses) {
      await this.createCourse(course);
    }
  }

  async createEvents(events) {
    for (const event of events) {
      await this.createEvent(event);
    }
  }

  async createJournals(journals) {
    for (const journal of journals) {
      await this.createJournal(journal);
    }
  }


      // Function to create multiple conference records
    async createConferences(conferences) {
      for (const conference of conferences) {
        await this.createConference(conference);
      }
    }


    async createBooks(books) {
      for (const book of books) {
        await this.createBook(book);
      }
    }

    async createPatents(patents) {
      for (const patent of patents) {
        await this.createPatent(patent);
      }
    }

  async init() {
    const userTableExists = await this.tableExists('Users');

    if (userTableExists) {
      this.log('Dropping the Users table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Users;
      `);
    }

    this.log('Creating the Users table...');

    await this.context.execute(`
      CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firstName VARCHAR(255) NOT NULL DEFAULT '', 
        lastName VARCHAR(255) NOT NULL DEFAULT '', 
        emailAddress VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
        password VARCHAR(255) NOT NULL DEFAULT '',
        affiliation VARCHAR(255) NOT NULL DEFAULT '',
        areasOfInterest TEXT NOT NULL DEFAULT '',
        homepage VARCHAR(255) NOT NULL DEFAULT '', 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
      );
    `);

    this.log('Hashing the user passwords...');

    const users = await this.hashUserPasswords(this.users);

    this.log('Creating the user records...');

    await this.createUsers(users);

    const courseTableExists = await this.tableExists('Courses');

    if (courseTableExists) {
      this.log('Dropping the Courses table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Courses;
      `);
    }

    this.log('Creating the Courses table...');

    await this.context.execute(`
      CREATE TABLE Courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        estimatedTime VARCHAR(255), 
        materialsNeeded VARCHAR(255), 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userid INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the course records...');

    await this.createCourses(this.courses);

    const eventTableExists = await this.tableExists('Events');

    if (eventTableExists) {
      this.log('Dropping the Events table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Events;
      `);
    }

    this.log('Creating the Events table...');

    await this.context.execute(`
      CREATE TABLE Events (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        eventType VARCHAR(255) NOT NULL DEFAULT '', 
        participationType VARCHAR(255) NOT NULL DEFAULT '', 
        eventDate DATETIME NOT NULL, 
        location VARCHAR(255) NOT NULL DEFAULT '',
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userid INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the event records...');

    await this.createEvents(this.events);

    const journalTableExists = await this.tableExists('Journals');

if (journalTableExists) {
    this.log('Dropping the Journals table...');

    await this.context.execute(`
        DROP TABLE IF EXISTS Journals;
    `);
}

this.log('Creating the Journals table...');

await this.context.execute(`
    CREATE TABLE Journals (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        authors TEXT NOT NULL DEFAULT '', 
        publicationDate DATETIME NOT NULL, 
        journal VARCHAR(255) NOT NULL DEFAULT '', 
        volume VARCHAR(50) NOT NULL DEFAULT '', 
        issue VARCHAR(50) NOT NULL DEFAULT '', 
        pages VARCHAR(50) NOT NULL DEFAULT '', 
        publisher VARCHAR(255) NOT NULL DEFAULT '',
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userid INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
`);

this.log('Creating the journal records...');

await this.createJournals(this.journals);




      // Function to check if the Conferences table exists
      const conferenceTableExists = await this.tableExists('Conferences');

      if (conferenceTableExists) {
          this.log('Dropping the Conferences table...');

          await this.context.execute(`
              DROP TABLE IF EXISTS Conferences;
          `);
      }

      this.log('Creating the Conferences table...');

      // Create the Conferences table with the specified fields
      await this.context.execute(`
          CREATE TABLE Conferences (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              title VARCHAR(255) NOT NULL DEFAULT '', 
              authors TEXT NOT NULL DEFAULT '', 
              publicationDate DATETIME NOT NULL, 
              conference VARCHAR(255) NOT NULL DEFAULT '', 
              volume VARCHAR(50) NOT NULL DEFAULT '', 
              issue VARCHAR(50) NOT NULL DEFAULT '', 
              pages VARCHAR(50) NOT NULL DEFAULT '', 
              createdAt DATETIME NOT NULL, 
              updatedAt DATETIME NOT NULL, 
              userid INTEGER NOT NULL DEFAULT -1 
                REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
          );
      `);

      this.log('Creating the conference records...');

      // Example array of conference records to be inserted
      await this.createConferences(this.conferences);



      const bookTableExists = await this.tableExists('Books');

if (bookTableExists) {
  this.log('Dropping the Books table...');

  await this.context.execute(`
    DROP TABLE IF EXISTS Books;
  `);
}

this.log('Creating the Books table...');

await this.context.execute(`
  CREATE TABLE Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title VARCHAR(255) NOT NULL DEFAULT '', 
    authors TEXT NOT NULL DEFAULT '', 
    publicationDate DATETIME NOT NULL, 
    volume VARCHAR(50), 
    pages VARCHAR(50) NOT NULL DEFAULT '', 
    createdAt DATETIME NOT NULL, 
    updatedAt DATETIME NOT NULL, 
    userid INTEGER NOT NULL DEFAULT -1 
      REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`);

this.log('Creating the book records...');

await this.createBooks(this.books);


const patentTableExists = await this.tableExists('Patents');

    if (patentTableExists) {
      this.log('Dropping the Patents table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Patents;
      `);
    }

    this.log('Creating the Patents table...');

    await this.context.execute(`
      CREATE TABLE Patents (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        inventors TEXT NOT NULL DEFAULT '', 
        publicationDate DATETIME NOT NULL, 
        patentOffice VARCHAR(255) NOT NULL DEFAULT '', 
        patentNumber VARCHAR(50) NOT NULL DEFAULT '' UNIQUE, 
        applicationNumber VARCHAR(50) NOT NULL DEFAULT '' UNIQUE, 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userid INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the patent records...');

    await this.createPatents(this.patents);



    this.log('Database successfully initialized!');

  }
}

module.exports = Database;

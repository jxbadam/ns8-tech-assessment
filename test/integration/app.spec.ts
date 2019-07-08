import "mocha";
import request from "supertest";
import { expect } from "chai";

import { app, server } from "../../src/index";
import { sleep } from "../../src/lib/util";

const DEFAULT_DELAY_BETWEEN_EVENTS_MILLIS = 200;

const VALID_USER_WITH_PHONE = {
  "email": "test@ns8.com",
  "password": "passwordIsPizza",
  "phone": "333-222-1111",
};

const VALID_USER_NO_PHONE = {
  "email": "test-2@ns8.com",
  "password": "passwordIsPizza",
};

const INVALID_USER_NO_EMAIL = {
  "password": "passwordIsPizza",
};

const INVALID_USER_EMPTY_EMAIL = {
  "email": "",
  "password": "passwordIsPizza",
};

const INVALID_USER_INVALID_EMAIL = {
  "email": "fubar",
  "password": "passwordIsPizza",
};

const INVALID_USER_INVALID_PHONE = {
  "email": "test@ns8.com",
  "password": "passwordIsPizza",
  "phone": "3-2-1",
};

const INVALID_LOGIN_BAD_EMAIL = {
  "email": "test-X@ns8.com",
  "password": "passwordIsPizza",
};

const INVALID_LOGIN_BAD_PASSWORD = {
  "email": "test@ns8.com",
  "password": "passwordIsALie",
};

function getEventRange(totalEvents: number, start?: number, end?: number) {
  return describe("[GET] /event/range", () => {
    it("should get all events in a given time range", (done) => {
      request(app)
        .get("/event/range")
        .query({start: start, end: end})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          // Yay uncertainty in tests (boo!)
          expect(body.length).to.be.gte(totalEvents - 1);
          expect(body.length).to.be.lte(totalEvents);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
}

function getUserEventTest(userId: number, totalEvents: number) {
  return describe("[GET] /event/user", () => {
    it("should get all events", (done) => {
      request(app)
        .get("/event/user")
        .query({userId: userId})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.length).to.equal(totalEvents);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
}

function getEventTest(type: string, id: number) {
  return describe("[POST] /event", () => {
    it("should create an event for the currently logged in user", (done) => {
      request(app)
        .post("/event")
        .set("Accept", "application/json")
        .send({
          type
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.id).to.equal(id);
          expect(body.type).to.equal(type);

          return sleep(DEFAULT_DELAY_BETWEEN_EVENTS_MILLIS);
        })
        .then(done)
        .catch((err) => {
          done(err);
        });
    });
  });
}

function getFailingGetTest(route: string, query: object, statusCode: number, errorToken: string) {
  return describe("[GET] " + route, () => {
    it("should return status code " + statusCode + " with error " + errorToken, (done) => {
      request(app)
        .get(route)
        .query(query)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.errors.length).to.equal(1);
          expect(body.errors[0]).to.equal(errorToken);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
}

function getFailingPostTest(route: string, user, statusCode: number, errorToken: string) {
  return describe("[POST] " + route, () => {
    it("should return status code " + statusCode + " with error " + errorToken, (done) => {
      request(app)
        .post(route)
        .set("Accept", "application/json")
        .send(user)
        .expect("Content-Type", /json/)
        .expect(statusCode)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.errors.length).to.equal(1);
          expect(body.errors[0]).to.equal(errorToken);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
}

describe("(integration) NAS-8 Code Challenge Integration Test Suite", () => {
  // Not Found route (always 404, can be any non-existent route)
  describe("[GET] /not-found", () => {
    it("should result in 404 with a known response body", (done) => {
        request(app)
        .get("/not-found")
        .then((response) => {
          expect(response.status).to.equal(404);
          expect(response.text).to.equal("/not-found: not found");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Sys Alive route [really not a good integration test candidate]
  describe("[GET] /sys/alive", () => {
    it("should result in a 200 response", (done) => {
        request(app)
        .get("/sys/alive")
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Failing Event Test (no user logged in)
  getFailingPostTest("/event", {test: "LOGIN"}, 400, "not_logged_in");

  // User Tests
  getFailingPostTest("/user", INVALID_USER_NO_EMAIL, 400, "email_required");
  getFailingPostTest("/user", INVALID_USER_EMPTY_EMAIL, 400, "email_empty");
  getFailingPostTest("/user", INVALID_USER_INVALID_EMAIL, 400, "invalid_email");
  getFailingPostTest("/user", INVALID_USER_INVALID_PHONE, 400, "invalid_phone_format");

  describe("[POST] /user", () => {
    it("should create a new user with a phone number", (done) => {
      request(app)
        .post("/user")
        .set("Accept", "application/json")
        .send(VALID_USER_WITH_PHONE)
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.id).to.equal(1);
          expect(body.email).to.equal(VALID_USER_WITH_PHONE.email);
          expect(body.password).to.equal(VALID_USER_WITH_PHONE.password);
          expect(body.phoneNumber).to.equal(VALID_USER_WITH_PHONE.phone);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Second attempt to create with the same email fails
  getFailingPostTest("/user", VALID_USER_WITH_PHONE, 400, "email_already_taken");

  describe("[POST] /user", () => {
    it("should create a new user with NO phone number", (done) => {
      request(app)
        .post("/user")
        .set("Accept", "application/json")
        .send(VALID_USER_NO_PHONE)
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.id).to.equal(2);
          expect(body.email).to.equal(VALID_USER_NO_PHONE.email);
          expect(body.password).to.equal(VALID_USER_NO_PHONE.password);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Test logins
  getFailingPostTest("/login", INVALID_LOGIN_BAD_EMAIL, 401, "no_user_found");
  getFailingPostTest("/login", INVALID_LOGIN_BAD_PASSWORD, 401, "invalid_password");

  describe("[POST] /login", () => {
    it("should allow a login of the same (already logged in) user", (done) => {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send(VALID_USER_NO_PHONE)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.id).to.equal(2);
          expect(body.email).to.equal(VALID_USER_NO_PHONE.email);
          expect(body.password).to.equal(VALID_USER_NO_PHONE.password);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Event Tests (bad events)
  getFailingPostTest("/event", {}, 400, "invalid_event_type");
  getFailingPostTest("/event", {type: ""}, 400, "empty_event_type");

  // Event Tests (add some events)
  const start = (new Date()).getTime();
  getEventTest("LOGIN", 1);
  getEventTest("PAGE-A", 2);
  getEventTest("PAGE-B", 3);
  getEventTest("PAGE-C", 4);

  // switch users to make more events and to allow for the report testing
  describe("[POST] /login", () => {
    it("should login a different user", (done) => {
      request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send(VALID_USER_WITH_PHONE)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.id).to.equal(1);
          expect(body.email).to.equal(VALID_USER_WITH_PHONE.email);
          expect(body.password).to.equal(VALID_USER_WITH_PHONE.password);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // Event Tests (add some events)
  getEventTest("LOGIN", 5);
  getEventTest("PAGE-A", 6);
  getEventTest("PAGE-C", 7);

  // Test getting all events
  describe("[GET] /event", () => {
    it("should get all events", (done) => {
      request(app)
        .get("/event")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // test the contents of the response
          const body = response.body;

          expect(body.length).to.equal(7);

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  getUserEventTest(1, 3);
  getUserEventTest(2, 4);

  const end = start + Math.ceil(DEFAULT_DELAY_BETWEEN_EVENTS_MILLIS * 5.5);
  getEventRange(5, start, end);
  getEventRange(7);

  getFailingGetTest("/event/user", {}, 400, "invalid_user");
  getFailingGetTest("/event/range", {end: end}, 400, "start_required_if_end_present");
  getFailingGetTest("/event/range", {start: end, end: start}, 400, "invalid_time_range");
});

// Called after all tests (I hope)
after(() => {
  server.close();
});

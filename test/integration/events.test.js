const request = require("supertest");
const { findActor, createActor } = require("../../models/actor");
const { findRepo, createRepo } = require("../../models/repo");
const {
  addEvent,
  getEvent,
  getEvents,
  getEventsByActor,
  validateEvent,
  deleteEvent,
  eventTransformers
} = require("../../models/event");
const { deleteActor } = require("../../models/actor");
const { deleteRepo } = require("../../models/repo");

let server;

describe("/events", () => {
  // Opening a Server connection
  beforeEach(async () => {
    server = require("../../app");
  });

  // Close a Server connection
  afterEach(async () => {
    var isDeleted = await deleteEvent();
    if (isDeleted) {
      await deleteActor();
      await deleteRepo();
    }
  });

  describe("GET /", async () => {
    let event;
    beforeEach(() => {
      event = {
        id: 12345,
        type: "PushEvent",
        actor: {
          id: 12345,
          login: "tests",
          avatar_url: "http://banme.test.in"
        },
        repo: {
          id: 12345,
          name: "tests",
          url: "https://banme.test.in"
        },
        created_at: "2018-09-07 06:13:31"
      };
    });
    const exec = async () => {
      await createActor(event.actor);
      await createRepo(event.repo);
      await addEvent(event);
    };
    it("should return status 200 with events ", async () => {
      await exec();
      const res = await request(server).get("/events");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some(g => g.type === "PushEvent")).toBeTruthy();
    });
  });

  describe("GET /events/actors/:id", async () => {
    let event;
    beforeEach(() => {
      event = {
        id: 12345,
        type: "PushEvent",
        actor: {
          id: 12345,
          login: "tests",
          avatar_url: "http://banme.test.in"
        },
        repo: {
          id: 12345,
          name: "tests",
          url: "https://banme.test.in"
        },
        created_at: "2018-09-07 06:13:31"
      };
    });
    const exec = async () => {
      await createActor(event.actor);
      await createRepo(event.repo);
      await addEvent(event);
    };
    it("should return 200 with actors if valid actor is passed", async () => {
      await exec();
      const res = await request(server).get("/events/actors/" + event.actor.id);
      expect(res.status).toBe(200);
    });

    it("should return 404 event if inValid actor is passed", async () => {
      await exec();
      const res = await request(server).get("/events/actors/" + 34544);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /actors/streak/", async () => {
    let event;
    beforeEach(() => {
      event = {
        id: 12345,
        type: "PushEvent",
        actor: {
          id: 12345,
          login: "tests",
          avatar_url: "http://banme.test.in"
        },
        repo: {
          id: 12345,
          name: "tests",
          url: "https://banme.test.in"
        },
        created_at: "2018-09-07 06:13:31"
      };
    });
    const exec = async () => {
      await createActor(event.actor);
      await createRepo(event.repo);
      await addEvent(event);
    };

    it("should return 200 event actors streaks available ", async () => {
      await exec();
      const res = await request(server).get("/actors/streak");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("url", event.actor.url);
    });
  });

  describe("POST /events", async () => {
    let event;
    beforeEach(() => {
      event = {
        id: 12345,
        type: "PushEvent",
        actor: {
          id: 12345,
          login: "tests",
          avatar_url: "http://banme.test.in"
        },
        repo: {
          id: 12345,
          name: "tests",
          url: "https://banme.test.in"
        },
        created_at: "2018-09-07 06:13:31"
      };
    });
    const exec = async () => {
      return await request(server)
        .post("/events/")
        .send(event);
    };

    it("should return 400 if actor login is less than 5 chars", async () => {
      event.actor.login = "tes";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if actor is passed", async () => {
      event.actor = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400  if actor id is passed", async () => {
      event.actor.id = "";
      await exec();
      const res = await request(server).post("/events/");
      expect(res.status).toBe(400);
    });

    it("should return 400 if repo name is less than 5 chars", async () => {
      event.repo.name = "tes";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if repo is passed", async () => {
      event.repo = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400  if repo id is passed", async () => {
      event.repo.id = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 201 if event passed", async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });
  });

  describe("DELETE /erase", async () => {
    beforeEach(() => {
      event = {
        id: 12345,
        type: "PushEvent",
        actor: {
          id: 12345,
          login: "tests",
          avatar_url: "http://banme.test.in"
        },
        repo: {
          id: 12345,
          name: "tests",
          url: "https://banme.test.in"
        },
        created_at: "2018-09-07 06:13:31"
      };
    });

    const exec = async () => {
      await createActor(event.actor);
      await createRepo(event.repo);
      await addEvent(event);
    };

    it("should return status 200 with events ", async () => {
      await exec();
      const res = await request(server).get("/erase");
      console.log(res);
      expect(res.status).toBe(200);
    });
  });
});

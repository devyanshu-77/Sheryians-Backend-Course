# Backend Fundamentals — Class Notes

## 1. What is a Server?

A server is a computer or program that runs continuously, waiting to receive requests from clients (such as browsers or apps). When a request arrives, the server processes it and sends back an appropriate response.

Every server has its own operating system and processing resources, and it can serve many clients at the same time.

## 2. What is a Client?

A client is any device or application that sends a request to a server and consumes its response — for example, a web browser, a mobile app, or another server.

## 3. What is an API?

An API (Application Programming Interface) is a defined set of rules that allows two software systems to communicate with each other. It specifies what requests can be made, how to make them, and what data format to expect in return — acting as a contract between the client and the server.

A **REST API** is simply an API that follows a common set of conventions (using HTTP methods and URLs to represent actions on resources), which is the most widely used style for web APIs.

## 4. Types of Servers

| Type | Purpose |
|---|---|
| Web server | Serves websites and web content |
| Mail server | Sends, receives, and stores email |
| Database server | Stores and manages application data |
| Application server | Runs the business logic of an application |

---

## 5. What is a Runtime?

A runtime is the environment in which JavaScript code is executed outside of a browser.

- **Node.js** — the original JS runtime, built on Chrome's V8 engine.
- **Bun** — a newer runtime, designed to be faster than Node.js and ships with additional built-in tools.

> A runtime and an engine are not the same thing. The **engine** is the component that actually executes your code; the **runtime** wraps the engine and adds extra capabilities (like file system access).

---

## 6. Initializing a Node Project

```bash
npm init       # prompts for details — name, version, author, license, etc.
npm init -y    # skips the prompts and uses default values
```

Both commands generate a `package.json` file in the project's root directory.

---

## 7. package.json — The Project Manifest

`package.json` is the manifest file of a Node.js project. It isn't meant for end users — it exists to describe the project to other developers and to tooling used during deployment.

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "What your app does",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "chalk": "^5.6.2",
    "commander": "^14.0.3"
  },
  "devDependencies": {}
}
```

### Field reference

| Field | Purpose |
|---|---|
| `name` | The name of the application |
| `version` | Current version, following semantic versioning |
| `description` | A short summary of what the app does |
| `main` | The entry point — the first file executed when the app starts |
| `scripts` | Custom commands, run with `npm run <script-name>` |
| `keywords` | Tags that help describe or categorize the app |
| `author` | The developer or organization who created it |
| `license` | The license under which the code is distributed |
| `type` | `"module"` enables `import`/`export` syntax; `"commonjs"` uses `require`/`module.exports` |
| `dependencies` | Packages required for the app to run in production |
| `devDependencies` | Packages required only during development, e.g. linters and test runners |

> **Note:** Setting `"type": "commonjs"` only changes the module syntax you use — it does not restrict you to older JavaScript. Features like `async/await` remain fully available.

---

## 8. What is npm?

npm (Node Package Manager) is the default package manager for Node.js. It is used to install, update, and remove third-party packages, initialize projects, and run custom scripts.

### Common npm commands

```bash
# Project setup
npm init -y
npm init

# Running scripts
npm run <script-name>

# Managing packages
npm install <package-name>
npm install <package-name> --save-dev   # installs as a devDependency
npm update <package-name>
npm uninstall <package-name>
```

---

## 9. Internal vs External Packages

**Internal (built-in) packages** ship with Node.js and require no installation.
Examples: `fs`, `os`, `http`, `path`, `process`

**External packages** are third-party libraries published by other developers and installed via npm.
Examples: `axios`, `express`, `mongoose`, `chalk`

---

## 10. Semantic Versioning (SemVer)

Package versions follow the format `MAJOR.MINOR.PATCH`.

| Part | Incremented when |
|---|---|
| `MAJOR` | Breaking changes are introduced that are not backward-compatible |
| `MINOR` | New, backward-compatible functionality is added |
| `PATCH` | Backward-compatible bug fixes are made |

### Version specifiers in package.json

| Syntax | Meaning |
|---|---|
| `^5.3.0` | Allow any version `>=5.3.0` and `<6.0.0` |
| `5.3.0` | Install exactly this version |
| `latest` | Always install the newest available version |

---

## 11. package-lock.json

Running `npm install` generates a `package-lock.json` file, which records the exact version of every installed package and sub-dependency.

This guarantees that anyone who clones the project and runs `npm install` gets the identical dependency tree — eliminating inconsistencies caused by dependencies updating between installs.

> `package.json` declares what you **want**. `package-lock.json` records exactly what you **got**.

---

## 12. What is HTTP?

HTTP (HyperText Transfer Protocol) is the protocol that governs communication between a client and a web server.

Key properties:

- **Client-server model** — the client initiates a request, and the server returns a response.
- **Stateless** — each request is handled independently; the server does not retain information about previous requests unless explicitly designed to (e.g. via cookies or tokens).
- **Media independent** — HTTP can transport any type of data (text, HTML, JSON, images, video) using the same underlying protocol.

**HTTPS** is HTTP layered with encryption (via TLS/SSL), ensuring data exchanged between client and server cannot be read or tampered with in transit.

---

## 13. Domain Names and IP Addresses

A **domain name** is the human-readable address used to locate a server on the internet.
Examples: `google.com`, `app.100xdevs.com`, `x.com`

Every domain name resolves to an **IP address** — a unique numerical identifier assigned to a device on a network. This resolution is handled by the **Domain Name System (DNS)**, which works like a phonebook, translating domain names into IP addresses.

IP addresses are **logical**, not permanent — they can change depending on network configuration or hosting provider.

`localhost` (or `127.0.0.1`) is a special address that always refers to your own machine — useful for testing servers locally before deployment.

---

## 14. Ports

A port is a logical endpoint on a machine that directs incoming data to the correct running process. Ports are not physical — they are assigned by the operating system when a process starts.

**Total available ports:** 65,536 (0–65535)

| Range | Type | Purpose |
|---|---|---|
| 0 – 1023 | System (well-known) ports | Reserved for core internet protocols |
| 1024 – 49151 | Registered ports | Assigned by IANA to specific applications |
| 49152 – 65535 | Dynamic / private ports | Used temporarily for outgoing client connections |

### Common system ports

| Port | Protocol |
|---|---|
| 80 | HTTP |
| 443 | HTTPS |
| 21 | FTP |

---

## 15. HTTP Methods

HTTP methods indicate the action a client wants to perform on a server resource.

| Method | Purpose | Has a body? |
|---|---|---|
| `GET` | Retrieve a resource | No |
| `POST` | Create a new resource | Yes |
| `PUT` | Replace an entire existing resource | Yes |
| `PATCH` | Update part of an existing resource | Yes |
| `DELETE` | Remove a resource | Usually no |

> **Idempotency:** `GET`, `PUT`, and `DELETE` are idempotent — repeating the same request multiple times produces the same result. `POST` is not — repeating it typically creates multiple new resources.

---

## 16. HTTP Response

A server's response can contain different types of content, indicated by its `Content-Type` header:

- **Plain text** — rarely used directly
- **HTML** — when serving a rendered webpage
- **JSON** — when serving structured data to a frontend or another service

---

## 17. JSON

JSON (JavaScript Object Notation) is a lightweight, text-based format used to represent and exchange structured data between systems.

```json
{
  "name": "John Doe",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "phoneNumbers": ["123-456-7890", "987-654-3210"]
}
```

Despite the name, JSON is language-independent and used across virtually all modern programming languages, not just JavaScript.

---

## 18. Status Codes

Status codes are three-digit numbers a server returns to indicate the outcome of a request.

| Range | Category | Meaning |
|---|---|---|
| `2xx` | Success | The request was received and processed successfully |
| `3xx` | Redirection | The client must take further action to complete the request |
| `4xx` | Client Error | The request contained an error made by the client |
| `5xx` | Server Error | The server failed to fulfill a valid request |

### Frequently used codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 301 | Moved Permanently |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 19. Body (Payload)

The body is the section of an HTTP message that carries the actual data being transmitted — either from client to server (typically in `POST`, `PUT`, or `PATCH` requests) or from server to client (in a response).

Not all requests carry a body — `GET` and `DELETE` requests typically don't.

---

## 20. Routes

A route defines a specific path, or endpoint, on the server and how a request to that path should be handled.

Example: `GET /users/123` — a route that returns the user with ID `123`.

### Route parameters vs Query parameters

- **Route parameters** are part of the URL path itself, used to identify a specific resource:
  `GET /users/123` → `123` is a route parameter.
- **Query parameters** appear after a `?` in the URL, typically used for filtering, sorting, or optional data:
  `GET /users?age=25&sort=name`

---

## 21. Headers

Headers are key-value pairs sent with both requests and responses. They carry metadata about the message — such as content type, authentication credentials, and caching rules — rather than the actual data itself.

```
Content-Type: application/json
Authorization: Bearer <token>
```

Headers are transmitted separately from the body. They tell the client or server **how** to interpret the message, not what the message contains.

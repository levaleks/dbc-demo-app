# DevOps BaseCamp – Demo Application

## Dependencies

Use `npm ci` to install npm packages.

## Up&Running

### Front-end

Lint files

```
npm run lint
```

Run app in dev mode 

```
npm run serve
```

Compile files and put them to the `dist` folder

```
npm run build
```

**Environment variables:** `BACKEND_URL` (see `main.js`)

### Back-end

Lint files

```
npm run lint
```

Run app using node-dev (a development tool which automatically restarts the node process when a file is modified)

```
npm run dev
```

Run app using plain NodeJS

```
npm run start
```

**Environment variables:** `MONGO_URI`, `APP_PORT` (see `config.js`)

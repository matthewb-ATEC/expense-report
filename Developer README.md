# Expense Report

## Installing Node.js

Install node.js from https://nodejs.org/en  
Edit your PATH:

```bash
vi ~/.zshrc
```

Include the following in your PATH:

```bash
export PATH=/usr/local/bin
```

Save and exit your PATH:

```bash
:wq
```

Verify you've installed node.js correctly with the following commands:

```bash
node --version
npm --version
npx --version
```

## Install pdf functionality support

```bash
npm install jspdf
npm install pdf-lib
```

## Install uuid package

```bash
npm install uuid
npm install --save-dev @types/uuid
```

## View the react app locally

Run the following command to view the react app in your browser at localhost:port

```bash
npm start
```

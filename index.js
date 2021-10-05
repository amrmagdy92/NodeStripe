require('dotenv').config();
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const CPU_COUNT = require('os').cpus().length;
const http = require('http');
const app = require('./app');

if (cluster.isMaster) {
    console.log(`Server primary process #${process.pid} started at ${Date().toLocaleLowerCase('en',{
        timeStyle: 'short',
        hour12: false,
        timeZone: 'UTC'
    })}`);

    for(let i = 0; i < CPU_COUNT; i++) {
        console.log(`Starting worker #${i}...`);
        cluster.fork();
    }
    cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker #${worker.process.pid} died with code ${code} and signal ${signal}`);
        cluster.fork();
    });
} else {
    http.createServer(app).listen(process.env.SERVER_PORT || 3000);
    console.log(`Server(${process.pid}) is listening at port(${process.env.SERVER_PORT})`);
}
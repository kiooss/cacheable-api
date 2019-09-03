#!/usr/bin/env node

const lib = require("../");

const NAME = "get-public-ip";
const getPublicIp = lib.cacheableRequest(NAME, lib.getJSON, 1);

getPublicIp("https://api.ipify.org?format=json")
  .then(res => {
    const ip = res.ip;
    if (ip === "18.182.170.161") {
      console.log(`嬨#[fg=red,bold]${ip}`);
    } else {
      console.log(` ${ip}`);
    }
  })
  .catch(err => {
    lib.handleError(NAME, err);
  });

"use strict";

const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const copyright = sidebar.querySelector("span");
const backdrop = document.querySelector(".backdrop");
const gameOver = document.querySelector(".game__over");
const playBtn = document.querySelector(".play__btn");
const btns = document.querySelectorAll(".buttons__group button");
const colors = ["red", "green", "blue", "yellow"];
const score = document.querySelector(".score span");
const instruction = document.querySelector(".instruction");
const instructionBtn = document.querySelector(".instruction button");
let userSequence = [];
let computerSequence = [];
let level = 0;

copyright.textContent = new Date().getFullYear();

const nextSequence = () => {
    userSequence = [];
    const randomNum = Math.trunc(Math.random() * colors.length);
    const randomChosenColor = colors[randomNum];
    computerSequence.push(randomChosenColor);
    animateBtn(randomChosenColor);
    makeSound(randomChosenColor);
};

const animateBtn = (clr) => {
    document.querySelector(`#${clr}`).classList.add("button__pressed");
    setTimeout(() => {
        document.querySelector(`#${clr}`).classList.remove("button__pressed");
    }, 100);
};

const makeSound = (clr) => {
    const audio = new Audio(`${clr}.mp3`);
    audio.volume = 0.4;
    audio.play();
};

const checkAnswer = (index) => {
    if (userSequence[index] === computerSequence[index]) {
        if (userSequence.length === computerSequence.length) {
            setTimeout(() => {
                nextSequence();
            }, 800);
            level++;
            score.textContent = String(level).padStart(2, 0);
        }
    } else {
        if (computerSequence.length === 0) return;
        gameOver.classList.remove("hidden");
        //prettier-ignore
        gameOver.querySelector("span").textContent = String(level).padStart(2,0);
        makeSound("wrong");
    }
};

const reset = () => {
    level = 0;
    gameOver.querySelector("span").textContent = String(level).padStart(2, 0);
    score.textContent = String(level).padStart(2, 0);
    userSequence = [];
    computerSequence = [];
    playBtn.classList.remove("opacity__zero");
};

const playBtnHandler = () => {
    playBtn.classList.add("opacity__zero");
    setTimeout(() => {
        nextSequence();
    }, 800);
};

btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        userSequence.push(this.id);
        makeSound(this.id);
        animateBtn(this.id);
        checkAnswer(userSequence.length - 1);
    });
});

hamburger.addEventListener("click", function () {
    this.querySelector("div").classList.toggle("hamburger__parallel--line");
    this.querySelector("div").classList.toggle("hamburger__cross--line");
    sidebar.classList.toggle("hidden");
});

gameOver.addEventListener("click", () => {
    gameOver.classList.add("hidden");
    reset();
});

playBtn.addEventListener("click", playBtnHandler);

const colorAccordingToKey = (clr) => {
    userSequence.push(clr);
    makeSound(clr);
    animateBtn(clr);
    checkAnswer(userSequence.length - 1);
};

document.addEventListener("keydown", function (e) {
    if (e.key === "r") colorAccordingToKey("red");
    if (e.key === "g") colorAccordingToKey("green");
    if (e.key === "b") colorAccordingToKey("blue");
    if (e.key === "y") colorAccordingToKey("yellow");
    if (e.key === "Enter") playBtnHandler();
});

const query = window.matchMedia("(min-width: 992px)");
if (query.matches && window.localStorage.getItem("understood") !== "yes")
    instruction.classList.remove("hide__instruction");

instructionBtn.addEventListener("click", () => {
    instruction.classList.add("hide__instruction");
    window.localStorage.setItem("understood", "yes");
});

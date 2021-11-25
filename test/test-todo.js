const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Todo List", async () => {
  
  let todo;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {

    Todo = await ethers.getContractFactory("TodoList");
    todo = await Todo.deploy();
    await todo.deployed();
    await todo.createTodo("Mow the lawn");

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("should add an item to the todo list", async () => {

    const todo_clean = await todo.todos(0);
    
    expect(todo_clean.name).to.equal("Mow the lawn");
    expect(todo_clean.done).to.equal(false);
    expect(todo_clean.owner).to.equal(owner.address);

  });

  it("should mark the todo done", async () => {
    
    await todo.done(0);
    const todo_lawn = await todo.todos(0);

    expect(todo_lawn.done).to.equal(true);

  })

  it("should fail if sender of done method did not create the todo item", async () => {
    
    const todo_new_address = todo.connect(addr1);
    
    await expect(todo_new_address.done(0)).to.be.reverted;

  });

  it("should change the status of the contract to pause, try to create a todo item then unpause it and create the todo", async () => {

    await todo.pause();
    expect(await todo.paused()).to.equal(true);
    await expect(todo.createTodo("Clean the dishes")).to.be.reverted;

    await todo.unpause();
    await todo.createTodo("Clean the dishes");
    const todo_dishes = await todo.todos(1);
    expect(todo_dishes.name).to.equal("Clean the dishes");
    expect(await todo.paused()).to.equal(false);

  });

  it("should fail if caller is not the contractOwner", async () => {

    const todo_new_address = await todo.connect(addr1);
    await expect(todo_new_address.pause()).to.be.reverted;
    await expect(todo_new_address.unpause()).to.be.reverted;

  })

});

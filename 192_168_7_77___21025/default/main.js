var transferModule = require('transferModule');
var minerModule = require('minerModule');
var truckModule = require('truckModule');
var buildModule = require('buildModule');
var upgradeModule = require('upgradeModule');
var armyModule = require('armyModule');
var controlModule = require('controlModule');
var repairModule = require('repairModule');
var testModule = require('testModule');
var analysisModule = require('analysisModule');

var spawnModule = require('spawnModule')

var allSpawns = Game.spawns;

for (var spawnName in allSpawns)
{
	spawnModule(spawnName);
}

//activate the creeps
for(var name in Game.creeps)
{
    var creep = Game.creeps[name];

    if (Memory.creeps[name].role == 'miner')
    {
        minerModule(creep);
    }
    else if (Memory.creeps[name].role == 'truck')
    {
        truckModule(creep);
    }
    else if (Memory.creeps[name].role == 'build')
    {
        buildModule(creep);
    }
    else if (Memory.creeps[name].role == 'upgrade')
    {
        upgradeModule(creep);
    }
    else if (Memory.creeps[name].role == 'army')
    {
        armyModule(creep);
    }
    else if (Memory.creeps[name].role == 'transfer')
    {
        transferModule(creep);
    }
    else if (Memory.creeps[name].role == 'control')
    {
        controlModule(creep);
    }
    else if (Memory.creeps[name].role == 'repair')
    {
        repairModule(creep, buildingMaxHealth);
    }
    else if (Memory.creeps[name].role == 'test')
    {
        testModule(creep);
    }
}
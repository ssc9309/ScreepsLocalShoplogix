var transferModule = require('transferModule');
var minerModule = require('minerModule');
var truckModule = require('truckModule');
var buildModule = require('buildModule');
var upgradeModule = require('upgradeModule');
var armyModule = require('armyModule');
var controlModule = require('controlModule');
var repairModule = require('repairModule');
var rangeBuilderModule = require('rangeBuilderModule');

var spawnModule = require('spawnModule');

module.exports.loop = function()
{
    var allSpawns = Game.spawns;
    var startCPU = Game.cpu.getUsed();
    
    //var buildingMaxHealth = 300000;
    
    for (var spawnName in allSpawns)
    {
    	spawnModule(spawnName);
    }
    console.log("SpawnModule: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
     
    //activate the creeps
    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        var creepRole = creep.memory.role;
    
        if (creepRole == 'miner')
        {
            //console.log(creep.memory.role);
            minerModule(creep);
        }
        else if (creepRole == 'truck')
        {
            truckModule(creep);
        }
        else if (creepRole == 'build')
        {
            buildModule(creep);
        }
        else if (creepRole == 'upgrade')
        {
            upgradeModule(creep);
        }
        else if (creepRole == 'army')
        {
            armyModule(creep);
        }
        else if (creepRole == 'transfer')
        {
            transferModule(creep);
        }
        else if (creepRole == 'control')
        {
            controlModule(creep);
        }
        else if (creepRole == 'repair')
        {
            repairModule(creep, buildingMaxHealth);
        }
        else if (creepRole == 'test')
        {
            testModule(creep);
        }
        else if (creepRole == 'rangeBuilder')
        {
            rangeBuilderModule(creep);
        }
    }
    
    console.log("CreepModules: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
    
    for (var name in Game.flags)
    {
        var flag = Game.flags[name];
        //console.log(flag.name + " " + flag.color + " " + flag.pos.x + " " + flag.pos.y);
        //console.log(COLOR_WHITE);
    
        //flag memory to set which room to use, and how many workers to send?
    } 
}
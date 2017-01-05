var transferModule = require('role_transferModule');
var minerModule = require('role_minerModule');
var truckModule = require('role_truckModule');
var buildModule = require('role_buildModule');
var upgradeModule = require('role_upgradeModule');
var armyModule = require('role_armyModule');
var controlModule = require('role_controlModule');
var repairModule = require('role_repairModule');
var rangeBuilderModule = require('role_rangeBuilderModule');
var rangeMinerModule = require('role_rangeMinerModule');
var rangeTruckModule = require('role_rangeTruckModule');
var healerModule = require('role_healerModule');
var tankModule = require('role_tankModule');
var safeModeCheckerModule = require('safeModeCheckerModule');

var spawnModule = require('spawnModule');

module.exports.loop = function()
{
    var allSpawns = Game.spawns;
    var startCPU = Game.cpu.getUsed();
    
    //clean up memory
    for(var name in Memory.creeps)
    {
        if (!Game.creeps[name])
        {
            delete Memory.creeps[name];
        }
    }
    
    //console.log("---SpawnModule Start---");
    for (var spawnName in allSpawns)
    {
    	spawnModule(spawnName);
    }
    //console.log("---SpawnModuleTotal: " + parseInt((Game.cpu.getUsed() - startCPU)) + "---");
    startCPU = Game.cpu.getUsed();
    //console.log("---CreepModulesStart---");
     
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
        else if (creepRole == 'rangeMiner')
        {
            rangeMinerModule(creep);
        }
        else if (creepRole == 'rangeTruck')
        {
            rangeTruckModule(creep);
        }
        else if (creepRole == 'healer')
        {
            healerModule(creep);
        }
        else if (creepRole == 'tank')
        {
            //tankModule(creep);
            armyModule(creep);
        }
        else if (creepRole == 'fastCat')
        {
            //tankModule(creep);
            armyModule(creep);
        }
        else if (creepRole == 'safeModeChecker')
        {
            safeModeCheckerModule(creep);
        }
    }
    
    //console.log("---CreepModulesTotal: " + parseInt((Game.cpu.getUsed() - startCPU)) + "---");
    startCPU = Game.cpu.getUsed();
    
    
    for (var name in Game.flags)
    {
        var flag = Game.flags[name];
        
        if (flag.color == COLOR_YELLOW)
        {
            if (!flag.memory.spawnRoom)
            {
                flag.memory.spawnRoom = 'WINJ';
            }
        }
    } 
    
    //console.log("Flags: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
    //console.log();
}